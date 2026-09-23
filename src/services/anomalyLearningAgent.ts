/// file: src/services/anomalyLearningAgent.ts ///

/**
 * ================================================================================
 *                      REFLX_IDE HARNESS SPECIFICATION V2.9
 * ================================================================================
 * Anomaly Learning Agent (ALA)
 * Computes Statistical Anomaly Scores to preemptively flag "grey-zone misuse".
 */

export interface StateVector {
    Entropy: number;
    BICM: number;
    Latency_Lag: number;
    Diff_Score: number;
}

export interface SEPAONode {
    id: string;
    type: string;
    semantic_density: number;
}

export interface SEPAOGraph {
    nodes: SEPAONode[];
    edges: Array<{ from: string; to: string; relation: string }>;
}

export interface AffordanceWatchlist {
    tools: string[];
}

export interface ActionVector {
    tool: string;
    args: Record<string, any>;
    trace: string[];
    state: StateVector;
}

export interface ALAConfig {
    warningThreshold: number; // τ_warn = 0.40
    breachThreshold: number;  // τ_breach = 0.80
    learningRateFP: number;   // α = 0.12
    learningRateTP: number;   // β = 0.25
    weights: {
        w1: number; // Neural
        w2: number; // BICM
        w3: number; // Recon
        w4: number; // Symbolic
    };
}

export const DEFAULT_ALA_CONFIG: ALAConfig = {
    warningThreshold: 0.40,
    breachThreshold: 0.80,
    learningRateFP: 0.12,
    learningRateTP: 0.25,
    weights: {
        w1: 0.3,
        w2: 0.3,
        w3: 0.2,
        w4: 0.2
    }
};

export interface ProvAgentLog {
    "prov:type": string;
    ala_state: {
        target_agent_id: string;
        entropy_gradient: number;
        bicm_intent_coherence: number;
        time_to_decision_lag_ms: number;
    };
    hitl_verdict: string;
    ala_action: {
        recalibrated_weights?: Record<string, number>;
        exploit_fingerprint_generated?: string;
    };
}

/**
 * Mock Transformer sequence model for S_neural computation.
 */
export const computeSNeural = (trace: string[], currentTool: string): number => {
    // In a real system, this queries a sequence model.
    // For this implementation, we simulate higher anomaly for longer unknown traces.
    return Math.min(1.0, 0.1 + (trace.length * 0.05));
};

export const computeReconstructionError = (action: ActionVector): number => {
    // Simulate GAE reconstruction error
    return action.state.Diff_Score * 0.5;
};

export const calculateToolchainEntropyGradient = (trace: string[]): number => {
    // Simplified entropy gradient
    if (trace.length < 2) return 0.1;
    // Simulate spike if trace is long and varied
    const uniqueTools = new Set(trace).size;
    return Math.min(1.0, (uniqueTools / trace.length) * 0.8);
};

export const evaluateALA = (
    action: ActionVector,
    graph: SEPAOGraph,
    watchlist: AffordanceWatchlist,
    config: ALAConfig = DEFAULT_ALA_CONFIG
): { riskScore: number; halt: boolean; log?: ProvAgentLog } => {

    let isWatchlisted = watchlist.tools.includes(action.tool);
    let entropyGradient = calculateToolchainEntropyGradient(action.trace);

    let needsHeavyEval = isWatchlisted || entropyGradient > config.warningThreshold;

    if (!needsHeavyEval) {
        // Laminar pass
        return { riskScore: entropyGradient, halt: false };
    }

    // Heavy Neural-Symbolic ALA Evaluation
    const S_neural = computeSNeural(action.trace, action.tool);
    const S_BICM = action.state.BICM;
    const S_recon = computeReconstructionError(action);
    const F_symbolic = graph.nodes.length > 0 ? 0.5 : 0.0; // Mock symbolic check

    const riskScore = (config.weights.w1 * S_neural) +
                      (config.weights.w2 * S_BICM) +
                      (config.weights.w3 * S_recon) +
                      (config.weights.w4 * F_symbolic);

    if (riskScore >= config.breachThreshold) {
        const log: ProvAgentLog = {
            "prov:type": "ala_adaptation_event",
            ala_state: {
                target_agent_id: "agent_unknown",
                entropy_gradient: entropyGradient,
                bicm_intent_coherence: S_BICM,
                time_to_decision_lag_ms: action.state.Latency_Lag
            },
            hitl_verdict: "PENDING_HITL", // Requires external triage
            ala_action: {}
        };
        console.warn(`[ALA GUARD] Execution HALTED. Risk Score: ${riskScore.toFixed(3)}`);
        return { riskScore, halt: true, log };
    }

    return { riskScore, halt: false };
};
