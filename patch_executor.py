import re

with open('services/graphExecutor.ts', 'r') as f:
    content = f.read()

vulcan_validation = """
/**
 * VULCAN Topology Validator
 * Enforces the Mereological Mandate and the Shared Database Anathema (SCAR-002)
 * via Failure-Informed Prompt Inversion (FIPI).
 */
export const validateVulcanTopology = (nodes: Node[], edges: Edge[]): JustifiedUncertaintyReport | null => {
    for (const edge of edges) {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);

        if (!sourceNode || !targetNode) continue;

        // SCAR-002: The Shared Database Anathema
        if (targetNode.type === PipelineNodeType.VULCAN_SHARED_DATABASE || sourceNode.type === PipelineNodeType.VULCAN_SHARED_DATABASE) {
            return {
                geometricDensityScore: 1.0,
                ontologicalShear: "SCAR-002: Shared Database Pattern Detected. Two bounded contexts writing to the same schema obliterates deployment independence.",
                contradictions: ["VULCAN_SHARED_DATABASE_ANATHEMA", "CAP_THEOREM_VIOLATION_RISK"],
                goldenRatioApplied: true
            };
        }

        // SCAR-004: Sync REST Chain of Death (Bounded Context directly to Bounded Context without Event Broker)
        if (sourceNode.type === PipelineNodeType.VULCAN_BOUNDED_CONTEXT && targetNode.type === PipelineNodeType.VULCAN_BOUNDED_CONTEXT) {
             return {
                geometricDensityScore: 1.0,
                ontologicalShear: "SCAR-004: Synchronous Coupling Detected. Bounded Contexts must communicate asynchronously via Event Brokers.",
                contradictions: ["MEREOLOGICAL_MANDATE_VIOLATION", "TIGHT_COUPLING"],
                goldenRatioApplied: true
            };
        }
    }

    return null; // Topology is valid
};
"""

# Insert the validation function before executeGraph
content = re.sub(
    r'(export const executeGraph = async)',
    vulcan_validation + r'\n\1',
    content
)

execute_graph_patch = """
    // --- VULCAN Topological Validation ---
    const vulcanJUR = validateVulcanTopology(nodes, edges);
    if (vulcanJUR) {
        // Return early with the Justified Uncertainty Report due to Architectural Violation
        console.warn("VULCAN VALIDATION FAILED: ", vulcanJUR.ontologicalShear);
        return [{
            id: 'vulcan-error-halt',
            basePrompt: 'ARCHITECTURAL_HALT',
            parameter: AestheticParameter.STYLE,
            variations: [],
            images: [],
            timestamp: new Date().toISOString(),
            temperature: 0,
            jur: vulcanJUR
        }];
    }
    // -------------------------------------
"""

# Insert validation check inside executeGraph
content = re.sub(
    r'(export const executeGraph = async \(nodes: Node\[\], edges: Edge\[\]\): Promise<GenerationResult\[\]> => \{)',
    r'\1\n' + execute_graph_patch,
    content
)

with open('services/graphExecutor.ts', 'w') as f:
    f.write(content)
