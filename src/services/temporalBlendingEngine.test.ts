import test from 'node:test';
import assert from 'node:assert';
import { TemporalBlendingEngine } from './temporalBlendingEngine.js';

test('TemporalBlendingEngine - checkChronotopologicalDrift prevents disjoint jumps', () => {
    const tbe = new TemporalBlendingEngine();

    const S_t = [0.1, 0.5, -0.2];
    const S_t_plus_1_safe = [0.15, 0.55, -0.15];
    const S_t_plus_1_drift = [1.5, -0.8, 2.0];

    const delta_t = 1.0;
    const L = 0.5; // Lipschitz constant (max allowed displacement per delta_t)

    // Distance safe = sqrt(0.05^2 + 0.05^2 + 0.05^2) = sqrt(0.0075) = 0.086
    // 0.086 <= 0.5 * 1.0 (True)
    assert.strictEqual(tbe.checkChronotopologicalDrift(S_t, S_t_plus_1_safe, delta_t, L), false);

    // Distance drift = sqrt(1.4^2 + (-1.3)^2 + 2.2^2) = sqrt(1.96 + 1.69 + 4.84) = sqrt(8.49) = 2.91
    // 2.91 <= 0.5 * 1.0 (False) -> Drift detected
    assert.strictEqual(tbe.checkChronotopologicalDrift(S_t, S_t_plus_1_drift, delta_t, L), true);
});

test('TemporalBlendingEngine - evaluateParametricTension halts if CSD exceeds budget', () => {
    const tbe = new TemporalBlendingEngine();

    const budget = 100;

    // Safe
    const evalSafe = tbe.evaluateParametricTension(80, 50, budget); // CCH, CSD, budget
    assert.strictEqual(evalSafe.epistemicEscrow, false);

    // Drift - CSD exceeds budget, causing Lipschitz bounds to collapse
    const evalDrift = tbe.evaluateParametricTension(40, 150, budget);
    assert.strictEqual(evalDrift.epistemicEscrow, true);
    assert.strictEqual(evalDrift.reason, 'CSD_EXCEEDS_BUDGET');
});
