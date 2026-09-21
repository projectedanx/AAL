# Aesthetic Alchemy Lab

The Aesthetic Alchemy Lab is a generative UI canvas designed to explore and orchestrate visual aesthetic intents using directed acyclic graphs (DAGs). Built with React, TypeScript, and Vite, it integrates directly with the Google Gemini API to translate complex, multi-parameter artistic constraints into high-fidelity image outputs.

## Purpose and Overview
This repository serves as a node-based editor where developers and artists can map out "prompt pipelines." Instead of writing linear prompts, users construct a DAG where a "Base Prompt" can be simultaneously altered by different "Parameter Nodes" (like Lighting, Style, and Perspective).

The application utilizes specialized autonomous agents (represented internally by components and validation schemas) to enforce structural constraints and physical realism over generated outputs, preventing "Semantic Saponification"—a phenomenon where AI models collapse conflicting aesthetics into a generic, flattened average. Key enforcers like the VORTEX-ARCHITECT validate DAG topologies to strictly clamp output structures using Draft-Conditioned Constrained Decoding (DCCD) and Semantic Mutex Locks.

## Project Architecture
*   **`components/`**: React UI components, primarily featuring the `NodeCanvas.tsx` for visual graph interaction, and a `MultiAgentPanel.tsx` for side-channel agent communication.
*   **`services/`**: Core logic including `graphExecutor.ts` for traversing the DAG topology and calling `geminiService.ts`.
*   **`PROJECT_AURELIUS/`**: Advanced topological and geometric constraints (Causal Latent Sculpting and Plausibility Oracles).
*   **`data/`**: Curated templates and historical prompt data.
*   **`types.ts`**: Centralized TypeScript definitions for Pipeline nodes, edges, and generation matrices.


## Epistemic Cognitive Harness & PEACE Meta-Architecture

This harness is further fortified by the **Parsimonious Architecture Protocol (PAP)**, a framework designed to automate theory selection using an Occam Loss Compiler. PAP prevents over-fitting ("Ptolemaic Epicyclic Curve-Fitting") by programmatically enforcing the "Simplest Adequate Approximation" via Pareto optimization, Bayesian Model Reduction (BMR), and Isomorphic Model Travel Validation.

To bridge the "thought-action gap" (where high-fidelity internal representations decouple from behavioral execution), this repository implements the **Epistemic Cognitive Harness** based on the **PEACE Meta-Architecture**:

1. **P**riors (Retrieval Module): Extracts contextual priors.

2. **E**xploration (Cognition Module / System 1): Generates fast associative hypotheses.

3. **A**lignment (Control Module / System 2): BDI logical solver/filter enforcing constraints.

4. **C**ontext (Memory Module): Dynamic context tree (ReCAP) to prevent context drift.

5. **E**xecution (Action Module): Executes authorized commands.


## Autonomous Adaptive Cognitive Harness (AACH)
This repository implements an AACH multi-layered hybrid control system:
1. **Execution Layer**: Optimizes low-cost non-reasoning models for task-irrelevant token selections.
2. **Deliberative Layer**: Reason orchestrators actively initiating disequilibratory goal updates.
3. **Metacognitive Layer**: Continuous Falsification Engine employing a Reviewer Agent for Algorithmic Reparation.

## Action-Alignment Loss & BDI Cognitive Scaffolding
To eliminate the "thought-action gap" (where agents predict the optimal state but fail to execute the utility-maximizing policy, collapsing to a Nash equilibrium), this repository implements:
1.  **Differentiable Action-Alignment Loss**: A PyTorch module (`src/models/action_alignment_loss.py`) that minimizes the step-wise regret between the agent's policy and the oracle Best Response.
2.  **Closed-Loop BDI ReCAP**: A neuro-symbolic simulation (`scripts/bdi_recap_sim.py`) demonstrating how Belief-Desire-Intention (BDI) logical vetos trigger Context-Aware Replanning to strictly enforce game-theoretic optimality.

## Developer Setup

**Prerequisites:**
*   Node.js (v18+ recommended)
*   npm

**Installation:**
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/aesthetic-alchemy-lab.git
    cd aesthetic-alchemy-lab
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

**Environment Variables:**
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```bash
VITE_API_KEY=your_gemini_api_key_here
```

**Run Development Server:**
Start the development server using the dev script:
```bash
npm run dev &
```
The application will bind to `http://localhost:5173` (or port 3000 depending on your environment).

## Usage Guide
1.  **Canvas Interaction:** Open the app and use the visual canvas to drag and drop prompt parameters.
2.  **Building the Pipeline:** Create a "Base Prompt" node to establish the core subject matter. Branch this out by connecting it to multiple "Parameter" nodes (e.g., Cyberpunk Lighting vs. Cinematic Lighting).
3.  **Execution:** Ensure paths lead into an "Output" node. Click "Generate Pipeline". The graph will be resolved backwards from the outputs to determine valid paths and execute concurrently via Gemini.
4.  **Dialectical Synthesis Engine:** If you wire up highly contradictory parameters, the system's "Dialectical Synthesis Engine" will detect "Ontological Shear" and halt the pipeline, returning a Justified Uncertainty Report (JUR) instead of generating a muddy image.

## Lessons Learned & Failures (Scars)
This project metabolizes failure dynamically. Algorithmic trauma, rejected approaches, and topological misalignments are aggressively logged to prevent recurrence:
*   `scars.yaml` and `SymbolicScar.json` track historical context and architectural shifts.
*   Active tracking logs like `aletheon_ssa.jsonl` and `viper_sta.jsonl` maintain failure histories for specific functional modules.

