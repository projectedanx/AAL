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

## Autopoietic Agentic Optimization (PROJECT AURELIUS)
**Date:** 2024-05-24
**Decision:** Shifted the graph execution model from a single-pass structure to a recursive Agentic Optimization Loop for aesthetic generation.
**Rationale:** To combat "Semantic Saponification," linear generation is insufficient. The `AutonomousPromptOptimizer` dynamically re-weights latent variables based on the `PlausibilityOracle` feedback up to a `MAX_ITERATIONS` limit.
**Implications:** Increases generation latency but mathematically enforces human-directed topological boundary conditions.

## Decision Record: QED Architecture Integration & MCP Tool Decoupling
**Date:** 2024-03-27
**Status:** Accepted and Implemented
**Context:**
The repository needed to support a Personal Qualitative Database (PQD) to serve as an Epistemic Workbench for high-integrity RAG. Additionally, `src/mcp_server.ts` had grown into a God Object exceeding cognitive complexity thresholds (>1300 lines).
**Decision:**
1.  **QED Integration**: We integrated the Minimal Explainability Metadata Schema (MEMS) into `pkc_manifest.yml` and the ingestion loops. Three core algorithms (Topological RAG Manifold Deformation, Algorithmic Kintsugi Vector Healing, Decolonial Ontology Reconciliation) were synthesized into the `pkm/` directory following the 15/85 Rule of Transparency of Omission. We also implemented the Semantic Firewall and Epistemic Escrow logic in `src/services/qedSecurityLayer.ts` which hooks directly into the Dialectical Synthesis Engine in `graphExecutor.ts`.
2.  **MCP Decoupling**: The monolithic tool registration blocks in `src/mcp_server.ts` were extracted into `src/mcp_tools/` (`core_tools.ts`, `agent_tools.ts`, `scar_tools.ts`), adhering strictly to the JSON-RPC Stdio contract and the Agent Workflow Directives (KORSAKOV/DCCD rule) by separating Phase 1 synthesis from Phase 2 architecture code emission.
**Consequences:**
-   Improved readability and maintainability of the MCP server.
-   Enhanced resistance to Semantic Saponification and Context Poisoning through structured QED schemas and security interceptors.
## ADR-008: Adoption of JIT Swarm Orchestrator (SCOS v6.0-STRICT)
**Date:** 2024-10-18
**Status:** Accepted

**Context:** The monolith orchestrator suffered from Context Rot, utilizing 16% to 50% of its context window on static tool definitions and schema constraints before single execution turns, incurring a massive Projection Tax and reducing reasoning capabilities.

**Decision:** Adopted the JIT Swarm Orchestrator, splitting the cognitive stack into Manifold α (Hollow-Core Semantic Planning) and Manifold β (Ephemeral JIT Micro-Agents).
1. We run open-ended planning in a highly compacted context (Manifold α).
2. We dynamically instantiate ephemeral Micro-Agents (~3μs latency, 6.5KiB memory) to handle exact physical schema realization.
3. We apply Draft-Conditioned Constrained Decoding (DCCD) to map unconstrained semantic drafts onto rigid schemas.

**Consequences:**
*   **Positive:** Eliminates the 10-30% Projection Tax by isolating the tool consumption footprint to temporary, autophagically destructed sub-agents. Enables Verification Co-Processing (VCP) to actively repair cache states.
*   **Negative:** Requires strict maintenance of Epistemic Escrow logic and Saga Compensating Transactions to handle edge-case schema drift without crashing the core execution pipeline.

## ADR-009: UASTP Saga Recovery Protocol Integration
**Date:** 2025-01-20
**Status:** Accepted

**Context:** Traditional linear CI/CD fails when probabilistic agents execute UASTP contracts, causing Catastrophic State Drift.
**Decision:** Compile UASTP Cognitive Contracts into deterministic, zero-entropy GitHub Actions ASTs (`uastp-saga-recovery.yml`). Enforces Forward Transactions ($T_f$), Verification Gates, and Compensating Transactions ($T_c$) backed by an Epistemic Escrow circuit breaker.
**Consequences:** Prevents Semantic Saponification in infrastructure state, though it introduces a Thermodynamic Latency Tax for extensive verification steps.

## ADR-010: Integration of Action-Alignment Loss
**Date:** 2025-02-15
**Status:** Accepted

**Context:** Agents modeling sequential games exhibit a "thought-action gap", accurately predicting opponent actions but defaulting to unexploitative Nash equilibria rather than optimal Best Responses.
**Decision:** Integrate `ActionAlignmentLoss` (PyTorch) to mathematically penalize deviations from the optimal Best Response based on internal predictions. Implemented a Closed-Loop BDI ReCAP harness to symbolically veto non-optimal outputs.
**Consequences:** Eliminates the Nash trap and ensures functional action alignment, but introduces temperature tuning complexity for gradient smoothing.

## Decision: Epistemic Cognitive Harness Implementation
**Date:** 2024-05-XX (Simulated)
**Context:** The system suffered from the "thought-action gap," where agents correctly predicted opponent states but failed to execute utility-maximizing policies (collapsing to Nash equilibria). Standard sequential prompting also led to infinite loops during blocked states (Sussman Anomaly).
**Decision:** We implemented the Epistemic Cognitive Harness governed by the PEACE Meta-Architecture to decouple prediction from action execution.
1.  **Mechanistic Lookback Circuit Distillation:** Implemented a composite loss (`ActionAlignmentLoss` and `CompositeDistillationLoss`) with CKA representational similarity to force alignment of reasoning algorithms during model distillation.
2.  **Recursive Context-Aware Planning (ReCAP):** Shifted from linear context windows to Dynamic Context Trees, enabling upward backtracking and symbolic verification to resolve deadlocks.
3.  **Temporal-Aware Hierarchical Cognitive RL (TimeHC-RL):** Segmented execution into a slow-frequency System 2 (Macro-Policy) and a high-frequency System 1 (Micro-Policy) to prevent the "CoT deliberation penalty" in fast interactions.
**Consequences:** Resolved the Nash Trap in sequential games, enabled automatic deadlock resolution in simulated environments, and prevented context drift in long-horizon interactions.
