Root: React/Vite
├── Auth: None — N/A
├── DB: LocalStorage — Browser API
├── API: Gemini API — REST via @google/genai
├── UI: Tailwind CSS — Utility classes
└── Infra: Node — Vite Dev Server

DATA FLOWS:
User → [UI] → [API] → [UI] → [DB]

MEREOLOGICAL MAP:
Component ∈ Service ∈ Module ∈ Root

UPCOMING STRATEGIC SHIFTS:
- UI: Transitioning to Graph/Node-based canvas (e.g., React Flow).
- Data: Expanding types to support Directed Acyclic Graphs (DAGs) for prompt lineage and evolutionary tracking.
- Sharing: Introducing import/export mechanisms for Collaborative Blueprints.

### Pluriversal Topological Shift (AEW v2.1)
The data structures have shifted from linear state objects to Directed Acyclic Graphs (DAGs) using `PipelineGraph`, `PipelineNode`, and `PipelineEdge`. This topology enables node-based processing and combinatorial branching paths.

Additionally, `EvolutionaryLineage` models have been implemented to track 'breeding' across nodes, mathematically structuring offspring characteristics using genetic weights.