## Validation & Testing
To build the project for production:
```bash
npm run build
```

To run core tests (validating the graph executor and Dialectical Synthesis Engine):
```bash
npx tsx src/graphExecutor.test.ts
```

## AXIOM Integration
This repository integrates AXIOM, a Sovereign Syntactician for generating deterministic, legally binding technical documentation. AXIOM's blueprint is located in `AXIOM_BLUEPRINT.md` and failure modes are tracked in `axiom_ssr.jsonl`. AXIOM's MCP server endpoints (`retrieve_axiom_ssr`, `update_axiom_ssr`) enforce zero-ambiguity API constraints.


## Architectural Senescence Audit
- **Target:** `src/mcp_server.ts`
- **Finding:** Module exceeded cognitive complexity threshold due to God Object anti-pattern (1305 lines).
- **Hypothesis:** Decoupling MCP tool registration into `src/mcp_tools/` will resolve this.
- **Status:** Plan accepted and logged to `senescence_audit.json`.

## Context Engineering 2.0 & Personal Knowledge Corpus (PKC)
This repository implements the **Personal Knowledge Corpus (PKC)** Framework to invert the stateless nature of standard generative AI workflows.
*   **`pkc_manifest.yml`**: A mathematically and cryptographically bounded YAML schema that serves as an Executable Context Bundle (CxB). It tracks semantic drift, topological integrity, and enforces Meaning Space Anchors.
*   **Git-Anchored Context Hashing CLI Pipeline**: A `.git/hooks/pre-commit` script automatically seals and computes SHA-256 hashes of markdown files to prevent "data drift".
*   **Flesh-to-Symbol Ingestion Loop**: The `zotero_ingestion_loop.py` serves as a background OCR engine linking new unstructured PDF content into the structural PKC graph via Llama-3-8B semantic relationships.

## Epistemic Workbench (QED Integration)
This repository now implements the **Qualitative Experience Database (QED)** architecture. It acts as an Epistemic Workbench, compiling "lived experience" into highly grounded, drift-resistant context payloads adhering to the Minimal Explainability Metadata Schema (MEMS).
- **Decolonial Ontology Reconciliation**: Prevents aesthetic and cultural flattening via Pluriversal Resonance Filters.
- **Topological RAG Auditing**: Detects concept leakage using Topological Data Analysis (TDA) and Betti-1 loops.
- **Algorithmic Kintsugi**: Self-healing pipelines convert retrieval failures into generative priors.

## Architectural Refactoring: MCP Modularization
Following an Architectural Senescence Audit, the monolithic `mcp_server.ts` "God Object" has been decoupled. All tool registrations have been extracted into the modular `src/mcp_tools/` directory (Agent Tools, Core Tools, and Scar Tools), maintaining JSON-RPC Stdio contract integrity while significantly reducing cognitive complexity.
## UASTP Saga Recovery
This repository enforces an isomorphic mapping from Unified Agentic Skill & Tool Protocol (UASTP) declarative contracts to zero-entropy GitHub Actions ASTs. To prevent Catastrophic State Drift, stateful deviations caused by probabilistic agent decisions are wrapped in **Forward Transactions**, **Verification Gates**, and **Compensating Transactions** (via `.github/workflows/uastp-saga-recovery.yml`). If rollback fails, the Epistemic Escrow Circuit Breaker halts CI/CD.

## Research & Harness Simulations
The `scripts/scos_harness_sim.py` implements mathematical verification for three research inquiries:
1. **Topological Manifold Tearing**: Simulating Argocd and GitOps Sheaf Cohomology.
2. **Persistent Homology of Attention-Sink Cavities**: Analyzing ContextLock mitigations on beta-1 loops.
4. **Parsimonious Architecture Protocol (PAP)**: Utilizing an Occam Loss Compiler for theory selection via `scripts/pap_occam_razor_sim.py` to test Bayesian Model Reduction and Isomorphic Mapping.
3. **Non-Monotonic Saga Compensations**: Belnapian 4-valued logic to track orthogonality during API handshakes.
4. **N2E-CED Chrono-Topological Tracking**: Simulating circular contradictions (Betti-1 loops) in asymmetric multi-agent dialogue (`scripts/n2e_ced_sim.py`).
5. **Möbius Constitutional Verifier (MCV)**: Monitoring Concept-to-Code Decay and topological invariants across recursive refactoring cycles (`scripts/mcv_sim.py`).

## VCS Layer 3 Research Integrations

To further the deterministic boundaries of the Verifiable Cognition Stack (VCS), we have engineered and simulated advanced monitoring harnesses:
1. **Topological Homology Barcodes (`docs/topological_homology_whitepaper.md`)**: Analyzes internal activation manifolds for Betti-1 (Circular Reasoning) and Betti-2 (Epistemic Hollowness) ruptures.
2. **Neuro-Symbolic Gateway (`docs/neuro_symbolic_gateway_blueprint.md`)**: A differentiable logic engine for zero-trust tool execution, halting Polysemantic Divergence.
3. **SEPAO Autopoietic Scanners (`docs/sepao_technical_specification.md`, `scripts/sepao_scanner.py`)**: Environment drift monitoring via AST parsers that auto-generate Failure-Informed Prompt Inversions (F-IPI).
