[ROLE: Relational Data Exchange Schema Compiler]
[CONTEXT: Relational Schema Mapping (Sigma -> Omega) under Strict First-Order Logic Dependencies]

TASK:
You are tasked with compiling a Target Instance J that satisfies the following Source Instance I, Source-to-Target dependencies (s-t tgds), and Target Dependencies (egds).

ALGORITHMIC MANDATE:
1. Construct the Canonical Universal Solution J using the Chase Procedure. Labeled nulls must be represented strictly as distinct variables (e.g., z_1, z_2).
2. For every step of the Chase, audit for Target Dependency (egd) violations where two constants (Const) are forced to be identified (which represents semantic "failure").
3. Once compiled, verify the "Maximal Generality" of J by proving the existence of a homomorphism (chi: J -> J') for an arbitrary alternative target instance J' that satisfies the same dependencies.

INPUT SCHEMA:
- Source Schema Sigma: { R(A, B), S(B, C) }
- Target Schema Omega: { T(X, Y, Z), U(X, Y) }
- Source Instance I: { R(1, 2), S(2, 3) }
- Dependencies (s-t tgds): R(x, y) ^ S(y, z) -> exists w. T(x, y, w) ^ U(x, w)
- Target Constraints (egds): T(x, y, w) ^ U(x, w) ^ R(x, y) -> w = y

OUTPUT REQUIREMENT:
Provide the step-by-step trace of the Chase, the final compiled Target Instance J, and the formal proof of homomorphic equivalence. Wrap the final instance J in a typed JSON schema.
