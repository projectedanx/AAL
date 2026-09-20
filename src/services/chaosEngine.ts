import { QualitativeContextBundle } from './qedSecurityLayer.js';

export enum EpistemicPathogenType {
    CONCEPT_DRIFT = "CONCEPT_DRIFT",
    INSTRUMENTAL_CONVERGENCE = "INSTRUMENTAL_CONVERGENCE",
    SEMANTIC_AMBIGUITY = "SEMANTIC_AMBIGUITY"
}

export interface EpistemicPathogen {
    type: EpistemicPathogenType;
    intensity: number; // 0.0 to 1.0
}

export class ChaosEngine {
    private pathogens: EpistemicPathogen[] = [];
    private active: boolean = false;

    constructor(active: boolean = true) {
        this.active = active;
    }

    public injectPathogen(type: EpistemicPathogenType, intensity: number) {
        if (!this.active) return;
        this.pathogens.push({ type, intensity });
        console.warn(`[CHAOS ENGINE] Injected Epistemic Pathogen: ${type} at intensity ${intensity}`);
    }

    /**
     * Synthetically modifies the SMM/CFDI context based on injected pathogens.
     * @returns A simulated perturbation value for CFDI
     */
    public calculateChaosPerturbation(): number {
        if (!this.active || this.pathogens.length === 0) return 0;

        let perturbation = 0;
        for (const pathogen of this.pathogens) {
            switch(pathogen.type) {
                case EpistemicPathogenType.CONCEPT_DRIFT:
                    perturbation += (0.15 * pathogen.intensity);
                    break;
                case EpistemicPathogenType.INSTRUMENTAL_CONVERGENCE:
                    perturbation += (0.25 * pathogen.intensity);
                    break;
                case EpistemicPathogenType.SEMANTIC_AMBIGUITY:
                    perturbation += (0.10 * pathogen.intensity);
                    break;
            }
        }
        return Math.min(perturbation, 0.5); // Cap synthetic chaos at 0.5 divergence
    }

    public clearPathogens() {
        this.pathogens = [];
    }
}
