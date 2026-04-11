# Aesthetic Alchemy Lab - Product Strategy & Requirements

## Vision
To evolve Aesthetic Alchemy Lab from a linear prompt exploration tool into an interconnected, multi-modal, and collaborative generative environment.

## Epics

### Epic 1: Node-based Prompt Chaining (COMPLETED)
**Description:** Transition from a linear form to a node-based interface where users can visually map out prompt parameters, link multiple generations, and create complex aesthetic pipelines.

#### User Stories & Acceptance Criteria
**US1.1: Node Interface Canvas (COMPLETED)**
As an artist, I want a visual canvas to drag and drop prompt parameters, so I can see the relationship between different aesthetic components.
*Acceptance Criteria:*
- Implement a zoomable/pannable canvas using a library like React Flow. (DONE via `@xyflow/react`)
- Users can create nodes for Base Prompts, Style, Lighting, Composition, and Generation Output. (DONE via `NodeCanvas.tsx`)
- Nodes can be connected via edges to form a generation pipeline. (DONE)

**US1.2: Branching Variations (COMPLETED)**
As an experimental creator, I want to split a single base prompt into multiple variation branches visually, so I can simultaneously generate and compare contrasting aesthetics.
*Acceptance Criteria:*
- A single text node can connect to multiple parameter nodes (e.g., one prompt -> cyberpunk lighting, one prompt -> volumetric lighting). (DONE)
- The "Generate" action executes all paths leading to an Output node. (DONE via `services/graphExecutor.ts`)

### Epic 2: Evolutionary Image Generation (Genetic Algorithm)
**Description:** Allow users to use generated images as "parents" to breed new variations, utilizing image-to-image capabilities or semantic prompt blending.

#### User Stories & Acceptance Criteria
**US2.1: Image Breeding Selection**
As a designer, I want to select two or more generated images and "breed" them, so the system interpolates their styles and prompts to create a novel offspring.
*Acceptance Criteria:*
- UI allows multi-selection of images from the History/Grid.
- A "Breed Selection" button extracts the parameters of selected images and generates a blended prompt/request.
- Resulting images are tagged as offspring of the selected parents.

**US2.2: Generational Tracking**
As a researcher, I want to see the lineage of my generated images, so I can retrace the evolutionary steps that led to a specific visual result.
*Acceptance Criteria:*
- A modal or side-panel displays a visual family tree for any given image.
- Users can revert to or branch off from any ancestor in the lineage.

### Epic 3: Collaborative Style Blueprints
**Description:** Evolve "Style Blueprints" from personal clipboard data into shareable, remixable assets across users or workspaces.

#### User Stories & Acceptance Criteria
**US3.1: Blueprint Publishing**
As a power user, I want to publish my highly-rated Style Blueprints to a public or team directory, so others can use my discovered aesthetic formulas.
*Acceptance Criteria:*
- Users can export a blueprint as a JSON schema or a shareable URL.
- Implement a backend store (or extended LocalStorage/IndexedDB for local MVP) to handle published blueprints.

**US3.2: Blueprint Remixing**
As a new user, I want to import someone else's Style Blueprint and tweak it, so I can learn from their techniques while adding my own spin.
*Acceptance Criteria:*
- Importing a blueprint populates the prompt form/canvas with the predefined parameters.
- Edits to imported blueprints are saved as a "Remix" with attribution to the original author.

## Stakeholder Perspective Analysis
- **Hobbyist Creators:** Need intuitive interfaces. The Node Canvas must have a low barrier to entry with templates.
- **Power Users/Prompt Engineers:** Need deep control. Evolutionary generation and precise parameter weighting satisfy this.
- **Dev Team (Human & AI):** Need clear data structures. The shift to nodes and lineages requires updating `types.ts` to support directed acyclic graphs (DAGs) and parent-child entity relationships.

## Implementation Roadmap (Near Term)
1. Architect data models for Graph/Node structures in `types.ts`. (COMPLETED)
2. Integrate React Flow for the visual canvas MVP. (COMPLETED)
3. Update `geminiService.ts` / `graphExecutor.ts` to handle parallelized prompt generation from the graph edges. (COMPLETED)

## Algorithmic Reparations & Epistemic Trajectories
*Note: Instantiated via ALK Protocol (AEW v2.2)*
- **Data Types Formalized**: Step 1 of the implementation roadmap (Graph/Node models in `types.ts`) has been completed.
- **DAG Execution Validation**: DAG validity is guaranteed via `services/graphExecutor.ts`, rejecting topological collapse and supporting US1.2.
Root: React/Vite
├── Auth: None — N/A
├── DB: LocalStorage — Browser API
├── API: Gemini API — REST via @google/genai
├── UI: Tailwind CSS — Utility classes + React Flow
└── Infra: Node — Vite Dev Server

DATA FLOWS:
User → [UI (NodeCanvas)] → [Graph Executor] → [API] → [UI] → [DB]

MEREOLOGICAL MAP:
Component ∈ Service ∈ Module ∈ Root

UPCOMING STRATEGIC SHIFTS:
- Data: Expanding types to support Directed Acyclic Graphs (DAGs) for prompt lineage and evolutionary tracking. (IN PROGRESS - Epic 2)
- Sharing: Introducing import/export mechanisms for Collaborative Blueprints.

### Pluriversal Topological Shift (AEW v2.2)
The data structures have shifted from linear state objects to Directed Acyclic Graphs (DAGs) using `PipelineGraph`, `PipelineNode`, and `PipelineEdge`. This topology enables node-based processing and combinatorial branching paths. The linear UI constraint has been shattered via Epic 1 completion.
