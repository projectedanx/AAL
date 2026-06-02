## Dependency Matrix & Entropy Audit

> Thermodynamic Lens (L3) applied.
> Entropy Score: 0 = deterministic, 1 = fully chaotic.

### Build Reproducibility Index

| Dependency | Version Pin | Production? | CI Invoked? | Entropy Vector |
|---|---|---|---|---|
| `@google/genai` | `1.25.0` (exact pin) | ✅ Yes | ❌ No CI | ✅ LOW |
| `@modelcontextprotocol/sdk` | `1.29.0` (exact pin) | ✅ Yes | ❌ No CI | ✅ LOW |
| `@xyflow/react` | `12.10.2` (exact pin) | ✅ Yes | ❌ No CI | ✅ LOW |
| `react` | `19.2.0` (exact pin) | ✅ Yes | ❌ No CI | ✅ LOW |
| `vite` | `6.4.2` (exact pin) | ❌ Dev only | ❌ No CI | ✅ LOW |
| `playwright` | `1.60.0` (exact pin) | ❌ Dev only | ❌ No CI | ⚠️ PHANTOM TEST DEPS (No CI) |

### Entropy Score by Layer

| Layer | Score | Primary Source |
|---|---|---|
| Environment (Docker/ENV) | 0.85 | 2 undeclared required ENV vars (`API_KEY`, `GEMINI_API_KEY`), 0 declared. |
| Application Dependencies | 0.10 | All dependencies strictly pinned. |
| CI Pipeline | 1.00 | Non-existent CI pipeline. |
| Infrastructure (IaC) | 1.00 | Non-existent infrastructure definitions. |
| Test Coverage | 0.80 | Tests exist but lack automated CI orchestration. |
| **Overall Repository Entropy** | **0.75** | **Target: < 0.15** |
