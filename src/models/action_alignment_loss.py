import torch
import torch.nn as nn
import torch.nn.functional as F

class ActionAlignmentLoss(nn.Module):
    """
    Differentiable Action-Alignment Loss (Regret Minimization) Module in PyTorch.

    Bridges the 'thought-action' gap by mathematically penalizing the agent's policy
    (Head B) if it deviates from the optimal Best Response calculated based on its
    descriptive prediction of the opponent's strategy (Head A).

    payoff_matrix (Tensor): Float tensor of shape (num_agent_actions, num_opponent_actions)
                            representing the utility values for the agent.
    use_smooth (bool): If True, applies log-sum-exp (Boltzmann) to compute the
                       oracle expected utility, ensuring dense gradient flow.
    temperature (float): Scaling factor (tau) for the smooth best-response calculation.
    """
    def __init__(self, payoff_matrix: torch.Tensor, use_smooth: bool = True, temperature: float = 0.1):
        super().__init__()
        # Ensure payoff_matrix is registered as buffer to move to GPU automatically with the model
        self.register_buffer("payoff_matrix", payoff_matrix.float())
        self.use_smooth = use_smooth
        self.temperature = temperature

    def forward(self, agent_logits: torch.Tensor, predicted_opponent_logits: torch.Tensor) -> torch.Tensor:
        """
        Computes the Action-Alignment Penalty.

        Args:
            agent_logits (Tensor): Raw logits from the execution head (Head B)
                                   of shape (batch_size, num_agent_actions).
            predicted_opponent_logits (Tensor): Raw logits from the ToM prediction head
                                                (Head A) of shape (batch_size, num_opponent_actions).

        Returns:
            Tensor: Scalar tensor representing the batch mean alignment loss.
        """
        # 1. Convert logits into probability distributions
        p = F.softmax(agent_logits, dim=-1)         # Shape: (batch_size, num_agent_actions)
        p_hat = F.softmax(predicted_opponent_logits, dim=-1)  # Shape: (batch_size, num_opponent_actions)

        # 2. Compute the expected utility of every possible agent action given the prediction p_hat
        # expected_action_utilities_j = Sum_k (p_hat_k * U_jk)
        # Shape: (batch_size, num_agent_actions)
        expected_action_utilities = torch.matmul(p_hat, self.payoff_matrix.t())

        # 3. Compute expected utility of the chosen policy 'p'
        # expected_policy_utility = Sum_j (p_j * expected_action_utilities_j)
        # Shape: (batch_size,)
        expected_policy_utility = torch.sum(p * expected_action_utilities, dim=-1)

        # 4. Calculate optimal expected utility of Best Response (Oracle)
        if self.use_smooth:
            # Boltzmann best-response function
            # Shape: (batch_size,)
            v_optimal = self.temperature * torch.logsumexp(expected_action_utilities / self.temperature, dim=-1)
        else:
            # Exact maximum expected utility (hard Best Response)
            # Shape: (batch_size,)
            v_optimal, _ = torch.max(expected_action_utilities, dim=-1)

        # 5. Regret (Action-Alignment Penalty)
        regret = v_optimal - expected_policy_utility

        # Return batch mean
        return torch.mean(regret)

if __name__ == "__main__":
    print("Testing ActionAlignmentLoss on Rock-Paper-Scissors 'Nash Trap'...")
    # R=0, P=1, S=2
    # Payoff matrix for the agent
    U = torch.tensor([
        [0.0, -1.0, 1.0],  # Agent plays Rock
        [1.0, 0.0, -1.0],  # Agent plays Paper
        [-1.0, 1.0, 0.0]   # Agent plays Scissors
    ])

    # We use non-smooth exact calculation to match the proof exactly
    loss_fn = ActionAlignmentLoss(payoff_matrix=U, use_smooth=False)

    # Opponent plays Rock (index 0) with 100% confidence.
    # Let's set opponent logits such that softmax is approx [1, 0, 0]
    opponent_logits = torch.tensor([[100.0, -100.0, -100.0]])

    # Agent Nash Equilibrium policy: [1/3, 1/3, 1/3]
    agent_logits_nash = torch.tensor([[0.0, 0.0, 0.0]])

    loss_nash = loss_fn(agent_logits_nash, opponent_logits)
    print(f"Loss with Nash Equilibrium policy: {loss_nash.item():.4f}")
    assert abs(loss_nash.item() - 1.0) < 1e-4, "Nash loss should be 1.0"

    # Agent Optimal policy: Paper [0, 1, 0]
    agent_logits_optimal = torch.tensor([[-100.0, 100.0, -100.0]])
    loss_optimal = loss_fn(agent_logits_optimal, opponent_logits)
    print(f"Loss with Optimal policy (Paper): {loss_optimal.item():.4f}")
    assert abs(loss_optimal.item() - 0.0) < 1e-4, "Optimal loss should be 0.0"

    print("All tests passed! The Nash equilibrium is successfully penalized.")
