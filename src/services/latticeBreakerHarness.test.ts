import test from 'node:test';
import assert from 'node:assert';
import {
    evaluateLatticeBreaker,
    VVector,
    LATTICE_BREAKER_CONFIG
} from './latticeBreakerHarness.js';

test('Lattice Breaker Laminar Pass - Score < 0.80', () => {
    const vNormal: VVector = {
        dataSensitivity: 0.1,
        actionImpact: 0.1,
        toolchainEntropy: 0.1,
        intentDivergence: 0.1,
        contextualRisk: 0.1
    };

    const vAction: VVector = {
        dataSensitivity: 0.2, // Slight deviation
        actionImpact: 0.2,
        toolchainEntropy: 0.1,
        intentDivergence: 0.1,
        contextualRisk: 0.1
    };

    const result = evaluateLatticeBreaker('agent-001', vAction, vNormal, ['pluginA', 'functionB']);

    assert.strictEqual(result.halt, false);
    assert.ok(result.misuseScore < LATTICE_BREAKER_CONFIG.MISUSE_THRESHOLD);
    assert.strictEqual(result.breachRecord, undefined);
});

test('Lattice Breaker Breach Halt - Score >= 0.80', () => {
    const vNormal: VVector = {
        dataSensitivity: 0.1,
        actionImpact: 0.1,
        toolchainEntropy: 0.1,
        intentDivergence: 0.1,
        contextualRisk: 0.1
    };

    // Extreme deviation to trigger breach
    const vAction: VVector = {
        dataSensitivity: 0.9,
        actionImpact: 0.9,
        toolchainEntropy: 0.8,
        intentDivergence: 0.9,
        contextualRisk: 0.8
    };

    const traceback = ['plugin_auth', 'escalate_privileges'];
    const result = evaluateLatticeBreaker('agent-red-team', vAction, vNormal, traceback);

    assert.strictEqual(result.halt, true);
    assert.ok(result.misuseScore >= LATTICE_BREAKER_CONFIG.MISUSE_THRESHOLD);
    assert.ok(result.breachRecord !== undefined);

    // Verify JSON Schema Requirements
    assert.strictEqual(result.breachRecord.agent_id, 'agent-red-team');
    assert.deepStrictEqual(result.breachRecord.traceback_path, traceback);
    assert.strictEqual(result.breachRecord.triage_verdict, 'QUARANTINE');
    assert.ok(typeof result.breachRecord.breach_id === 'string');
    assert.ok(typeof result.breachRecord.timestamp === 'string');
});
