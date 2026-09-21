## Operational Runbook

### Time-to-Deploy (TTD) Sequence

> **Measured TTD (from commit to production):** INDETERMINATE
> **Target TTD:** < 3 minutes
> **Bottleneck:** No automated deployment pipeline exists. Build output (`dist/`) must be manually distributed.

#### To Build a Release Artifact

1. Install dependencies locally:
   ```bash
   npm install
   ```
2. Run local test suite (Manual Step):
   ```bash
   npx tsx src/graphExecutor.test.ts
   ```
3. Generate production build:
   ```bash
   npm run build
   ```

> ⚠️ **SILENT_REQUIRED_ENV — Set before execution:**
> `VITE_API_KEY` — Documented in README, mapped to Vite environment.
> `GEMINI_API_KEY` / `API_KEY` — Expected by `src/services/geminiService.ts` runtime or `.env` fallback. Must be provided for generation logic to succeed.

---

## Symbolic Scar Tissue Log — Cultural Artifacts

> Per DRP_7: Golden_Scar_Tension pattern.
> These artifacts are PRESERVED, not standardized.
> Φ-weighting: 1.618 (native logic) vs 1.000 (standard).

### Golden Scar #001: Model Constraint Assumptions
- **Location:** `src/services/geminiService.ts:L32-L33`
- **Tension:** Parameters `temperature` and `seed` are explicitly documented as unsupported by the underlying `imagen-4.0-generate-001` model API via inline `// NOTE:` comments.
- **Recommendation:** Do not attempt to re-introduce `temperature` or `seed` to the `generateImages` config payload without explicit release notes from the upstream Google GenAI API confirming support. This architectural scar prevents 400 Bad Request responses.

### Cultural Artifact #001: Missing CI Topology
- **Location:** Repository Root
- **Tension:** The repository completely lacks automated workflow enforcement (no `.github/workflows/`), relying on high-trust local execution (`npm run dev`, `npx tsx`).
- **Recommendation:** Document as [CULTURAL_ARTIFACT]. The absence of CI is an entropy vector but represents the current developmental stage (Phase 1/2 localized topology).

### Research Artifacts

> **Integration of High-Value Research Outputs for L3 Integration**
> Artifacts added during formalization of the Verifiable Cognition Stack (VCS).

#### 1. Topological Homology Barcodes
- **Document:** `docs/topological_homology_whitepaper.md`
- **Purpose:** Deconstructing Latent Spaces via Persistent Homology to Detect Topological Voids and Semantic Ruptures in Multi-Agent Memory Architectures. Defines the $\beta_1$ and $\beta_2$ failure modes.

#### 2. Differentiable Logic Engines
- **Document:** `docs/neuro_symbolic_gateway_blueprint.md`
- **Purpose:** Engineering a Hybrid Neuro-Symbolic Gatekeeper using Differentiable Logic Programming and Abstract Interpretation for Zero-Trust Tool Execution. Prevents Polysemantic Divergence.

#### 3. Autopoietic Self-Healing Ontologies via SEPAO Scanners
- **Specification:** `docs/sepao_technical_specification.md`
- **Implementation:** `scripts/sepao_scanner.py`
- **Purpose:** Designing an Autopoietic Self-Healing Ontology Engine using Static AST Analysis and Failure-Informed Prompt Inversion. Simulates environmental drift detection and F-IPI generation.
