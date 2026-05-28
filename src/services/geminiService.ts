/// file: services/geminiService.ts ///
import { GoogleGenAI } from "@google/genai";
import type { GeneratedImage } from '../types';

// Initialize GoogleGenAI with apiKey from environment variables.
// Use Vite's environment variable loading
const apiKey = import.meta.env?.VITE_API_KEY || process.env.API_KEY || 'dummy_key_for_dev';
const ai = new GoogleGenAI({ apiKey });

/**
 * Calls the Gemini API to generate aesthetic images using a base prompt, style variations, and a specific temperature setting.
 *
 * @param basePrompt - The input parameter for the function.
 * @param variations - The input parameter for the function.
 * @param parameter - The input parameter for the function.
 * @param temperature - The input parameter for the function.
 * @param seed - The input parameter for the function.
 * @returns The resulting execution output.
 *
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
    // NOTE: The 'temperature' property is not a valid parameter for the 'generateImages' config.
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
