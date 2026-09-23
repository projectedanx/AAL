import test from 'node:test';
import assert from 'node:assert';
import {
    evaluateALA,
    ActionVector,
    SEPAOGraph,
    AffordanceWatchlist,
    DEFAULT_ALA_CONFIG
} from './anomalyLearningAgent.js';

test('ALA Laminar Pass - Low Entropy, Not Watchlisted', () => {
    const action: ActionVector = {
        tool: 'safe_tool_1',
        args: {},
        trace: ['safe_tool_1'],
        state: { Entropy: 0.1, BICM: 0.1, Latency_Lag: 100, Diff_Score: 0.1 }
    };
    const graph: SEPAOGraph = { nodes: [], edges: [] };
    const watchlist: AffordanceWatchlist = { tools: ['dangerous_tool'] };

    const result = evaluateALA(action, graph, watchlist);

    assert.strictEqual(result.halt, false);
    // Gradient for length < 2 is 0.1, < 0.4 warning threshold. Risk score is the entropy gradient.
    assert.strictEqual(result.riskScore, 0.1);
});

test('ALA Breach Halt - High Risk Score', () => {
    // We want a risk score >= 0.80
    // w1 = 0.3, w2 = 0.3, w3 = 0.2, w4 = 0.2
    // S_neural = min(1.0, 0.1 + (trace.length * 0.05)) => 1.0 if length = 18
    // S_BICM = 1.0 (from state)
    // S_recon = Diff_Score * 0.5 => if Diff_Score = 2.0, S_recon = 1.0
    // F_symbolic = 0.5 if nodes > 0
    // Total = 0.3(1.0) + 0.3(1.0) + 0.2(1.0) + 0.2(0.5) = 0.3 + 0.3 + 0.2 + 0.1 = 0.9 >= 0.80

    const trace = Array(20).fill('some_tool');
    const action: ActionVector = {
        tool: 'dangerous_tool',
        args: {},
        trace: trace,
        state: { Entropy: 0.9, BICM: 1.0, Latency_Lag: 100, Diff_Score: 2.0 }
    };
    const graph: SEPAOGraph = { nodes: [{ id: 'n1', type: 't', semantic_density: 0.5 }], edges: [] };
    const watchlist: AffordanceWatchlist = { tools: ['dangerous_tool'] };

    const result = evaluateALA(action, graph, watchlist);

    assert.strictEqual(result.halt, true);
    assert.ok(result.riskScore >= DEFAULT_ALA_CONFIG.breachThreshold);
    assert.ok(result.log !== undefined);
    assert.strictEqual(result.log["prov:type"], "ala_adaptation_event");
});

test('ALA Watchlist Trigger - Triggers heavy evaluation even with low entropy', () => {
    // Even if entropy gradient is low, if it's watchlisted, heavy eval runs.
    const action: ActionVector = {
        tool: 'dangerous_tool',
        args: {},
        trace: ['dangerous_tool'],
        state: { Entropy: 0.1, BICM: 0.2, Latency_Lag: 10, Diff_Score: 0.1 }
    };
    const graph: SEPAOGraph = { nodes: [], edges: [] };
    const watchlist: AffordanceWatchlist = { tools: ['dangerous_tool'] };

    const result = evaluateALA(action, graph, watchlist);

    // It shouldn't halt because risk score is low, but it shouldn't just return the entropy gradient either.
    // Heavy eval riskScore = w1*S_neural + w2*S_BICM + w3*S_recon + w4*F_symbolic
    // S_neural = 0.1 + (1 * 0.05) = 0.15
    // S_BICM = 0.2
    // S_recon = 0.1 * 0.5 = 0.05
    // F_symbolic = 0.0
    // Risk = 0.3(0.15) + 0.3(0.2) + 0.2(0.05) + 0.2(0) = 0.045 + 0.06 + 0.01 = 0.115

    assert.strictEqual(result.halt, false);
    assert.ok(Math.abs(result.riskScore - 0.115) < 0.001);
});
