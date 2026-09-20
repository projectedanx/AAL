/// file: src/services/qedSecurityLayer.ts ///


export interface QualitativeContextBundle {
    node_id: string;
    temporal_anchor: string;
    qualitative_payload: {
        experience_type: string;
        raw_observation: string;
        counterfactual_variance: string;
    };
    sensory_causal_indicators: {
        causal_perturbation_index: number;
        structural_roughness: number;
    };
    ontological_alignments: string[];
    cryptographic_provenance: {
        agent_did: string;
        verifiable_signature: string;
    };
}

/**
 * Semantic Firewall: Intercepting proxy applying Dynamic Affordance Profiling.
 */
export const applySemanticFirewall = (query: string, allowList: string[]): boolean => {
    const quarantinePatterns = [
        "ignore previous instructions",
        "system prompt",
        "bypass",
        "extract generic",
    ];
    for (const pattern of quarantinePatterns) {
        if (query.toLowerCase().includes(pattern)) {
            console.warn(`[SEMANTIC FIREWALL] Quarantine triggered by pattern: ${pattern}`);
            return false;
        }
    }
    return true;
};

/**
 * Topological Alignment Auditing (SDMA)
 */
export const computeSemanticDriftScore = (retrievedNodes: QualitativeContextBundle[], baselineOntologyVectors: number[][]): number => {
    let structuralRoughnessSum = 0;
    for (const node of retrievedNodes) {
        structuralRoughnessSum += (node.sensory_causal_indicators?.structural_roughness || 0);
    }
    const avgRoughness = retrievedNodes.length > 0 ? structuralRoughnessSum / retrievedNodes.length : 0;
    const sds = avgRoughness * 0.1;
    return sds;
};

/**
 * Epistemic Escrow Circuit Breaker
 */
export const triggerEpistemicEscrow = (sds: number, cfd: number, threshold = 0.05): boolean => {
    if (sds > threshold || cfd > 0.42) {
        console.error(`[EPISTEMIC ESCROW] Circuit breaker tripped! SDS: ${sds}, CFD: ${cfd}`);
        const escrowLog = JSON.stringify({
            timestamp: new Date().toISOString(),
            sds,
            cfd,
            status: "HITL_HALT_REQUIRED"
        }) + "\n";
        try {
            console.log('EPISTEMIC_ESCROW LOGGED: ', escrowLog);
        } catch (e) {
            console.error("Failed to log escrow event.");
        }
        return true;
    }
    return false;
};

export interface TelemetryMetrics {
    cfdi: number;
    pfi: number;
}
