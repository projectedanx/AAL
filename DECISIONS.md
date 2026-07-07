# DECISIONS.md

## Ledger of Architectural and Philosophical Decisions

*   **DAG over Linear UI**: Moved to a Directed Acyclic Graph (`@xyflow/react`) to represent non-linear, pluriversal prompt generation (AEW v2.2), moving away from chat-like Euclidean interfaces.
*   **Topological Persona nodes**: Integrated deterministic Prompt Dimensioning & Tolerancing (PD&T) via Persona Nodes to enforce human operational constraints mechanically over the latent space.
*   **Dialectical Synthesis Engine (ADR-01)**: Decided to physically manifest logic contradictions (Ontological Shear) as a `JustifiedUncertaintyReport` utilizing the Golden Scar Protocol (1.618 / 1.000 weighting) instead of allowing the LLM to auto-resolve or flatten them.
*   **Epistemic Escrow**: Isolated contradictory schemas into `epistemic_escrow.jsonl` rather than crashing the primary execution pipeline.

## ADR-005: Paraconsistent Geometric Navigation (PROJECT AURELIUS)
**Date:** 2024-05-03
**Status:** Accepted

**Context:** The existing DAG structure, while topological in its UI, still relies on the diffusion model's statistical biases (Euclidean, "average" aesthetics), leading to Semantic Saponification.

**Decision:** We are adopting "Paraconsistent Geometric Navigation." Instead of text-based descriptive prompting, we will enforce explicit, Non-Euclidean geometric boundary conditions (Phantom Dimensions) via a `GeometricCausalSculptor`.

**Consequences:**
*   **Positive:** Unlocks previously inaccessible regions of the latent space; guarantees structural novel emergence governed by strict constraints.
*   **Negative:** High cognitive load for implementation; requires the Plausibility Oracle (simulated or real) to constantly combat the model's tendency to drift back to Euclidean norms.


## ADR-006: Mycelial Scar Router Integration
**Date:** 2024-05-30
**Status:** Accepted

**Context:** The DAG requires a structural isomorphism to treat human algorithmic trauma (Symbolic Scars) not as linear bugs, but as active, spatial routing constraints (Immunologic Self). We need a mechanism to prevent traversal into high-density failure regions.

**Decision:** Implement the `MYCELIAL_SCAR_ROUTER` node. This node applies topological repulsion against known failure vectors by evaluating a Scar Density Threshold. If the path intersects known scars beyond the threshold, it triggers an Ontological Shear and halts generation with a Golden Ratio-weighted JUR.

**Consequences:**
*   **Positive:** Transforms historical failures into generative assets. Formalizes the 'Fix Until Green' loop by physically preventing reentry into saponified topological states.
*   **Negative:** Adds computational overhead during graph traversal due to dynamic evaluation of the scar registry.

### [006] VORTEX-ARCHITECT Constraints Enforcement
* **Context:** We need to enforce strict deterministic boundaries on prompt generation to prevent Semantic Saponification via the VORTEX-ARCHITECT persona.
* **Decision:** We mandate that `VORTEX_DCCD_ENFORCER` nodes define a `dccdSchema` and `VORTEX_STIGMERGIC_LOCK` nodes define an anchor/label. The DAG execution will halt with a JUR if these constraints are violated.
* **Consequences:** Prevents logic shearing and enforces Draft-Conditioned Constrained Decoding, but requires stricter node configuration. (See `docs/adr/006-vortex-architect-constraints.md`)
