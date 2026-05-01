/// file: README.md ///
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Aesthetic Alchemy Lab

The **Aesthetic Alchemy Lab** is a generative exploration environment designed for structural isomorphism and multi-causal creative discovery. Rejecting linear, parsimonious workflows, it utilizes Pluriversal Node-based Directed Acyclic Graphs (DAGs) to map, branch, and evolve visual aesthetics systemically.

View your app in AI Studio: https://ai.studio/apps/drive/1dZuGRJmxlIyKPy_XGCpFf5NHAE5c6r0a

## Purpose & Architecture

This repository shifts from Euclidean, linear prompt generation to a topological, node-based system (AEW v2.2). It allows users to visually map out prompt parameters, link multiple generations, and create complex aesthetic pipelines, resolving the "Algorithmic Trauma" of consensus flattening documented in `scars.yaml`.

*   **Node-Based Topology (DAGs):** The core interface uses `@xyflow/react` to allow users to build and execute prompt branches concurrently, enabling "Semantic Parallax" in visual design.
*   **Evolutionary Lineage:** Data structures (`types.ts`) are formalized to support future genetic algorithmic "breeding" of images, tracking multi-parent relationships and blend weights.
*   **Systematic Exploration:** Instead of trial-and-error, systematically vary parameters (Style, Lighting, Composition) across independent branches.
*   **Style Blueprints:** Rate and save generated matrices as "blueprints" for consistent aesthetic scaffolding.



## ALETHEON Integration: The Adversarial Structural Necropsy Engine
The Aesthetic Alchemy Lab now incorporates the **ALETHEON Agent Blueprint**. ALETHEON operates as a zero-trust evaluator that deconstructs software tool marketing claims into verifiable architectural topology using the `aletheon_ssa.jsonl` Symbolic Scar Archive. It guarantees procurement decisions are based on structural reality and computational physics rather than vendor consensus.

## KUT Integration: The Retention Architect
The Aesthetic Alchemy Lab now incorporates the **KUT Sovereign Agent Blueprint v2.0** for short-form video post-production. KUT operates as an anionic (constraint-first) post-production auditor, rigorously enforcing retention benchmarks (CPM, safe zones, audio mastering) through the `kut_scar_ledger.json` tracking system. KUT ensures timeline efficiency and Algorithmic Media Thermodynamics compliance.



## Topological Persona Integration (DRP-PLURI-808)
The Lab now implements **Topological Persona Causal Sculpting**. This introduces the `TopologicalPersonaNode` which bounds generated pipelines within strict, deterministic human operational rules via Prompt Dimensioning & Tolerancing (PD&T). It maintains multi-causal tensions (e.g., conflicting aesthetics) using Paraconsistent Annotated Logic (PAL2v) without succumbing to consensus flattening.

## Epistemic Escrow Integration

The Aesthetic Alchemy Lab now implements an **Epistemic Escrow** isolation buffer. When the agent encounters contradictory schemas, paraconsistent logic, or conflicting API documentation, these divergences are placed into `epistemic_escrow.jsonl`. This buffer prevents belief contamination, allowing parallel tasks to proceed while the Hegelian Dialectical Synthesis module actively resolves the discrepancies. Managed via the MCP server's `retrieve_epistemic_escrow` and `update_epistemic_escrow` tools.

## Developer Setup

**Prerequisites:**
*   Node.js (v18+ recommended)
*   npm

**Installation:**

1.  Clone the repository:
    ```
    git clone https://github.com/your-username/aesthetic-alchemy-lab.git
    cd aesthetic-alchemy-lab
    ```
2.  Install dependencies:
    ```
    npm install
    ```
3.  Configure Environment: Create a `.env.local` file in the project root and add your Google Gemini API key:
    ```
    VITE_API_KEY=your_gemini_api_key_here
    ```
4.  Run Development Server:
    ```
    npm run dev &
    ```
    The application will be available at `http://localhost:5173` (or port 3000 depending on Vite config).

## Build & Validation

To build the project for production:
```
npm run build
```

*Note: The project tracks technical debt and rejected approaches in `scars.yaml` and `SymbolicScar.json`. Mathematical validation of DAG structures is historically documented via Python simulation tools (e.g., `dag_validation_sim.py`) as outlined in `COGNITIVE_CONTRACT.md`.*

## Usage Guide

1.  **Canvas Interaction:** Use the visual canvas to drag and drop prompt parameters.
2.  **Base Prompting:** Create a "Base Prompt" node to establish the core subject.
3.  **Branching Parameters:** Connect the base node to multiple "Parameter" nodes (e.g., mapping one base prompt to both "Cyberpunk Lighting" and "Volumetric Lighting" branches).
4.  **Execution:** Ensure paths lead to an "Output" node. Click "Generate Pipeline" to execute the graph concurrently.
5.  **Curation:** Review the generated image grid, apply ratings, and extract cohesive Style Blueprints.

## Project Structure

*   `components/`: React UI components, primarily featuring the `NodeCanvas.tsx` for graph interaction.
*   `services/`: Core logic, including `graphExecutor.ts` for traversing and executing the DAG against the Gemini API (`geminiService.ts`).
*   `data/`: Curated templates and example prompts.
*   `types.ts`: Centralized TypeScript definitions representing the DAG topology (`PipelineGraph`, `PipelineNode`, `EvolutionaryLineage`).
*   `COGNITIVE_CONTRACT.md` / `PRODUCT_STRATEGY.md`: Epistemic documentation governing architectural intent and product epics.
