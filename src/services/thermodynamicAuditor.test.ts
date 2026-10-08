import { test } from 'node:test';
import assert from 'node:assert';
import { ThermodynamicAuditor } from './thermodynamicAuditor.js';

test('ThermodynamicAuditor - passes audit for low entropy states (highly ordered)', () => {
    // 0.8 is the default budget in the test, highly skewed distribution has low entropy
    const auditor = new ThermodynamicAuditor(0.80);
    const orderedState = [100, 1, 1, 1];

    const isValid = auditor.auditEntropy(orderedState);
    assert.strictEqual(isValid, true, 'Highly ordered state should pass the entropy audit');
});

test('ThermodynamicAuditor - triggers firewall for high entropy states (chaotic)', () => {
    // Uniform distribution maximizes entropy (normalized entropy = 1.0)
    const auditor = new ThermodynamicAuditor(0.50);
    const chaoticState = [10, 10, 10, 10];

    const isValid = auditor.auditEntropy(chaoticState);
    assert.strictEqual(isValid, false, 'Uniform distribution (max entropy) should trigger the TCB firewall');
});

test('ThermodynamicAuditor - handles edge cases like zero arrays and length 1', () => {
    const auditor = new ThermodynamicAuditor(0.50);

    assert.strictEqual(auditor.auditEntropy([]), true, 'Empty state should pass');
    assert.strictEqual(auditor.auditEntropy([42]), true, 'Length 1 state has 0 entropy, should pass');
});

test('ThermodynamicAuditor - throws error on invalid configuration bounds', () => {
    assert.throws(
        () => new ThermodynamicAuditor(1.5),
        Error,
        '[⊗] Configuration Error: MAX_ENTROPY_BUDGET must be bounded between [0.0, 1.0]'
    );
});
