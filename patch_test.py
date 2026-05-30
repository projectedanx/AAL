import re

with open("src/graphExecutor.test.ts", "r") as f:
    content = f.read()

new_test = """
test('Mycelial Scar Router - suspends generation on scar density threshold breach', async () => {
    const nodes: Node[] = [
        {
            id: 'base-1',
            type: PipelineNodeType.BASE_PROMPT,
            position: { x: 0, y: 0 },
            data: { value: 'A test prompt' }
        },
        {
            id: 'mycelial-1',
            type: PipelineNodeType.MYCELIAL_SCAR_ROUTER,
            position: { x: 100, y: 0 },
            data: {
                scarThreshold: 1.618,
                activeScars: ['SCAR-004', 'SCAR-KIRA-005', 'SCAR-CIPHER-002']
            }
        },
        {
            id: 'output-1',
            type: PipelineNodeType.OUTPUT,
            position: { x: 300, y: 0 },
            data: {}
        }
    ];

    const edges: Edge[] = [
        { id: 'e1', source: 'base-1', target: 'mycelial-1' },
        { id: 'e2', source: 'mycelial-1', target: 'output-1' }
    ];

    const results = await executeGraph(nodes, edges);
    assert.strictEqual(results.length, 1);
    assert.ok(results[0].jur); // JUR must be present due to high scar density
    assert.match(results[0].jur?.ontologicalShear || '', /Scar density/);
    assert.strictEqual(results[0].images.length, 0);
});
"""

if "Mycelial Scar Router -" not in content:
    content += new_test

with open("src/graphExecutor.test.ts", "w") as f:
    f.write(content)

print("Test added to src/graphExecutor.test.ts")
