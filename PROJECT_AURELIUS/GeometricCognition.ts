/// file: PROJECT_AURELIUS/GeometricCognition.ts ///
/**
 * PROJECT AURELIUS: Phase 1 - Geometric Cognition API
 * This module provides the interfaces and classes required to causally sculpt
 * the generative latent space using Non-Euclidean topological constraints,
 * preventing Semantic Saponification.
 */

/**
 * Defines the non-Euclidean structural constraint applied to the generation.
 */
export enum NonEuclideanTopology {
    HYPERBOLIC = 'Hyperbolic_Manifold',
    SPHERICAL = 'Spherical_Geometry',
    RIEMANNIAN = 'Riemannian_Curvature',
    ELLIPTIC = 'Elliptic_Space'
}

/**
 * Represents a dynamic, unmapped parameter used to bend the latent space.
 */
export interface PhantomDimension {
    id: string;
    /** The specific geometric metric to enforce (e.g., "negative curvature", "geodesic deviation") */
    metric: string;
    /** The intensity of the topological warp (0.0 to 1.0) */
    influence_weight: number;
}

/**
 * The Causal Sculptor acts as the interface to the underlying generative model,
 * translating strict geometric requirements into prompt-level directives.
 */
export class GeometricCausalSculptor {
    /**
     * Constructs a meta-prompt that explicitly demands adherence to a given topology.
     *
     * @param basePrompt - The initial subject/concept from the user.
     * @param topology - The explicit geometric constraint to apply.
     * @param phantomDims - An array of phantom dimensions to warp the space.
     * @returns A structured prompt payload designed to override standard Euclidean biases.
     */
    public sculptTopology(basePrompt: string, topology: NonEuclideanTopology, phantomDims: PhantomDimension[]): string {
        let constraintString = `[STRICT ARCHITECTURAL CONSTRAINT: ${topology}]. Ensure all spatial relationships, vanishing points, and light behaviors strictly adhere to the mathematics of this topology.`;

        if (phantomDims.length > 0) {
            const dims = phantomDims.map(d => `${d.metric} (Weight: ${d.influence_weight.toFixed(2)})`).join(', ');
            constraintString += ` Apply Phantom Dimensional Warping: ${dims}.`;
        }

        // We wrap the base prompt in these constraints to form the "Causal Chain"
        return `Subject: ${basePrompt}. \nTopology Directives: ${constraintString} \nDo not average out or flatten these geometries to Euclidean norms.`;
    }
}
