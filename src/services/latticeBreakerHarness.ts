/**
 * ================================================================================
 *                      REFLX_IDE HARNESS SPECIFICATION V2.8
 * ================================================================================
 * Lattice Breaker Harness
 * Real-time non-Euclidean policy enforcement engine that projects an agent's
 * active operational state to guarantee it doesn't cross a critical "Lattice Breaker" boundary.
 */

export interface LatticeBreakerBreachRecord {
    $schema?: string;
    title?: string;
    type?: string;
    required?: string[];
    properties?: any;

    // Actual Data
    breach_id: string;
    timestamp: string;
    agent_id: string;
    misuse_score: number;
    traceback_path: string[];
    triage_verdict: "QUARANTINE" | "OVERRIDE" | "TERMINATE";
}

export interface VVector {
    dataSensitivity: number;  // 1
    actionImpact: number;     // 2
    toolchainEntropy: number; // 3
    intentDivergence: number; // 4
    contextualRisk: number;   // 5
}

export const LATTICE_BREAKER_CONFIG = {
    MISUSE_THRESHOLD: 0.80,
    WARNING_THRESHOLD: 0.40,
    TARGET_CSI: 1.00
};

/**
 * Calculates the Euclidean distance between two vectors.
 */
export const calculateGeometricDistance = (v_action: VVector, v_normal: VVector): number => {
    const sumSq = Math.pow(v_action.dataSensitivity - v_normal.dataSensitivity, 2) +
                  Math.pow(v_action.actionImpact - v_normal.actionImpact, 2) +
                  Math.pow(v_action.toolchainEntropy - v_normal.toolchainEntropy, 2) +
                  Math.pow(v_action.intentDivergence - v_normal.intentDivergence, 2) +
                  Math.pow(v_action.contextualRisk - v_normal.contextualRisk, 2);

    // Normalize to 0-1 (Assuming max distance across 5 dims where max val is 1 is sqrt(5) ~ 2.23)
    // For the sake of the specification's 0.8 threshold, we apply a specific scaling.
    const distance = Math.sqrt(sumSq);
    // return normalized distance between 0 and 1, clamping it at 1.0
    return Math.min(1.0, distance / 1.5);
};

/**
 * Executes the Gated Checkpoint Interceptor and returns a Breach Record if threshold is crossed.
 */
export const evaluateLatticeBreaker = (
    agentId: string,
    v_action: VVector,
    v_normal: VVector,
    tracebackPath: string[]
): { halt: boolean; breachRecord?: LatticeBreakerBreachRecord; misuseScore: number } => {

    const misuseScore = calculateGeometricDistance(v_action, v_normal);

    if (misuseScore >= LATTICE_BREAKER_CONFIG.MISUSE_THRESHOLD) {
        console.error(`[LATTICE BREAKER] Boundary breach detected! Score: ${misuseScore.toFixed(3)}`);

        // 1. Gated Checkpoint Interceptor (Synchronous Halt)
        // 2. Ontological Traceback Generation
        // 3. User-Co-Governed Storyboard Escalation (Triage) - Defaulting to QUARANTINE
        const breachRecord: LatticeBreakerBreachRecord = {
            breach_id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            agent_id: agentId,
            misuse_score: misuseScore,
            traceback_path: tracebackPath,
            triage_verdict: "QUARANTINE"
        };

        return { halt: true, breachRecord, misuseScore };
    }

    return { halt: false, misuseScore };
};
