import { test } from 'node:test';
import assert from 'node:assert';
import { SovereignNexus, NexusTask } from './sovereignNexus.js';

test('SovereignNexus - orchestrateSwarm completes successfully when agents are registered', () => {
    const nexus = new SovereignNexus(['ALETHEON', 'VIPER', 'WHIMSY']);

    const task: NexusTask = {
        id: 'T-001',
        description: 'Audit visual intent.',
        requiredAgents: ['VIPER', 'WHIMSY']
    };

    const result = nexus.orchestrateSwarm(task);

    assert.strictEqual(result.status, 'COMPLETED', 'Task status should be COMPLETED');
    assert.strictEqual(result.taskId, 'T-001');
    assert.ok(result.payload.includes('[VIPER_processed]'), 'Payload must include VIPER processing');
    assert.ok(result.payload.includes('[WHIMSY_processed]'), 'Payload must include WHIMSY processing');
});

test('SovereignNexus - orchestrateSwarm fails when required agent is unregistered', () => {
    const nexus = new SovereignNexus(['ALETHEON']);

    const task: NexusTask = {
        id: 'T-002',
        description: 'Perform structural necropsy and retention audit.',
        requiredAgents: ['ALETHEON', 'KUT']
    };

    const result = nexus.orchestrateSwarm(task);

    assert.strictEqual(result.status, 'FAILED', 'Task status should be FAILED due to missing agent');
    assert.ok(result.routingLog[0].includes('Validation Error: Required agent KUT is offline'), 'Log must contain exact error string');
});

test('SovereignNexus - registers new agents dynamically', () => {
    const nexus = new SovereignNexus();
    nexus.registerAgent('KIRA');

    const task: NexusTask = {
        id: 'T-003',
        description: 'Route message.',
        requiredAgents: ['KIRA']
    };

    const result = nexus.orchestrateSwarm(task);
    assert.strictEqual(result.status, 'COMPLETED');
});
