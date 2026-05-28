/// file: services/graphExecutor.ts ///
import { Node, Edge } from '@xyflow/react';
import { PipelineNodeType, GenerationResult, JustifiedUncertaintyReport, AestheticParameter } from '../types';
import { generateAestheticImages } from './geminiService';
import { GeometricCausalSculptor, NonEuclideanTopology, PhantomDimension } from '../../PROJECT_AURELIUS/GeometricCognition';
import { PlausibilityOracle, ProvenanceTracker } from '../../PROJECT_AURELIUS/OracleFeedbackLoop';

/**
 * Interface representing a path traversed through the DAG.
 * Used internally to resolve topological paths from output to base prompt.
 */
export interface TraversalPath {
    basePrompt: string;
    personaRole?: string;
    contradictoryDirectives?: string[];
    pdtConstraints?: Array<{ type: string; datum: string; tolerance: string }>;
    spectralTargets?: Array<{ target: string; wavelength: number; fwhm: number }>;
    parameters: Array<{
        parameter: string;
        variation: string;
    }>;
}

/**
 * Traverses the graph backwards from Output nodes to find all valid generative paths.
 * Enforces Productive Epistemic Friction by preserving contradictory branches.
 *
 * @param {Node[]} nodes - The array of nodes present in the current canvas graph.
 * @param {Edge[]} edges - The array of edges defining connections between nodes.
 * @returns {TraversalPath[]} An array containing all resolved paths, tracing from base prompts through aesthetic parameters.
 */

/**
 * Dialectical Synthesis Engine Core
 * Calculates the Ontological Shear between contradictory directives using the Golden Scar Protocol.
 */
const synthesizeJUR = (path: TraversalPath): JustifiedUncertaintyReport | undefined => {
    if (!path.contradictoryDirectives || path.contradictoryDirectives.length < 2) {
        return undefined; // No paradox to resolve
    }

    // [∇] Golden Scar Protocol calculation (mocked for topological mapping)
    // [∇] In a full implementation, this would involve DE-9IM SDF mapping over the text embeddings.
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

const findPaths = (nodes: Node[], edges: Edge[]): TraversalPath[] => {
    const paths: TraversalPath[] = [];
    const outputNodes = nodes.filter(n => n.type === PipelineNodeType.OUTPUT);

    const traverse = (currentNodeId: string, currentPath: TraversalPath) => {
        const incomingEdges = edges.filter(e => e.target === currentNodeId);

        if (incomingEdges.length === 0) {
            // Reached a root node
            const node = nodes.find(n => n.id === currentNodeId);
            if (node && node.type === PipelineNodeType.BASE_PROMPT) {
                paths.push({
                    ...currentPath,
                    basePrompt: node.data.value as string
                });
            }
            return;
        }

        incomingEdges.forEach(edge => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            if (sourceNode && sourceNode.type === PipelineNodeType.PARAMETER) {
                const variations = (sourceNode.data.variations as string[]) || [];
                variations.forEach(variation => {
                    const newPath = {
                        ...currentPath,
                        parameters: [
                            ...currentPath.parameters,
                            { parameter: sourceNode.data.value as string, variation }
                        ]
                    };
                    traverse(sourceNode.id, newPath);
                });

            } else if (sourceNode && sourceNode.type === PipelineNodeType.TOPOLOGICAL_PERSONA) {
                // Treat as an Adaptive Context Object (ACO) by wrapping current state
                const newPath = {
                    ...currentPath,
                    personaRole: sourceNode.data.personaRole as string,
                    contradictoryDirectives: (sourceNode.data.contradictoryDirectives || []) as string[],
                    pdtConstraints: (sourceNode.data.pdtConstraints || []) as Array<{ type: string; datum: string; tolerance: string }>
                };
                traverse(sourceNode.id, newPath);
            } else if (sourceNode && sourceNode.type === PipelineNodeType.MULTISPECTRAL_CONDITIONING) {
                 const newPath = {
                     ...currentPath,
                     spectralTargets: [...(currentPath.spectralTargets || []), ...((sourceNode.data.spectralTargets as any) || [])]
                 };
                 traverse(sourceNode.id, newPath);
            } else if (sourceNode && sourceNode.type === PipelineNodeType.BASE_PROMPT) {
                 traverse(sourceNode.id, currentPath);
            }
        });
    };

    outputNodes.forEach(outNode => {
        traverse(outNode.id, { basePrompt: '', parameters: [] });
    });

    return paths;
};

/**
 * Validates the DAG structure against Betti-1 loops (cycles) to prevent infinite logical loops during generation.
 *
 * @param nodes - The input parameter for the function.
 * @param edges - The input parameter for the function.
 * @returns The resulting execution output.
 *
 */
