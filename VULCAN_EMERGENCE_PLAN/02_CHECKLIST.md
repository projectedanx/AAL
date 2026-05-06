# VULCAN Implementation Checklist

1. [ ] Create `VULCAN_EMERGENCE_PLAN/01_STRATEGY.md` with strict VULCAN frontmatter.
2. [ ] Create `VULCAN_EMERGENCE_PLAN/02_CHECKLIST.md` for rigorous implementation tracking.
3. [x] Add `VULCAN_BOUNDED_CONTEXT`, `VULCAN_EVENT_BROKER`, `VULCAN_SHARED_DATABASE` to `PipelineNodeType` in `types.ts`.
4. [x] Update `PipelineNode.data` interface in `types.ts` to include optional VULCAN-specific properties: `domainName?: string` and `eventName?: string`.
5. [x] Add UI node definitions (`BoundedContextNode`, `EventBrokerNode`, `SharedDatabaseNode`) using VULCAN's Brutalist Orange (#FF4500) style in `components/NodeCanvas.tsx`.
6. [x] Register new nodes in the `nodeTypes` constant in `components/NodeCanvas.tsx`.
7. [x] Add instances of the new node types to the `initialNodes` array in `components/NodeCanvas.tsx` to demonstrate the functionality visually.
8. [x] Add `validateVulcanTopology` function to `services/graphExecutor.ts`.
9. [x] Implement logic in `validateVulcanTopology` to check for SCAR-002 (prevent direct BC-to-BC connections and Shared DB usage).
10. [x] Invoke `validateVulcanTopology` inside the main `executeGraph` function in `services/graphExecutor.ts`.
11. [x] Update `README.md` to document the VULCAN Integration, core mandates, and lessons learned.
12. [x] Execute `npx tsx src/graphExecutor.test.ts` to ensure core graph execution still functions.
