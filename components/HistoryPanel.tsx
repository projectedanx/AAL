/// file: components/HistoryPanel.tsx ///
import React from 'react';
import type { GenerationResult } from '../types';

/**
 * Interface defining the properties for the HistoryPanel component.
 * @interface HistoryPanelProps
 * @property {GenerationResult[]} generations - An array representing the chronological history of completed generation requests.
 * @property {(id: string) => void} onSelect - Callback executed when a historical generation item is selected for review.
 * @property {string | null} currentGenerationId - The ID of the currently focused/active generation result, used for styling.
 */
interface HistoryPanelProps {
  generations: GenerationResult[];
  onSelect: (id: string) => void;
  currentGenerationId: string | null;
}

/**
 * A sidebar component that lists the user's past generation trajectories.
 * Facilitates review and selection of previously generated Pluriversal graph outputs.
 *
 * @param {HistoryPanelProps} props - The configuration parameters.
 * @returns {JSX.Element | null} The rendered HistoryPanel component, or null if the generation history is empty.
 */
const HistoryPanel: React.FC<HistoryPanelProps> = ({ generations, onSelect, currentGenerationId }) => {
  if (generations.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 mt-8">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">History</h2>
      <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {generations.map(gen => (
          <li key={gen.id}>
            <button
              onClick={() => onSelect(gen.id)}
              className={`w-full text-left p-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan ${
                currentGenerationId === gen.id ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-slate-700/50 hover:bg-slate-700'
              }`}
            >
              <p className="font-semibold truncate">{gen.basePrompt}</p>
              <p className="text-sm text-slate-400">
                Varied: {gen.parameter} ({gen.images.length} images)
              </p>
              <p className="text-xs text-slate-500 mt-1">{gen.timestamp}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPanel;