export const validateVortexTopology = (nodes: Node[], edges: Edge[]): JustifiedUncertaintyReport | null => {
    // Basic Depth-First Search for cycle detection
    const adjList = new Map<string, string[]>();
    for (const node of nodes) adjList.set(node.id, []);
    for (const edge of edges) {
        if (adjList.has(edge.source)) {
            adjList.get(edge.source)!.push(edge.target);
        }
    }

    const visited = new Set<string>();
    const recStack = new Set<string>();
    let cycleDetected = false;

    const dfs = (nodeId: string) => {
        if (recStack.has(nodeId)) {
            cycleDetected = true;
            return;
        }
        if (visited.has(nodeId)) return;

        visited.add(nodeId);
        recStack.add(nodeId);

        const neighbors = adjList.get(nodeId) || [];
        for (const neighbor of neighbors) {
            dfs(neighbor);
            if (cycleDetected) return;
        }

        recStack.delete(nodeId);
    };

    for (const node of nodes) {
        if (!visited.has(node.id)) {
            dfs(node.id);
            if (cycleDetected) break;
        }
    }

    if (cycleDetected) {
        return {
            geometricDensityScore: 1.0,
            ontologicalShear: "SCAR-VORTEX-BETTI-1: Topological cycle (Betti-1 Loop) detected. Logical infinite loop imminent. Halting to prevent Semantic Saponification.",
            contradictions: ["DAG_ACYCLIC_MANDATE_VIOLATION", "CAUSAL_SCULPTING_LOOP"],
            goldenRatioApplied: true
        };
    }

    return null; // Topology is valid (acyclic)
};

/**
 * Enforces zero-trust topological barriers (Mereology Route Checks) to guarantee security boundaries in the node graph.
 *
 * @param nodes - The input parameter for the function.
 * @param edges - The input parameter for the function.
 * @returns The resulting execution output.
 *
 */
export const validateCipherTopology = (nodes: Node[], edges: Edge[]): JustifiedUncertaintyReport | null => {
    const cipherNodes = nodes.filter(n => n.type === PipelineNodeType.CIPHER_SECURITY_GATE);

    for (const cipher of cipherNodes) {
        if (!(cipher.data as any).dccdSchema) {
            return {
                geometricDensityScore: 1.0,
                ontologicalShear: "SCAR-CIPHER-001: Missing DCCDSchemaGuard in CIPHER Gate. Ontological Shear imminent. Zero-Trust failure.",
                contradictions: ["MISSING_DCCD_SCHEMA", "ZERO_TRUST_VIOLATION"],
                goldenRatioApplied: true
            };
        }
    }

    for (const edge of edges) {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);

        if (!sourceNode || !targetNode) continue;

        // Mereology Route Check: Direct connection from potentially unsafe ingress to sensitive internal nodes without a CIPHER gate
        if (sourceNode.type === PipelineNodeType.KIRA_WEBHOOK_INGRESS && targetNode.type === PipelineNodeType.VULCAN_SHARED_DATABASE) {
             return {
                geometricDensityScore: 1.0,
                ontologicalShear: "SCAR-CIPHER-002: Unauthorized Mereological Trust Inheritance Detected. Webhook ingress cannot directly route to shared database without passing through a CIPHER Security Gate.",
                contradictions: ["MEREOLOGICAL_MANDATE_VIOLATION", "TRUST_BOUNDARY_VIOLATION"],
                goldenRatioApplied: true
            };
        }
    }

    return null; // Topology is valid
};

/**
 * Validates the DAG against the Mereological Mandate (e.g., preventing shared database access without event brokers).
 *
 * @param nodes - The input parameter for the function.
 * @param edges - The input parameter for the function.
 * @returns The resulting execution output.
 *
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

/**
 * Ensures Feishu Card Builder nodes have a fully defined explicit schema to prevent invalid JSON webhooks.
 *
 * @param nodes - The input parameter for the function.
 * @returns The resulting execution output.
 *
 */
export const validateKiraTopology = (nodes: Node[]): JustifiedUncertaintyReport | null => {
    const cardNodes = nodes.filter(n => n.type === PipelineNodeType.KIRA_CARD_BUILDER);
    for (const card of cardNodes) {
        if (!(card.data as any).cardSchema) {
            return {
                geometricDensityScore: 1.0,
                ontologicalShear: "SCAR-KIRA-005: Feishu Card Builder node missing DCCDSchemaGuard explicit schema. Ontological Shear imminent.",
                contradictions: ["ANIONIC_VETO_VIOLATION", "MISSING_JSON_SCHEMA"],
                goldenRatioApplied: true
            };
        }
    }
    return null;
};

/**
 * The primary execution function that orchestrates DAG validation, path traversal, causal sculpting, and the final Gemini API generation calls.
 *
 * @param nodes - The input parameter for the function.
 * @param edges - The input parameter for the function.
 * @returns The resulting execution output.
 *
 */
