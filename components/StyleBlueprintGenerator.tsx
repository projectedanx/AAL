import React, { useState, useMemo } from 'react';
import type { GenerationResult } from '../types';
import Tooltip from './Tooltip';

interface StyleBlueprintGeneratorProps {
  generation: GenerationResult | null;
}

const StyleBlueprintGenerator: React.FC<StyleBlueprintGeneratorProps> = ({ generation }) => {
  const [isCopied, setIsCopied] = useState(false);

  const selectedImages = useMemo(() => {
    if (!generation) return [];
    return generation.images.filter(img => img.rating && img.rating > 0);
  }, [generation]);

  const blueprint = useMemo(() => {
    if (!generation || selectedImages.length === 0) return null;

    const successfulVariations = [...new Set(selectedImages.map(img => img.variation))].join(', ');
    
    let blueprintText = `--- Style Blueprint ---\n\n`;
    blueprintText += `Base Subject: ${generation.basePrompt}\n`;
    blueprintText += `Parameter Tested: ${generation.parameter}\n`;
    blueprintText += `Effective Variations: ${successfulVariations}\n\n`;
    blueprintText += `--- Parameters ---\n`;
    blueprintText += `Temperature: ${generation.temperature}\n`;
    if (generation.seed !== undefined) {
      blueprintText += `Seed: ${generation.seed}\n`;
    }

    return blueprintText;
  }, [generation, selectedImages]);

  const handleCopy = () => {
    if (!blueprint) return;
    navigator.clipboard.writeText(blueprint).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!generation) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 mt-8">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Style Blueprint Generator</h2>
      {selectedImages.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-slate-400">Rate your favorite images above to generate a style blueprint.</p>
        </div>
      ) : (
        <div>
          <pre className="bg-slate-900/50 p-4 rounded-md text-slate-300 text-sm whitespace-pre-wrap font-mono overflow-x-auto">
            {blueprint}
          </pre>
          <Tooltip text="Copies the generated blueprint text to your clipboard for use in other applications.">
            <button
              onClick={handleCopy}
              className="mt-4 w-full bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan"
            >
              {isCopied ? 'Copied!' : 'Copy Blueprint to Clipboard'}
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default StyleBlueprintGenerator;
