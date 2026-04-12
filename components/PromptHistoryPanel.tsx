/// file: components/PromptHistoryPanel.tsx ///
import React, { useState } from 'react';
import type { PromptHistoryEntry } from '../types';
import Tooltip from './Tooltip';

/**
 * Interface defining the properties for the PromptHistoryPanel component.
 * @interface PromptHistoryPanelProps
 * @property {PromptHistoryEntry[]} prompts - An array of chronological entries representing previous prompt configurations.
 * @property {(prompt: PromptHistoryEntry) => void} onSelect - Callback executed when a history entry is selected to repopulate the canvas.
 * @property {(id: string) => void} onDelete - Callback executed to remove a prompt entry from history.
 */
interface PromptHistoryPanelProps {
  prompts: PromptHistoryEntry[];
  onSelect: (prompt: PromptHistoryEntry) => void;
  onDelete: (id: string) => void;
}

/**
 * A sidebar component displaying a chronological log of past prompt executions.
 * Allows users to re-traverse previous epistemic paths by reloading historical configurations.
 *
 * @param {PromptHistoryPanelProps} props - The configuration parameters and event handlers.
 * @returns {JSX.Element | null} The rendered PromptHistoryPanel component, or null if history is empty.
 */
const PromptHistoryPanel: React.FC<PromptHistoryPanelProps> = ({ prompts, onSelect, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (prompts.length === 0) {
    return null;
  }

  const filteredPrompts = prompts.filter(p =>
    p.basePrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.parameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.variations.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">Prompt Log</h2>
        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
          {prompts.length} entries
        </span>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map(prompt => (
            <li key={prompt.id} className="relative group">
              <div className="w-full text-left p-3 rounded-md border border-slate-700 bg-slate-800/50 hover:border-slate-500 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-slate-500 font-mono">
                    {new Date(prompt.timestamp).toLocaleDateString()} {new Date(prompt.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Tooltip text="Load this prompt" position="top">
                      <button
                        onClick={() => onSelect(prompt)}
                        className="text-brand-cyan hover:bg-brand-cyan/20 p-1 rounded transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </Tooltip>
                    <Tooltip text="Delete entry" position="top">
                      <button
                        onClick={() => onDelete(prompt.id)}
                        className="text-slate-500 hover:text-red-400 hover:bg-red-400/20 p-1 rounded transition-colors"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>

                <p className="font-medium text-slate-300 text-sm mb-2 line-clamp-2">
                  {prompt.basePrompt}
                </p>

                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-700/50">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">
                    {prompt.parameter}
                  </span>
                  <div className="h-3 w-px bg-slate-700"></div>
                  <span className="text-xs text-slate-500 truncate" title={prompt.variations.join(', ')}>
                    {prompt.variations.length} vars
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center py-4 text-slate-500 text-sm">
            No matching prompts found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default PromptHistoryPanel;
