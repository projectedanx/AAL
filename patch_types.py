import re

with open('types.ts', 'r') as f:
    content = f.read()

jur_interface = """
/**
 * Justified Uncertainty Report (JUR)
 * Manifests the tension (Ontological Shear) between deterministic persona constraints
 * and probabilistic generation, weighted via the Golden Scar Protocol.
 */
export interface JustifiedUncertaintyReport {
  geometricDensityScore: number; // The measured density of constraints (e.g., 0.88)
  ontologicalShear: string; // Narrative description of the contradiction
  contradictions: string[]; // The specific PAL2v directives held in tension
  goldenRatioApplied: boolean; // Confirms 1.618 weighting of empirical datums
}
"""

if "export interface JustifiedUncertaintyReport" not in content:
    content = content.replace("export interface GenerationResult {", jur_interface + "\nexport interface GenerationResult {")


generation_result_update = """  timestamp: string;
  temperature: number;
  seed?: number;
  jur?: JustifiedUncertaintyReport; // Dialectical Synthesis Output
"""
content = re.sub(r'  timestamp: string;\n  temperature: number;\n  seed\?: number;\n', generation_result_update, content)

with open('types.ts', 'w') as f:
    f.write(content)
