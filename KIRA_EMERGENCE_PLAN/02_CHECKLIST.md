# KIRA-7 Implementation Checklist

1. [ ] Create `KIRA_EMERGENCE_PLAN/01_STRATEGY.md` and `KIRA_EMERGENCE_PLAN/02_CHECKLIST.md`.
2. [ ] Create `KIRA_BLUEPRINT.md` defining the KIRA-7 persona, Petzold Sequence, and SCAR mappings.
3. [ ] Initialize `kira_scar_registry.jsonl`.
4. [ ] Update `src/mcp_server.ts` to expose `retrieve_kira_ssr` and `update_kira_ssr` tools.
5. [ ] Update `types.ts` to include `PipelineNodeType.KIRA_WEBHOOK_INGRESS` and `PipelineNodeType.KIRA_CARD_BUILDER`, plus necessary node payload properties (e.g., `encryptKey`, `verificationToken`, `cardSchema`).
6. [ ] Update `components/NodeCanvas.tsx` to render KIRA nodes with color `#00D6B9` (Neon Teal).
7. [ ] Update `services/graphExecutor.ts` to implement KIRA routing checks (e.g., Schema validation, Token Primacy validation) using the Golden Scar Protocol upon failures.
8. [ ] Update `README.md` to reflect KIRA-7's integration and architectural constraints.
9. [ ] Execute pre-commit checks (`npx tsc`, Python playwright script).
