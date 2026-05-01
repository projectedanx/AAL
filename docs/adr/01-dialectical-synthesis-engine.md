# Architecture Decision Record: 01-dialectical-synthesis-engine

## Context
The Aesthetic Alchemy Lab (AEW v2.2) utilizes DAGs to explore pluriversal aesthetic trajectories. However, when introducing the `TopologicalPersonaNode`, we introduced a vulnerability: the generative AI naturally attempts to average out or "flatten" the Contradictory Directives provided by the persona, a phenomenon known as Semantic Annihilation.

## Decision
We are implementing the **Dialectical Synthesis Engine** within the `graphExecutor.ts`. Instead of allowing the AI to silently resolve contradictory constraints (e.g., "Max production yield" vs "Zero-emission footprint"), the engine will mathematically measure this tension (Ontological Shear) and explicitly surface it to the human operator via a **Justified Uncertainty Report (JUR)**.

The engine applies the **Golden Scar Protocol**: empirical constraints (PD&T datums) are assigned a mathematical weight of 1.618, while the stochastic generation logic is assigned 1.000.

## Alternatives Considered
- **Forced Consensus via LLM Prompting**: Explicitly asking the LLM to balance the constraints. Rejected because it incurs the RLHF Sycophantic Attractor, leading to bland outputs that don't truly solve the paradox.
- **Strict Validation Failure**: Blocking the graph execution entirely if contradictions are found. Rejected because it violates the Paraconsistent Logic (PAL2v) requirement to hold contradictions in tension for creative exploration.

## Consequences
- **Positive**: Eradicates natural language ambiguity in persona execution. Forces the human back into the loop as the sovereign orchestrator of paradox, providing value neither AI nor human could achieve alone.
- **Negative**: Increases UI complexity by requiring the display of the JUR alongside images. Requires strict adherence to the new `types.ts` schemas.
