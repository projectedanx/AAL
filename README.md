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