export const executeGraph = async (nodes: Node[], edges: Edge[]): Promise<GenerationResult[]> => {


    // --- VORTEX-ARCHITECT Topological Validation ---
    // --- KIRA-7 Topological Validation ---
    const kiraJUR = validateKiraTopology(nodes);
    if (kiraJUR) {
        console.warn("KIRA VALIDATION FAILED: ", kiraJUR.ontologicalShear);
        return [{
            id: "kira-error-halt",
            basePrompt: "ARCHITECTURAL_HALT",
            parameter: AestheticParameter.STYLE,
            variations: [],
            images: [],
            timestamp: new Date().toISOString(),
            temperature: 0,
            jur: kiraJUR
        }];
    }

    const cipherJUR = validateCipherTopology(nodes, edges);
    if (cipherJUR) {
        console.warn("CIPHER VALIDATION FAILED: ", cipherJUR.ontologicalShear);
        return [{
            id: 'cipher-error-halt',
            basePrompt: 'SECURITY_HALT',
            parameter: AestheticParameter.STYLE,
            variations: [],
            images: [],
            timestamp: new Date().toISOString(),
            temperature: 0,
            jur: cipherJUR
        }];
    }

    const vortexJUR = validateVortexTopology(nodes, edges);
    if (vortexJUR) {
        console.warn("VORTEX VALIDATION FAILED: ", vortexJUR.ontologicalShear);
        return [{
            id: 'vortex-error-halt',
            basePrompt: 'ARCHITECTURAL_HALT',
            parameter: AestheticParameter.STYLE,
            variations: [],
            images: [],
            timestamp: new Date().toISOString(),
            temperature: 0,
            jur: vortexJUR
        }];
    }
    // -----------------------------------------------

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

    const paths = findPaths(nodes, edges);
    const causalSculptor = new GeometricCausalSculptor();
    const oracle = new PlausibilityOracle();
    const provenance = new ProvenanceTracker();
    const results: GenerationResult[] = [];

    // Process paths. We group by basePrompt and parameter for the UI's historical structure,
    // though the topological reality is more complex.
    const groupedPaths = paths.reduce((acc, path) => {
        // Find the primary parameter to group by (simplification for compatibility with existing types)
        const primaryParam = path.parameters[0]?.parameter || 'Mixed';
        const key = `${path.basePrompt}-${primaryParam}`;
        if (!acc[key]) {
            acc[key] = { basePrompt: path.basePrompt, parameter: primaryParam, variations: [], originalPath: path, spectralTargets: path.spectralTargets || [] };
        }
        acc[key].variations.push(path.parameters.map(p => p.variation).join(' + '));
        return acc;
    }, {} as Record<string, { basePrompt: string, parameter: string, variations: string[], originalPath: TraversalPath, spectralTargets?: Array<{ target: string; wavelength: number; fwhm: number }> }> );


    for (const key of Object.keys(groupedPaths)) {
        const group = groupedPaths[key];
        // Ensure variations are unique
        const uniqueVariations = Array.from(new Set(group.variations));

        try {
            const jur = synthesizeJUR(group.originalPath);

            let mappedImages: any[] = [];

            if (jur) {
                // Suspended generation on Ontological Shear
                console.warn(`[DIALECTICAL SYNTHESIS] Generation suspended due to ontological shear: ${jur.ontologicalShear}`);
            } else {
                // Temperature is hardcoded as topology dictates structure, not chaos.

                // PROJECT AURELIUS: Causal Latent Sculpting
                const topology = NonEuclideanTopology.HYPERBOLIC; // Default paraconsistent bound
                const phantomDims: PhantomDimension[] = (group.spectralTargets || []).map(t => ({
                    id: crypto.randomUUID(),
                    metric: `Wavelength: ${t.wavelength}nm, FWHM: ${t.fwhm}nm (${t.target})`,
                    influence_weight: 1.0
                }));

                const sculptedPrompt = causalSculptor.sculptTopology(group.basePrompt, topology, phantomDims);

                const images = await generateAestheticImages(sculptedPrompt, uniqueVariations, group.parameter, 0.5);
                mappedImages = images.map(img => ({
                    ...img,
                    id: crypto.randomUUID(),
                }));
            }

            const resultId = crypto.randomUUID();
            let adherenceScore: number | undefined;
            let semanticDrift: number | undefined;

            if (!jur && mappedImages.length > 0) {
                // PROJECT AURELIUS: Plausibility Oracle Evaluation
                const sampleImage = mappedImages[0].src;
                adherenceScore = oracle.evaluatePhysicalAdherence(sampleImage, NonEuclideanTopology.HYPERBOLIC);

                // Assuming baseline influence of 1.0 for the strict topology
                semanticDrift = provenance.trackSemanticDrift(resultId, 1.0, adherenceScore);
            }

            results.push({
                id: resultId,
                basePrompt: group.basePrompt,
                parameter: group.parameter as any, // Cast to any to satisfy AestheticParameter enum if mixed
                variations: uniqueVariations,
                images: mappedImages,
                timestamp: new Date().toLocaleString(),
                temperature: 0.5,
                jur,
                adherenceScore,
                semanticDrift
            });
        } catch (e) {
             console.error("Epistemic mapping failed for path:", group, e);
             // Do not throw, log scar and continue (Anti-Fragile)
        }
    }

    return results;
};
