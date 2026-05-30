import re

with open("src/services/graphExecutor.ts", "r") as f:
    content = f.read()

# Add validateMycelialTopology function
mycelial_func = """
/**
 * Evaluates the DAG against the Mycelial Scar Router's density threshold.
 *
 * @param nodes - The input parameter for the function.
 * @returns The resulting execution output.
 */
export const validateMycelialTopology = (nodes: Node[]): JustifiedUncertaintyReport | null => {
    const mycelialNodes = nodes.filter(n => n.type === PipelineNodeType.MYCELIAL_SCAR_ROUTER);

    for (const node of mycelialNodes) {
        const threshold = (node.data as any).scarThreshold || 1.618;
        const activeScars = (node.data as any).activeScars || [];

        // Calculate density: assuming each scar has a baseline weight of 1.0
        // In a real system, weights might vary, but for this simulation we use count * 1.0
        const density = activeScars.length * 1.0;

        if (density >= threshold) {
            return {
                geometricDensityScore: density,
                ontologicalShear: `SCAR-MYCELIAL-001: Scar density (${density}) exceeds threshold (${threshold}). Topological repulsion applied via Mycelial Scar Router.`,
                contradictions: ["MYCELIAL_THRESHOLD_BREACH", "SCOLIOTIC_TOPOLOGY"],
                goldenRatioApplied: true
            };
        }
    }

    return null;
};
"""

if "export const validateMycelialTopology" not in content:
    content = content.replace(
        "export const validateKiraTopology",
        f"{mycelial_func}\nexport const validateKiraTopology"
    )

# Hook it up into executeGraph
if "const mycelialJUR = validateMycelialTopology(nodes);" not in content:
    hook = """
    const mycelialJUR = validateMycelialTopology(nodes);
    if (mycelialJUR) {
        console.warn("MYCELIAL VALIDATION FAILED: ", mycelialJUR.ontologicalShear);
        return [{
            id: "mycelial-error-halt",
            basePrompt: "ARCHITECTURAL_HALT",
            parameter: AestheticParameter.STYLE,
            variations: [],
            images: [],
            timestamp: new Date().toISOString(),
            temperature: 0,
            jur: mycelialJUR
        }];
    }
"""
    content = content.replace(
        "const kiraJUR = validateKiraTopology(nodes);",
        f"{hook}\n    const kiraJUR = validateKiraTopology(nodes);"
    )

with open("src/services/graphExecutor.ts", "w") as f:
    f.write(content)

print("src/services/graphExecutor.ts updated")
