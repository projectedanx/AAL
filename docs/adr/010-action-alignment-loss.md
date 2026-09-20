# 010 - Integration of Action-Alignment Loss (Regret Minimization)

## Context
Standard agent modeling techniques (such as behavioral cloning and next-token prediction) often suffer from a "thought-action gap" or "predictive-behavioral decoupling." Specifically, when modeling multi-agent sequential interactions (e.g., Rock-Paper-Scissors), agents with perfect theory-of-mind prediction models still default to unexploitative, high-entropy Nash equilibria rather than optimal Best Responses. This failure to translate descriptive beliefs into utility-maximizing policy execution limits our agent performance in competitive or exploitable environments.

## Decision
We are integrating the **Action-Alignment Loss** into our PyTorch model topologies. This differentiable regret minimization module mathematically penalizes the agent's policy (Head B) if it deviates from the optimal Best Response calculated against its own theory-of-mind prediction of the opponent (Head A).

To prevent unstable gradients during early RL phases (due to hard max operations), we implemented a **Boltzmann Best-Response Approximation** (LogSumExp) to allow smooth gradient flow across all actions.

Additionally, to structurally enforce this alignment in our neuro-symbolic multi-agent topologies (e.g., AACH), we have implemented a **Closed-Loop BDI ReCAP Simulation**. This mechanism parses neural intentions and beliefs into symbolic logic and vetos outputs that violate game-theoretic optimality, triggering recursive context-aware replanning.

## Rationale
By transforming the expectation-realization gap into a continuous, optimizable regret target, we causally bind the agent's descriptive state prediction to its active policy network. This eliminates the Nash trap as a stable equilibrium in the loss landscape.

## Consequences
- **Positive:** Agents now mathematically enforce functional Best Responses against biased/predictable environments, eliminating the "thought-action gap."
- **Positive:** The BDI ReCAP loop acts as a strict guardrail, preventing irrational outputs from contaminating the execution state.
- **Negative/Risk:** Incorporating smooth approximations (temperature tuning) requires careful balancing to avoid over-smoothing and losing exploitation precision.

## Status
Accepted
