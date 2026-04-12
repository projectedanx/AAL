/// file: components/StyleBlueprintGenerator.tsx ///
import React, { useState, useMemo } from 'react';
import type { GenerationResult } from '../types';
import Tooltip from './Tooltip';

/**
 * Interface defining the properties for the StyleBlueprintGenerator component.
 * @interface StyleBlueprintGeneratorProps
 * @property {GenerationResult | null} generation - The generation output object containing the rated images and metadata.
 */
interface StyleBlueprintGeneratorProps {
  generation: GenerationResult | null;
}

/**
 * A component that analyzes rated images within a generation result to extract a "Style Blueprint".
 * Synthesizes a JSON schema representing the successful aesthetic parameters, which can be copied for external use.
 *
 * @param {StyleBlueprintGeneratorProps} props - The configuration parameters.
 * @returns {JSX.Element | null} The rendered StyleBlueprintGenerator component, or null if no highly rated images exist.
 */
const StyleBlueprintGenerator: React.FC<StyleBlueprintGeneratorProps> = ({ generation }) => {
  const [isCopied, setIsCopied] = useState(false);

  const blueprint = useMemo(() => {
    if (!generation) return null;

    // Filter images that have a rating of 4 or 5
    const highlyRatedImages = generation.images.filter((img) => (img.rating || 0) >= 4);

    if (highlyRatedImages.length === 0) {
      return null;
    }

    // Extract the successful variations
    const successfulVariations = highlyRatedImages.map((img) => img.variation);

    // Create a structured blueprint object
    return {
      coreSubject: generation.basePrompt,
      aestheticVector: generation.parameter,
      successfulElements: successfulVariations,
      systemContext: `Generate an image focused on '${generation.basePrompt}'. Critically apply the following ${generation.parameter.toLowerCase()} characteristics to define the overall aesthetic: ${successfulVariations.join(', ')}.`,
      metadata: {
        sourceId: generation.id,
        createdAt: new Date().toISOString(),
      }
    };
  }, [generation]);

  if (!blueprint) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-brand-cyan/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.1)]">
      <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-brand-cyan flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Style Blueprint Extracted
          </h2>
          <p className="text-xs text-slate-400 mt-1">Based on your highest-rated variations</p>
        </div>
        <Tooltip text={isCopied ? "Copied!" : "Copy JSON to clipboard"} position="left">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              isCopied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600'
            }`}
          >
            {isCopied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy JSON
              </>
            )}
          </button>
        </Tooltip>
      </div>

      <div className="p-6 bg-slate-900/50">
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          <span className="font-semibold text-slate-200">System Prompt Idea:</span> {blueprint.systemContext}
        </p>
        <div className="relative">
          <pre className="bg-slate-950 p-4 rounded-lg text-xs font-mono text-slate-400 overflow-x-auto border border-slate-800 shadow-inner">
            <code>{JSON.stringify(blueprint, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default StyleBlueprintGenerator;
