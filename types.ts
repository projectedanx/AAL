/**
 * Enum for the different aesthetic parameters that can be varied.
 * @enum {string}
 */
export enum AestheticParameter {
  STYLE = 'Style',
  LIGHTING = 'Lighting',
  COMPOSITION = 'Composition',
}

/**
 * Interface for a single generated image.
 * @property id - A unique identifier for the image.
 * @property src - The source URL of the image.
 * @property prompt - The full prompt that was used to generate the image.
 * @property variation - The specific variation that was applied to the base prompt.
 * @property rating - The user's rating of the image, from 1 to 5.
 */
export interface GeneratedImage {
  id: string;
  src: string;
  prompt: string;
  variation: string;
  rating?: number;
}

/**
 * Interface for the result of a single generation request.
 * @property id - A unique identifier for the generation result.
 * @property basePrompt - The base prompt that was used for the generation.
 * @property parameter - The aesthetic parameter that was varied.
 * @property variations - The variations that were applied to the base prompt.
 * @property images - An array of the generated images.
 * @property timestamp - The timestamp of when the generation was created.
 * @property temperature - The temperature that was used for the generation.
 * @property seed - The seed that was used for the generation.
 */
export interface GenerationResult {
  id: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  images: GeneratedImage[];
  timestamp: string;
  temperature: number;
  seed?: number;
}

/**
 * Interface for a saved prompt preset.
 * @property id - A unique identifier for the preset.
 * @property name - The name of the preset.
 * @property basePrompt - The base prompt of the preset.
 * @property parameter - The aesthetic parameter of the preset.
 * @property variations - The variations of the preset.
 * @property temperature - The temperature of the preset.
 * @property seed - The seed of the preset.
 */
export interface PromptPreset {
  id: string;
  name: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  temperature: number;
  seed?: number;
}

/**
 * Interface for a single entry in the prompt history.
 * @property id - A unique identifier for the history entry.
 * @property basePrompt - The base prompt that was used.
 * @property parameter - The aesthetic parameter that was used.
 * @property variations - The variations that were used.
 * @property temperature - The temperature that was used.
 * @property seed - The seed that was used.
 * @property timestamp - The timestamp of when the prompt was submitted.
 */
export interface PromptHistoryEntry {
  id: string;
  basePrompt: string;
  parameter: AestheticParameter;
  variations: string[];
  temperature: number;
  seed?: number;
  timestamp: string;
}
