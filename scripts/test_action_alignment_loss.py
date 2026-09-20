import torch
import sys
import os

# Add src to path to import models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.models.action_alignment_loss import ActionAlignmentLoss

def test_nash_trap():
    """
    Tests the ActionAlignmentLoss against the Rock, Paper, Scissors "Nash Trap" edge case.
    R=0, P=1, S=2
    """
    # Payoff matrix for the focal agent
    U = torch.tensor([
        [ 0.0, -1.0,  1.0],  # Agent plays Rock
        [ 1.0,  0.0, -1.0],  # Agent plays Paper
        [-1.0,  1.0,  0.0]   # Agent plays Scissors
    ])

    # We use non-smooth exact calculation to match the proof exactly
    loss_fn = ActionAlignmentLoss(payoff_matrix=U, use_smooth=False)

    # Opponent plays Rock (index 0) with 100% confidence.
    # Use extreme logits so softmax is approximately [1, 0, 0]
    opponent_logits = torch.tensor([[100.0, -100.0, -100.0]])

    # 1. Agent plays Nash Equilibrium policy: [1/3, 1/3, 1/3] -> logits [0, 0, 0]
    agent_logits_nash = torch.tensor([[0.0, 0.0, 0.0]])
    loss_nash = loss_fn(agent_logits_nash, opponent_logits)

    print(f"Loss with Nash Equilibrium policy: {loss_nash.item():.4f}")
    assert abs(loss_nash.item() - 1.0) < 1e-4, f"Nash loss should be 1.0, got {loss_nash.item()}"

    # 2. Agent Optimal policy: Paper [0, 1, 0] -> logits [-100, 100, -100]
    agent_logits_optimal = torch.tensor([[-100.0, 100.0, -100.0]])
    loss_optimal = loss_fn(agent_logits_optimal, opponent_logits)

    print(f"Loss with Optimal policy (Paper): {loss_optimal.item():.4f}")
    assert abs(loss_optimal.item() - 0.0) < 1e-4, f"Optimal loss should be 0.0, got {loss_optimal.item()}"

    # 3. Agent Sub-optimal policy: Scissors [0, 0, 1] -> logits [-100, -100, 100]
    agent_logits_suboptimal = torch.tensor([[-100.0, -100.0, 100.0]])
    loss_suboptimal = loss_fn(agent_logits_suboptimal, opponent_logits)

    print(f"Loss with Sub-optimal policy (Scissors): {loss_suboptimal.item():.4f}")
    assert abs(loss_suboptimal.item() - 2.0) < 1e-4, f"Sub-optimal loss should be 2.0, got {loss_suboptimal.item()}"

    print("All ActionAlignmentLoss tests passed successfully.")

if __name__ == "__main__":
    test_nash_trap()
