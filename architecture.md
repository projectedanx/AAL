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

## Z-Axis Topology & DAG Data Flows
To support Node-based Prompt Chaining and Evolutionary Generation, the architecture employs a Directed Acyclic Graph (DAG) structural topology.
Data is mapped not just temporally (X-axis), but compositionally. Synthesized generations are promoted to an inferred Z-Axis, allowing contradictory aesthetic paradigms to coalesce without destructively altering the base (`Constitutional Austenite`) nodes.
Data Types `GraphNode` and `GraphEdge` facilitate this topological leap, ensuring mereological traceability.
