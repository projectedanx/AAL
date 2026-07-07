# ADR 006: VORTEX-ARCHITECT Constraints Enforcement

## Status
Accepted

## Context
The Aesthetic Alchemy Lab is susceptible to "Semantic Saponification"—the decay of structural constraints into generic, homogenized outputs when complex prompts are merged. We've introduced the VORTEX-ARCHITECT agent persona to combat this. To truly enforce deterministic generation boundaries, the DAG must physically validate VORTEX constructs before generation begins.

## Decision
We have added topological validation logic to the `executeGraph` pipeline for two specific VORTEX nodes:
1. `VORTEX_DCCD_ENFORCER`: Must have a `dccdSchema` property defined. If missing, it indicates a failure to lock the decoding space, and generation will suspend with a Justified Uncertainty Report (JUR).
2. `VORTEX_STIGMERGIC_LOCK`: Must have an `anchor` or `label` property defined. If missing, it implies a failure in Semantic Mutex locking, leading to potential logic shearing, and generation will suspend with a JUR.

## Consequences
- **Positive:** Mathematically enforces Negative Space Scaffolding. Impossible to bypass Draft-Conditioned Constrained Decoding or Stigmergic Locking if the nodes are on the canvas.
- **Negative:** Increased strictness requires users/agents to properly configure these nodes, potentially leading to more halted generations (which is preferred over degraded quality).
