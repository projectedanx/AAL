import re

with open('services/graphExecutor.ts', 'r') as f:
    content = f.read()

# 1. Import JustifiedUncertaintyReport
content = content.replace("export { PipelineNodeType, GenerationResult } from '../types';", "export { PipelineNodeType, GenerationResult, JustifiedUncertaintyReport } from '../types';")
content = content.replace("import { PipelineNodeType, GenerationResult } from '../types';", "import { PipelineNodeType, GenerationResult, JustifiedUncertaintyReport } from '../types';")

# 2. Add Dialectical Synthesis logic
synthesis_logic = """
/**
 * Dialectical Synthesis Engine Core
 * Calculates the Ontological Shear between contradictory directives using the Golden Scar Protocol.
 */
const synthesizeJUR = (path: TraversalPath): JustifiedUncertaintyReport | undefined => {
    if (!path.contradictoryDirectives || path.contradictoryDirectives.length < 2) {
        return undefined; // No paradox to resolve
    }

    // Golden Scar Protocol calculation (mocked for topological mapping)
    // In a full implementation, this would involve DE-9IM SDF mapping over the text embeddings.
    const empiricalWeight = 1.618;
    const stochasticWeight = 1.000;

    // Geometric Density Score = (Constraints * Weight) / (Variations * Stochastic Weight) normalized
    const constraintCount = path.pdtConstraints?.length || 1;
    const variationCount = path.parameters.length || 1;
    const rawDensity = (constraintCount * empiricalWeight) / (variationCount * stochasticWeight);
    const normalizedDensity = Math.min(Math.max(rawDensity * 0.5, 0.1), 0.99); // Bound between 0.1 and 0.99

    return {
        geometricDensityScore: parseFloat(normalizedDensity.toFixed(2)),
        ontologicalShear: `Tension detected between [${path.contradictoryDirectives[0]}] and [${path.contradictoryDirectives[1]}]. AI generation suspended in paraconsistent state.`,
        contradictions: path.contradictoryDirectives,
        goldenRatioApplied: true
    };
};
"""

content = content.replace("const findPaths = (nodes: Node[], edges: Edge[]): TraversalPath[] => {", synthesis_logic + "\nconst findPaths = (nodes: Node[], edges: Edge[]): TraversalPath[] => {")

# 3. Apply JUR to GenerationResult inside executeGraph
# We need to map JUR from groupedPaths to results
group_reduce_logic = """    const groupedPaths = paths.reduce((acc, path) => {
        // Find the primary parameter to group by (simplification for compatibility with existing types)
        const primaryParam = path.parameters[0]?.parameter || 'Mixed';
        const key = `${path.basePrompt}-${primaryParam}`;
        if (!acc[key]) {
            acc[key] = { basePrompt: path.basePrompt, parameter: primaryParam, variations: [], originalPath: path };
        }
        acc[key].variations.push(path.parameters.map(p => p.variation).join(' + '));
        return acc;
    }, {} as Record<string, { basePrompt: string, parameter: string, variations: string[], originalPath: TraversalPath }>);"""

content = re.sub(r'    const groupedPaths = paths\.reduce\(\(acc, path\) => \{\s*// Find the primary parameter to group by \(simplification for compatibility with existing types\)\s*const primaryParam = path\.parameters\[0\]\?\.parameter \|\| \'Mixed\';\s*const key = `\$\{path\.basePrompt\}-\$\{primaryParam\}`;\s*if \(!acc\[key\]\) \{\s*acc\[key\] = \{ basePrompt: path\.basePrompt, parameter: primaryParam, variations: \[\] \};\s*\}\s*acc\[key\]\.variations\.push\(path\.parameters\.map\(p => p\.variation\)\.join\(\' \+ \'\}\)\);\s*return acc;\s*\}, \{\} as Record<string, \{ basePrompt: string, parameter: string, variations: string\[\] \}>\);', group_reduce_logic, content, flags=re.DOTALL)


# Fix the regex replace for group_reduce_logic since it failed (or might fail) due to exact match issues. Let's do a more robust replace.

group_reduce_search = """    const groupedPaths = paths.reduce((acc, path) => {
        // Find the primary parameter to group by (simplification for compatibility with existing types)
        const primaryParam = path.parameters[0]?.parameter || 'Mixed';
        const key = `${path.basePrompt}-${primaryParam}`;
        if (!acc[key]) {
            acc[key] = { basePrompt: path.basePrompt, parameter: primaryParam, variations: [] };
        }
        acc[key].variations.push(path.parameters.map(p => p.variation).join(' + '));
        return acc;
    }, {} as Record<string, { basePrompt: string, parameter: string, variations: string[] }>);"""

if group_reduce_search in content:
    content = content.replace(group_reduce_search, group_reduce_logic)

# Map jur to the results push
results_push_search = """            results.push({
                id: crypto.randomUUID(),
                basePrompt: group.basePrompt,
                parameter: group.parameter as any, // Cast to any to satisfy AestheticParameter enum if mixed
                variations: uniqueVariations,
                images: images.map(img => ({
                    ...img,
                    id: crypto.randomUUID(),
                })),
                timestamp: new Date().toLocaleString(),
                temperature: 0.5
            });"""

results_push_replace = """
            const jur = synthesizeJUR(group.originalPath);

            results.push({
                id: crypto.randomUUID(),
                basePrompt: group.basePrompt,
                parameter: group.parameter as any, // Cast to any to satisfy AestheticParameter enum if mixed
                variations: uniqueVariations,
                images: images.map(img => ({
                    ...img,
                    id: crypto.randomUUID(),
                })),
                timestamp: new Date().toLocaleString(),
                temperature: 0.5,
                jur
            });"""

content = content.replace(results_push_search, results_push_replace)

with open('services/graphExecutor.ts', 'w') as f:
    f.write(content)
