/// file: src/graphExecutor.test.ts ///
// Mock import.meta.env for testing
(globalThis as any).import = { meta: { env: {} } };

import test from 'node:test';
import assert from 'node:assert';
import { executeGraph } from '../services/graphExecutor.ts';
import { PipelineNodeType } from '../types.ts';
import { Node, Edge } from '@xyflow/react';

test('Dialectical Synthesis Engine - suspends generation on Ontological Shear', async () => {
    const nodes: Node[] = [
        {
            id: 'base-1',
            type: PipelineNodeType.BASE_PROMPT,
            position: { x: 0, y: 0 },
            data: { value: 'A test prompt' }
        },
        {
            id: 'persona-1',
            type: PipelineNodeType.TOPOLOGICAL_PERSONA,
            position: { x: 100, y: 0 },
            data: {
                personaRole: 'Test Operator',
                contradictoryDirectives: ['Maximize A', 'Minimize A'],
                pdtConstraints: []
            }
        },
        {
            id: 'param-1',
            type: PipelineNodeType.PARAMETER,
            position: { x: 200, y: 0 },
            data: { value: 'Style', variations: ['TestStyle'] }
        },
        {
            id: 'output-1',
            type: PipelineNodeType.OUTPUT,
            position: { x: 300, y: 0 },
            data: {}
        }
    ];

    const edges: Edge[] = [
        { id: 'e1', source: 'base-1', target: 'persona-1' },
        { id: 'e2', source: 'persona-1', target: 'param-1' },
        { id: 'e3', source: 'param-1', target: 'output-1' }
    ];

    // Since we're dealing with a swallowed API error that prevents `results` from having our suspended JUR
    // we need to verify that `results` is length 1 and contains the JUR, while having 0 images.
    // The test failing here confirms that the implementation does NOT short-circuit before calling the API.
    const results = await executeGraph(nodes, edges);
    assert.strictEqual(results.length, 1);
    assert.ok(results[0].jur); // JUR must be present
    assert.strictEqual(results[0].images.length, 0, "Images length must be 0"); // Generation must be suspended (empty array)
});
