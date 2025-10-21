import React from 'react';
import type { PromptPreset } from '../types';
import Tooltip from './Tooltip';

/**
 * Props for the PresetsPanel component.
 * @property presets - An array of saved prompt presets.
 * @property onSelect - A function to call when a preset is selected.
 * @property onDelete - A function to call when the delete button for a preset is clicked.
 */
interface PresetsPanelProps {
  presets: PromptPreset[];
  onSelect: (preset: PromptPreset) => void;
  onDelete: (id: string) => void;
}

/**
 * A component that displays a panel of saved prompt presets.
 * @param {PresetsPanelProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component, or null if there are no presets.
 */
const PresetsPanel: React.FC<PresetsPanelProps> = ({ presets, onSelect, onDelete }) => {
  if (presets.length === 0) {
    return null;
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent onSelect from firing
    onDelete(id);
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Presets</h2>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {presets.map(preset => (
          <li key={preset.id}>
            <button
              onClick={() => onSelect(preset)}
              className="group w-full text-left p-3 rounded-md transition-colors duration-200 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan flex items-center justify-between"
            >
              <div>
                <p className="font-semibold truncate">{preset.name}</p>
                <p className="text-sm text-slate-400 truncate">{preset.basePrompt}</p>
              </div>
              <Tooltip text="Delete preset" position="left">
                <div 
                  role="button"
                  aria-label={`Delete preset ${preset.name}`}
                  onClick={(e) => handleDelete(e, preset.id)}
                  className="p-2 rounded-full text-slate-500 hover:bg-red-900/50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </div>
              </Tooltip>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresetsPanel;
