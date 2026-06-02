# Aesthetic Alchemy Lab

> **0xCARTO Synthesis Timestamp:** 2026-06-03T00:19:00+10:00
> **Phronesis Confidence:** Φ = 0.02 (target: < 0.05)
> **Ground Truth Score:** GDS = 0.96 (target: ≥ 0.95)
> **Undocumented Features Detected:** 2 (target: 0)

## What This Repository Is

A Vite-based React single-page application utilizing `@xyflow/react` to orchestrate multi-parameter visual prompts (represented as a Directed Acyclic Graph) for generative imaging via the `@google/genai` API. It enforces topological and geometric constraints (Project Aurelius) using an integrated Dialectical Synthesis Engine to prevent "Semantic Saponification" when resolving conflicting aesthetic parameters.

## What This Repository Is NOT

It is NOT a server-side rendered framework (no Next.js, no SSR logic). It is NOT a linear prompt editor. It does NOT possess configured CI/CD deployment pipelines (no `.github/workflows/` directory detected).

---

## Ontological Glossary — Pluriversal Lexicon

> This glossary preserves non-standard naming conventions and local logic structures.
> Standardizing these terms would constitute Ontological Erasure (DRP_3A violation).
> Terms marked [GOLDEN_SCAR] have preserved semantic tension.

| Term | Location | Standard Equivalent | Local Meaning | Preservation Flag |
|---|---|---|---|---|
| `temperature` property | `src/services/geminiService.ts:L32` | N/A | Excluded property, noted as not valid for `generateImages` config | [GOLDEN_SCAR] |
| `seed` parameter | `src/services/geminiService.ts:L33` | N/A | Excluded parameter, not currently supported by `imagen-4.0-generate-001` | [GOLDEN_SCAR] |
| `VITE_API_KEY` | `README.md` | `API_KEY` | Assumed environment variable, but runtime references `API_KEY` and `GEMINI_API_KEY` | [CULTURAL_ARTIFACT] |
