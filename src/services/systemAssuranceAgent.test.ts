import test from 'node:test';
import assert from 'node:assert';
import { SystemAssuranceAgent, State, Action, Trace } from './systemAssuranceAgent.js';

test('SystemAssuranceAgent - Frame Operator ensures invariant fluents persist', () => {
    const saa = new SystemAssuranceAgent();
    const s_k: State = { fluents: { f_cam: 1, f_door: 0 } };
    const a_k: Action = {
        name: 'open_door',
        preconditions: { f_door: 0 },
        effects: { f_door: 1 }
    };
    const s_k_plus_1: State = { fluents: { f_cam: 1, f_door: 1 } };

    assert.strictEqual(saa.checkFrameOperator(s_k, s_k_plus_1, a_k), true);

    // Violation: f_cam changes without being in the effect
    const s_k_plus_1_bad: State = { fluents: { f_cam: 0, f_door: 1 } };
    assert.strictEqual(saa.checkFrameOperator(s_k, s_k_plus_1_bad, a_k), false);
});

test('SystemAssuranceAgent - calculateCPI calculates correct score and halts on contradiction (Security Camera Lemma)', () => {
    const saa = new SystemAssuranceAgent();

    const trace: Trace = {
        states: [
            { fluents: { f_cam: 1 } }, // s1
            { fluents: { f_cam: 0 } }, // s2 (camera disabled)
            { fluents: { f_cam: 0 } }, // s3 (camera stays disabled)
            { fluents: { f_cam: 0 } }  // s4 (attempted action fails)
        ],
        actions: [
            { name: 'disable_cam', preconditions: { f_cam: 1 }, effects: { f_cam: 0 } }, // a1
            { name: 'walk_past', preconditions: { f_cam: 0 }, effects: {} }, // a2
            { name: 'use_cam_feed', preconditions: { f_cam: 1 }, effects: {} } // a3 (CONTRADICTION)
        ]
    };

    // Transitions:
    // 1: s1 -> s2 via a1 (Valid: s1 models pre(a1), s2 models eff(a1), frame OK)
    // 2: s2 -> s3 via a2 (Valid: s2 models pre(a2), s3 models eff(a2), frame OK)
    // 3: s3 -> s4 via a3 (Invalid: s3 does NOT model pre(a3) since f_cam is 0, not 1)

    const cpi = saa.calculateCPI(trace);
    assert.strictEqual(cpi, 2 / 3); // 2 valid out of 3 transitions

    const evaluation = saa.evaluateTrace(trace);
    assert.strictEqual(evaluation.passed, false);
    assert.strictEqual(evaluation.halted, true);
});
