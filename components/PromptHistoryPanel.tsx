import React, { useState } from 'react';
import type { PromptHistoryEntry } from '../types';
import Tooltip from './Tooltip';

/**
 * Props for the PromptHistoryPanel component.
 * @property prompts - An array of prompt history entries.
 * @property onSelect - A function to call when a prompt is selected from the history.
 * @property onDelete - A function to call when a prompt is deleted from the history.
 */
interface PromptHistoryPanelProps {
  prompts: PromptHistoryEntry[];
  onSelect: (prompt: PromptHistoryEntry) => void;
  onDelete: (id: string) => void;
}

/**
 * A component that displays a panel with the history of user-submitted prompts.
 * @param {PromptHistoryPanelProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component, or null if there is no prompt history.
 */
const PromptHistoryPanel: React.FC<PromptHistoryPanelProps> = ({ prompts, onSelect, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent onSelect from firing
    onDelete(id);
  };

  const filteredPrompts = prompts.filter(p => 
    p.basePrompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Prompt History</h2>
      <input
        type="text"
        placeholder="Search prompts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-2 mb-4 text-slate-100 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition text-sm"
      />
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {filteredPrompts.map(prompt => (
          <li key={prompt.id}>
            <button
              onClick={() => onSelect(prompt)}
              className="group w-full text-left p-3 rounded-md transition-colors duration-200 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{prompt.basePrompt}</p>
                <p className="text-xs text-slate-400 truncate">
                  {prompt.parameter}: {prompt.variations.join(', ')}
                </p>
                 <p className="text-xs text-slate-500 mt-1">{prompt.timestamp}</p>
              </div>
              <Tooltip text="Delete from history" position="left">
                <div 
                  role="button"
                  aria-label={`Delete prompt`}
                  onClick={(e) => handleDelete(e, prompt.id)}
                  className="p-2 ml-2 rounded-full text-slate-500 hover:bg-red-900/50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </div>
              </Tooltip>
            </button>
          </li>
        ))}
         {filteredPrompts.length === 0 && searchTerm && (
          <li className="text-center text-sm text-slate-500 py-4">No matching prompts found.</li>
        )}
      </ul>
    </div>
  );
};

export default PromptHistoryPanel;
