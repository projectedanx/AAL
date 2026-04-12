/// file: components/PresetsPanel.tsx ///
import React from 'react';
import type { PromptPreset } from '../types';
import Tooltip from './Tooltip';

/**
 * Interface defining the properties for the PresetsPanel component.
 * @interface PresetsPanelProps
 * @property {PromptPreset[]} presets - An array of user-saved generative configurations.
 * @property {(preset: PromptPreset) => void} onSelect - Callback executed when a preset is selected to populate the canvas.
 * @property {(id: string) => void} onDelete - Callback executed to remove a preset from storage.
 */
interface PresetsPanelProps {
  presets: PromptPreset[];
  onSelect: (preset: PromptPreset) => void;
  onDelete: (id: string) => void;
}

/**
 * A sidebar component allowing users to manage and apply saved generative presets.
 * Supports the preservation of successful aesthetic configurations across sessions.
 *
 * @param {PresetsPanelProps} props - The configuration parameters and event handlers.
 * @returns {JSX.Element | null} The rendered PresetsPanel component, or null if no presets exist.
 */
const PresetsPanel: React.FC<PresetsPanelProps> = ({ presets, onSelect, onDelete }) => {
  if (presets.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 mt-8">
      <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center justify-between">
        Saved Presets
        <span className="bg-slate-700 text-xs px-2 py-1 rounded-full text-slate-300">
          {presets.length}
        </span>
      </h2>
      <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {presets.map(preset => (
          <li key={preset.id} className="relative group">
             <div className="flex w-full bg-slate-700/30 rounded-md border border-slate-600/50 overflow-hidden transition-all duration-200 hover:border-brand-cyan/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]">
              <button
                onClick={() => onSelect(preset)}
                className="flex-grow text-left p-3 focus:outline-none focus:bg-slate-700/50"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-slate-200 truncate pr-2">{preset.name}</p>
                </div>
                <p className="text-xs text-slate-400 truncate mb-1">
                  {preset.basePrompt}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-cyan bg-brand-cyan/10 px-1.5 py-0.5 rounded">
                    {preset.parameter}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {preset.variations.length} vars
                  </span>
                </div>
              </button>

              <Tooltip text="Delete preset" position="left">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(preset.id);
                  }}
                  className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors focus:outline-none border-l border-slate-600/50 flex flex-col justify-center"
                  aria-label={`Delete preset ${preset.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresetsPanel;
