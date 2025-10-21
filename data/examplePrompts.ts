import { AestheticParameter, type PromptPreset } from '../types';

/**
 * An array of example prompts to display in the UI.
 * These are used to provide users with starting points for their own creations.
 */
export const examplePrompts: Omit<PromptPreset, 'id'>[] = [
  {
    name: "Cyberpunk City Lighting",
    basePrompt: "A rain-slicked neon street in a futuristic city, crowded with people holding glowing umbrellas",
    parameter: AestheticParameter.LIGHTING,
    variations: ['Volumetric lighting', 'Cinematic lighting', 'Rim lighting', 'Neon glow'],
    temperature: 0.6,
    seed: 2049,
  },
  {
    name: "Ukiyo-e Cherry Blossom",
    basePrompt: "A solitary cherry blossom tree on a misty mountain overlooking a tranquil village",
    parameter: AestheticParameter.STYLE,
    variations: ['Ukiyo-e', 'Impressionism', 'Minimalist'],
    temperature: 0.4,
  },
  {
    name: "Surreal Underwater Scene",
    basePrompt: "An octopus reading a glowing book in a vast, ancient underwater library",
    parameter: AestheticParameter.COMPOSITION,
    variations: ['Symmetrical', 'Close-up', 'Wide shot', 'Dutch angle'],
    temperature: 0.8,
    seed: 101,
  },
  {
    name: "Artistic Robot Butler",
    basePrompt: "Portrait of an elegant robot butler serving tea",
    parameter: AestheticParameter.STYLE,
    variations: ['Art Deco', 'Steampunk', 'Surrealism', 'Biopunk'],
    temperature: 0.7,
  },
  {
    name: "Dramatic Coffee Photo",
    basePrompt: "A perfectly crafted cup of steaming coffee on a rustic wooden table",
    parameter: AestheticParameter.LIGHTING,
    variations: ['Soft, diffused lighting', 'Hard, dramatic lighting', 'Golden hour', 'Silhouette lighting'],
    temperature: 0.5,
    seed: 42,
  },
];
