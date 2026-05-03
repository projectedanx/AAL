# WRITE: Implementation Checklist (Epic 8 & Cross-Modal Fusion)

1. [ ] Update `types.ts` to include `PipelineNodeType.MULTISPECTRAL_CONDITIONING` and extend `PipelineNode.data` with `spectralTargets: Array<{ target: string, wavelength: number }>`.
2. [ ] Integrate `GeometricCognition.ts` and `OracleFeedbackLoop.ts` concepts directly into `services/graphExecutor.ts`.
3. [ ] Modify `findPaths` in `graphExecutor.ts` to accumulate `spectralTargets` traversing through Multispectral conditioning nodes.
4. [ ] Modify `executeGraph` in `graphExecutor.ts` to run paths through `GeometricCausalSculptor` (using a default or randomly assigned NonEuclidean topology for demonstration of constraints) before generating via `geminiService`.
5. [ ] Integrate `PlausibilityOracle` evaluation into `executeGraph` to simulate scoring the outputs and logging drift via `ProvenanceTracker`.
6. [ ] Update `README.md` to reflect the active integration of PROJECT_AURELIUS (Epic 8).
7. [ ] Ensure we have completed Pre-Commit checks before final deployment.
