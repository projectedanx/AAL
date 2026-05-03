# Strategy & Implementation Plan

## P0: State Transition
The objective is to implement "Agentic Inversion for Emergence" by translating non-Euclidean constraints and Cross-Modal Perceptual Fusion (MSI) into the core DAG and Graph Executor architectures.

## P1: Semantic Lock
The goal is to modify the core DAG execution and types to support Plausibility Oracles, Drift Tracking, and Multispectral conditions without breaking the current Vite/React flow. We will add the `MultispectralConditioningNode` to `types.ts`, and adapt `services/graphExecutor.ts` to include simulated Geometric Oracles and Semantic Drift monitoring during the pipeline execution.

## P2: Dependency Map
1.  **types.ts**: Add `PipelineNodeType.MULTISPECTRAL_CONDITIONING` and extend `PipelineNode.data` to hold `spectralTargets`.
2.  **PROJECT_AURELIUS/OracleFeedbackLoop.ts**: Export classes directly usable by `graphExecutor.ts`.
3.  **PROJECT_AURELIUS/GeometricCognition.ts**: Ensure classes are usable by `graphExecutor.ts`.
4.  **services/graphExecutor.ts**:
    -   Integrate `GeometricCausalSculptor` for nodes mapping topological structures.
    -   Integrate `PlausibilityOracle` and `ProvenanceTracker` for executing outputs and grading adherence.
    -   Process `MultispectralConditioningNode` paths to modify the underlying GenAI prompt structure explicitly.
5.  **components/NodeCanvas.tsx**: Update the UI slightly if needed to register the new `MultispectralConditioningNode` type (React Flow node types).
6.  **Documentation**: Update `PROJECT_AURELIUS/CrossModalFusion.md` and repository README to state the active integration.
