/**
 * Thermodynamic Auditor
 *
 * Implements L3.5 Containment Kernel + Thermodynamic Auditor.
 * Provides a TCB (Trusted Computing Base) firewall managing an entropy budget
 * to ensure system security, integrity, and predictable execution bounded states.
 */

export class ThermodynamicAuditor {
    private readonly MAX_ENTROPY_BUDGET: number;

    /**
     * Initializes the auditor with a defined entropy ceiling.
     * @param maxEntropy The maximum tolerable entropy score (0.0 to 1.0). Default is 0.75.
     */
    constructor(maxEntropy: number = 0.75) {
        if (maxEntropy < 0.0 || maxEntropy > 1.0) {
            throw new Error("[⊗] Configuration Error: MAX_ENTROPY_BUDGET must be bounded between [0.0, 1.0]");
        }
        this.MAX_ENTROPY_BUDGET = maxEntropy;
    }

    /**
     * Calculates the Shannon Entropy of a given discrete probability distribution (state vector).
     * @param stateProbabilities Array of probabilities summing to ~1.0
     * @returns The calculated entropy value.
     */
    private calculateShannonEntropy(stateProbabilities: number[]): number {
        let entropy = 0.0;
        for (const p of stateProbabilities) {
            if (p > 0) {
                entropy -= p * Math.log2(p);
            }
        }
        return entropy;
    }

    /**
     * Normalizes an arbitrary state vector into a probability distribution.
     * @param systemState Arbitrary numerical state representation.
     * @returns A normalized probability distribution.
     */
    private normalizeState(systemState: number[]): number[] {
        const sum = systemState.reduce((acc, val) => acc + Math.abs(val), 0);
        if (sum === 0) return systemState.map(() => 0);

        return systemState.map(val => Math.abs(val) / sum);
    }

    /**
     * Audits the current system state against the entropy budget.
     * Functions as a TCB firewall: halts execution (returns false) if the budget is exceeded.
     * @param systemState An array representing the current system state variables.
     * @returns True if the system is within the entropy budget, False if the firewall must trigger.
     */
    public auditEntropy(systemState: number[]): boolean {
        if (systemState.length === 0) return true; // Zero state has zero entropy

        const probabilities = this.normalizeState(systemState);
        const currentEntropy = this.calculateShannonEntropy(probabilities);

        // Normalize the calculated entropy against maximum possible entropy for the given dimension
        // H_max = log2(N) where N is the number of states (systemState.length)
        const maxPossibleEntropy = Math.log2(systemState.length);

        // If H_max is 0 (length 1), normalized entropy is 0
        const normalizedEntropy = maxPossibleEntropy === 0 ? 0 : currentEntropy / maxPossibleEntropy;

        if (normalizedEntropy > this.MAX_ENTROPY_BUDGET) {
            return false; // Firewall triggered: Entropy Budget Exceeded
        }

        return true; // System Integrity Intact
    }
}
