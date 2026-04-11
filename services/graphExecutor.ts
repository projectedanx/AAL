/// file: services/graphExecutor.ts ///
import { Node, Edge } from '@xyflow/react';
import { PipelineNodeType, GenerationResult } from '../types';
import { generateAestheticImages } from './geminiService';

/**
 * Interface representing a path traversed through the DAG.
 */
export interface TraversalPath {
    basePrompt: string;
    parameters: Array<{
        parameter: string;
        variation: string;
    }>;
}

/**
 * Traverses the graph backwards from Output nodes to find all valid generative paths.
 * Enforces Productive Epistemic Friction by preserving contradictory branches.
 */
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
 * Executes the Pluriversal DAG, mapping semantic trajectories to the Synthesis Engine.
 * @param nodes - Nodes in the DAG.
 * @param edges - Edges mapping the topology.
 * @returns An array of GenerationResult objects embodying the diverse epistemic states.
 */
export const executeGraph = async (nodes: Node[], edges: Edge[]): Promise<GenerationResult[]> => {
    const paths = findPaths(nodes, edges);
    const results: GenerationResult[] = [];

    // Process paths. We group by basePrompt and parameter for the UI's historical structure,
    // though the topological reality is more complex.
    const groupedPaths = paths.reduce((acc, path) => {
        // Find the primary parameter to group by (simplification for compatibility with existing types)
        const primaryParam = path.parameters[0]?.parameter || 'Mixed';
        const key = `${path.basePrompt}-${primaryParam}`;
        if (!acc[key]) {
            acc[key] = { basePrompt: path.basePrompt, parameter: primaryParam, variations: [] };
        }
        acc[key].variations.push(path.parameters.map(p => p.variation).join(' + '));
        return acc;
    }, {} as Record<string, { basePrompt: string, parameter: string, variations: string[] }>);


    for (const key of Object.keys(groupedPaths)) {
        const group = groupedPaths[key];
        // Ensure variations are unique
        const uniqueVariations = Array.from(new Set(group.variations));

        try {
            // Temperature is hardcoded as topology dictates structure, not chaos.
            const images = await generateAestheticImages(group.basePrompt, uniqueVariations, group.parameter, 0.5);

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
                temperature: 0.5
            });
        } catch (e) {
             console.error("Epistemic mapping failed for path:", group, e);
             // Do not throw, log scar and continue (Anti-Fragile)
        }
    }

    return results;
};
