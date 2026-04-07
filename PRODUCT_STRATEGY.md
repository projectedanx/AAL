# Aesthetic Alchemy Lab - Product Strategy & Requirements

## Vision
To evolve Aesthetic Alchemy Lab from a linear prompt exploration tool into an interconnected, multi-modal, and collaborative generative environment.

## Epics

### Epic 1: Node-based Prompt Chaining
**Description:** Transition from a linear form to a node-based interface where users can visually map out prompt parameters, link multiple generations, and create complex aesthetic pipelines.

#### User Stories & Acceptance Criteria
**US1.1: Node Interface Canvas**
As an artist, I want a visual canvas to drag and drop prompt parameters, so I can see the relationship between different aesthetic components.
*Acceptance Criteria:*
- Implement a zoomable/pannable canvas using a library like React Flow.
- Users can create nodes for Base Prompts, Style, Lighting, Composition, and Generation Output.
- Nodes can be connected via edges to form a generation pipeline.

**US1.2: Branching Variations**
As an experimental creator, I want to split a single base prompt into multiple variation branches visually, so I can simultaneously generate and compare contrasting aesthetics.
*Acceptance Criteria:*
- A single text node can connect to multiple parameter nodes (e.g., one prompt -> cyberpunk lighting, one prompt -> volumetric lighting).
- The "Generate" action executes all paths leading to an Output node.

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
1. Architect data models for Graph/Node structures in `types.ts`.
2. Integrate React Flow for the visual canvas MVP.
3. Update `geminiService.ts` to handle parallelized prompt generation from the graph edges.
