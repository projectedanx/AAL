# PROJECT AURELIUS: Phase 3 - Cross-Modal Perceptual Fusion
## Concept & Architectural Framework

### The Limitation of RGB
Standard diffusion models are trained and output in sRGB or Adobe RGB color spaces. This is sufficient for screen viewing but fundamentally limits the physical realism of the generated light, especially when attempting to synthesize complex Non-Euclidean scenes. It relies on perceptual tricks rather than physical simulation.

### Multispectral Imaging (MSI) Integration
To achieve "Cross-Modal Perceptual Fusion," we must inject MSI data directly into the conditioning matrix of the DAG topology.
Instead of prompting "red car," the system will utilize specific wavelength targets (e.g., "Peak Reflectance: 650nm, FWHM: 20nm").

#### Required Topological Changes (`types.ts` & `graphExecutor.ts`)
1.  **New Node Type:** `MultispectralConditioningNode` (A new `PipelineNodeType`).
2.  **Data Structure Update:** The `PipelineNode.data` must support a `spectralTargets` array, mapping specific objects in the base prompt to nanometer wavelength targets.
3.  **Executor Modification:** `graphExecutor.ts` must translate these spectral targets into "Hyper-Spectral HDRi" generation directives for the underlying API (requiring models that support MSI output, or simulating it via strict chromaticity coordinates).

### Quantum Dot (QD) Targeting Specification
The ultimate output target is hardware-agnostic rendering optimized for Quantum Dot displays. QD technology allows for extremely narrow emission spectra (pure colors).

**Implementation Strategy:**
The "Agentic Chain: Plausibility Oracle" (from Phase 2) must be expanded to evaluate the output's color gamut volume against Rec. 2020 standards, punishing outputs that fall back into muddy sRGB averages. The generation pipeline acts as a synthesizer, explicitly pushing the boundaries of the latent space to find the purest monochromatic representations of the requested scene.
