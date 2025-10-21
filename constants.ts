
import { AestheticParameter } from './types';

export const AESTHETIC_OPTIONS: Record<AestheticParameter, string[]> = {
  [AestheticParameter.STYLE]: [
    'Ukiyo-e',
    'Cyberpunk',
    'Surrealism',
    'Art Deco',
    'Impressionism',
    'Steampunk',
    'Biopunk',
    'Minimalist',
    'Vaporwave'
  ],
  [AestheticParameter.LIGHTING]: [
    'Volumetric lighting',
    'Cinematic lighting',
    'Rim lighting',
    'Silhouette lighting',
    'Soft, diffused lighting',
    'Hard, dramatic lighting',
    'Neon glow',
    'Golden hour',
  ],
  [AestheticParameter.COMPOSITION]: [
    'Symmetrical',
    'Asymmetrical',
    'Rule of thirds',
    'Leading lines',
    'Patterns and repetition',
    'Close-up',
    'Wide shot',
    'Dutch angle',
  ],
};
