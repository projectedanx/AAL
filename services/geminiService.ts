// FIX: Populate file with image generation logic using @google/genai.
import { GoogleGenAI } from "@google/genai";
import type { GeneratedImage } from '../types';

// Initialize GoogleGenAI with apiKey from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a set of aesthetic images based on a base prompt and a set of variations.
 * @param basePrompt - The base prompt for the images.
 * @param variations - The variations to apply to the base prompt.
 * @param parameter - The parameter to vary (e.g., 'Style', 'Lighting').
 * @param temperature - The temperature to use for the image generation.
 * @param seed - The seed to use for the image generation.
 * @returns A promise that resolves to an array of generated images.
 */
export const generateAestheticImages = async (
  basePrompt: string,
  variations: string[],
  parameter: string, // e.g., 'Style', 'Lighting'
  temperature: number,
  seed?: number,
): Promise<Omit<GeneratedImage, 'id' | 'rating'>[]> => {
  const imagePromises = variations.map(async (variation) => {
    const fullPrompt = `${basePrompt}, ${parameter}: ${variation}`;
    
    // Use 'imagen-4.0-generate-001' for high-quality image generation as per guidelines.
    // FIX: The 'temperature' property is not a valid parameter for the 'generateImages' config.
    // NOTE: The 'seed' parameter is not currently supported by the 'imagen-4.0-generate-001' model API.
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    // Correctly access the base64 image data from the response.
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
    
    return {
      src: imageUrl,
      prompt: fullPrompt,
      variation: variation,
    };
  });

  return Promise.all(imagePromises);
};