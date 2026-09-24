export interface State {
    fluents: Record<string, number>; // 1 for true, 0 for false
}

export interface Action {
    name: string;
    preconditions: Record<string, number>;
    effects: Record<string, number>;
}

export interface Trace {
    states: State[];
    actions: Action[];
}

export class SystemAssuranceAgent {
    /**
     * Solves the frame problem by ensuring that any fluent variable f_i
     * not explicitly modified by the action's effects remains invariant
     * between state transitions.
     */
    public checkFrameOperator(s_k: State, s_k_plus_1: State, a_k: Action): boolean {
        for (const [key, value] of Object.entries(s_k.fluents)) {
            // If the fluent is not in the effects, it must remain invariant
            if (!(key in a_k.effects)) {
                if (s_k_plus_1.fluents[key] !== value) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Calculates the Causal Path Integrity (CPI) score over a discrete trace of N states.
     * CPI measures the adherence to cause-and-effect laws.
     */
    public calculateCPI(trace: Trace): number {
        const N = trace.states.length;
        if (N <= 1) return 1.0;

        let validTransitions = 0;

        for (let k = 0; k < N - 1; k++) {
            const s_k = trace.states[k];
            const a_k = trace.actions[k];
            const s_k_plus_1 = trace.states[k + 1];

            // Check preconditions: s_k |= Pre(a_k)
            let preMet = true;
            for (const [key, val] of Object.entries(a_k.preconditions)) {
                if (s_k.fluents[key] !== val) {
                    preMet = false;
                    break;
                }
            }

            // Check effects: s_{k+1} |= Eff(a_k)
            let effMet = true;
            for (const [key, val] of Object.entries(a_k.effects)) {
                if (s_k_plus_1.fluents[key] !== val) {
                    effMet = false;
                    break;
                }
            }

            // Check Frame Operator
            const frameMet = this.checkFrameOperator(s_k, s_k_plus_1, a_k);

            if (preMet && effMet && frameMet) {
                validTransitions++;
            }
        }

        return validTransitions / (N - 1);
    }

    /**
     * Evaluates the trace and enforces the CPI >= 0.95 hard constraint.
     */
    public evaluateTrace(trace: Trace): { passed: boolean; halted: boolean; cpi: number } {
        const cpi = this.calculateCPI(trace);

        if (cpi < 0.95) {
            console.error(`[SYSTEM ASSURANCE AGENT] Causal Path Integrity violation! CPI: ${cpi.toFixed(3)} < 0.95`);
            return { passed: false, halted: true, cpi };
        }

        return { passed: true, halted: false, cpi };
    }
}
