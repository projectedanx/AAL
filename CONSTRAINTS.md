# CONSTRAINTS.md

## Architectural Limitations and Boundaries

### 1. Epistemic Isolation
- **Rule**: The empirical documentation layer (e.g., `AGENTS.md`, ADRs) must remain structurally decoupled from probabilistic conversational intent.
- **Enforcement**: Any generated path incorporating a `TopologicalPersonaNode` must map its constraints directly into the resulting dataset, preventing silent overriding of human rules.

### 2. Contradiction Preservation (Anti-Sycophancy)
- **Rule**: The system shall not automatically resolve Contradictory Directives declared within a `TopologicalPersonaNode`.
- **Enforcement**: Graph execution must extract these contradictions and route them into the `JustifiedUncertaintyReport` (JUR) instead of discarding them.

### 3. Golden Ratio Weighting
- **Rule**: When evaluating tension between empirical governance constraints (PD&T datums) and generative exploration, the system must apply a static weight of ~1.618 to the empirical constraints and 1.000 to the stochastic component.
- **Enforcement**: The `Geometric Density Score` calculated in the JUR must reflect this exact mathematical ratio.

### 4. Zero-Trust Marketing Bypass
- **Rule**: As defined by ALETHEON, no third-party API or component shall be trusted to adhere to its own semantic claims.
- **Enforcement**: Output from generative models must be treated as structurally suspect until manually verified by the human orchestrator, facilitated by the transparent JUR.

### 5. Incremental Isolation Principle (WHIMSY compliance)
- **Rule**: Manifold Separation. Do not modify affective copy (Manifold α) and structural code (Manifold β) in the same unverified pass.
- **Enforcement**: The Dialectical Synthesis Engine separates the *structural* calculation of tension (JUR) from the *affective* generation of the aesthetic images.
