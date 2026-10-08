import { test } from 'node:test';
import assert from 'node:assert';
import { FrictionEngine } from './frictionEngine.js';

test('FrictionEngine - resolveConflict applies Golden Ratio weighting', () => {
    const engine = new FrictionEngine();
    const perspectiveA = [1.0, 2.0];
    const perspectiveB = [0.0, 0.5];

    const resolved = engine.resolveConflict(perspectiveA, perspectiveB);

    const goldenRatio = 1.618;
    const totalWeight = goldenRatio + 1.0;

    const expected0 = (1.0 * goldenRatio + 0.0 * 1.0) / totalWeight;
    const expected1 = (2.0 * goldenRatio + 0.5 * 1.0) / totalWeight;

    // Use a small epsilon for floating point comparison
    const epsilon = 0.0001;
    assert.ok(Math.abs(resolved[0] - expected0) < epsilon, 'Vector 0 resolution failed');
    assert.ok(Math.abs(resolved[1] - expected1) < epsilon, 'Vector 1 resolution failed');
});

test('FrictionEngine - resolveConflict throws on dimension mismatch', () => {
    const engine = new FrictionEngine();
    const perspectiveA = [1.0, 2.0];
    const perspectiveB = [0.0];

    assert.throws(
        () => engine.resolveConflict(perspectiveA, perspectiveB),
        Error,
        '[⊗] Ontological Shear: Perspective dimensions must match.'
    );
});

test('FrictionEngine - calculateCognitiveParallax calculates Euclidean distance', () => {
     const engine = new FrictionEngine();
     const perspectiveA = [3.0, 4.0];
     const perspectiveB = [0.0, 0.0];

     const parallax = engine.calculateCognitiveParallax(perspectiveA, perspectiveB);
     assert.strictEqual(parallax, 5.0, 'Cognitive Parallax calculation failed');
});
