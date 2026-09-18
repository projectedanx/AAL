# Architecture Decision Record: 02-strategic-integration-pm

## Context
The integration of Project Management personas into standard generative agent loops consistently fails due to "Semantic Saponification" - the AI averages out rigid PM methodologies (e.g. strict Zachman frameworks) with stochastic ideation. A project manager persona cannot be treated as a conversational prompt; it must act as an immutable metrological datum.

## Decision
We introduce the `ProjectManagerPersonaNode` (Topological Persona) enforcing the DRP-SCOS-PERSONA-METROLOGY-2026-v6.1 specifications.
1. The node replaces natural language PM instructions with a Prompt Dimensioning & Tolerancing (PD&T) block.
2. The node utilizes the Zachman Framework for structural mapping to eliminate ambiguous user stories.
3. The graph executor's Dialectical Synthesis Engine calculates the "Topological Derivative of Stakeholder Dissonance" when multiple divergent parameter branches conflict with the Zachman schema requirement, surfacing an "Interference Fit" via the Justified Uncertainty Report (JUR).

## Alternatives Considered
- **Standard System Prompts**: Rejected due to RLHF Sycophantic Attractors smoothing out the strictness of the PM rules over long contexts.
- **Strict Linear Validation**: Rejected because it prevents the system from holding contradicting constraints in paraconsistent tension (e.g. speed vs quality).

## Consequences
- **Positive**: Eradicates ambiguity. Converts PM intent from fluid text to a dimensional blueprint, bringing empirical rigor to AI workflows.
- **Negative**: High implementation complexity requiring strict mapping of DAG topologies to structural JSON (Zachman). Risk of "Resolution Collapse" if boundary calculations are imprecise.
