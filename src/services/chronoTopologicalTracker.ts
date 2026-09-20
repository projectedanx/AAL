import { Node, Edge } from '@xyflow/react';

export class ChronoTopologicalTracker {

    /**
     * Detects Semantic Fragmentation by evaluating $b_0$ components.
     * In a Directed Acyclic Graph representing a workflow or prompt chain,
     * disjoint subgraphs (b_0 > 1) imply a loss of cohesive workflow state
     * and intent fragmentation.
     *
     * @param nodes The current canvas nodes
     * @param edges The current canvas edges
     * @returns boolean true if fragmentation detected
     */
    public detectSemanticFragmentation(nodes: Node[], edges: Edge[]): boolean {
        if (nodes.length === 0) return false;

        // Simple disjoint set to find connected components
        const parent = new Map<string, string>();

        const find = (i: string): string => {
            if (!parent.has(i)) parent.set(i, i);
            if (parent.get(i) === i) return i;
            const res = find(parent.get(i)!);
            parent.set(i, res);
            return res;
        };

        const union = (i: string, j: string) => {
            const rootI = find(i);
            const rootJ = find(j);
            if (rootI !== rootJ) {
                parent.set(rootI, rootJ);
            }
        };

        nodes.forEach(n => parent.set(n.id, n.id));
        edges.forEach(e => union(e.source, e.target));

        const roots = new Set<string>();
        nodes.forEach(n => roots.add(find(n.id)));

        // b_0 > 1 means fragmented map
        if (roots.size > 1) {
            console.warn(`[CHRONO-TOPOLOGY] Semantic Fragmentation detected. b_0 components: ${roots.size}`);
            return true;
        }

        return false;
    }

    /**
     * Detects Logical Contradictions by evaluating $b_1$ cycles (persistence loops).
     * In a DAG canvas representing logical flows, cycles often represent
     * paradoxical assignments or cyclic deadlocks violating DAG properties.
     *
     * @param nodes The current canvas nodes
     * @param edges The current canvas edges
     * @returns boolean true if a contradiction/cycle is detected
     */
    public detectLogicalContradiction(nodes: Node[], edges: Edge[]): boolean {
        const adjacency = new Map<string, string[]>();
        nodes.forEach(n => adjacency.set(n.id, []));
        edges.forEach(e => {
            if(adjacency.has(e.source)) {
                adjacency.get(e.source)!.push(e.target);
            }
        });

        const visited = new Set<string>();
        const recursionStack = new Set<string>();

        const isCyclic = (nodeId: string): boolean => {
            visited.add(nodeId);
            recursionStack.add(nodeId);

            const neighbors = adjacency.get(nodeId) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && isCyclic(neighbor)) {
                    return true;
                } else if (recursionStack.has(neighbor)) {
                    return true;
                }
            }

            recursionStack.delete(nodeId);
            return false;
        };

        for (const n of nodes) {
            if (!visited.has(n.id)) {
                if (isCyclic(n.id)) {
                    console.warn(`[CHRONO-TOPOLOGY] Logical Contradiction / Cycle ($b_1$ loop) detected starting at node: ${n.id}`);
                    return true;
                }
            }
        }

        return false;
    }
}
