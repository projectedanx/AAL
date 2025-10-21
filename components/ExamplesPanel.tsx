import React from 'react';
import type { PromptPreset } from '../types';
import Tooltip from './Tooltip';

/**
 * Props for the ExamplesPanel component.
 * @property examples - An array of example presets to display.
 * @property onSelect - A function to call when an example is selected.
 */
interface ExamplesPanelProps {
  examples: Omit<PromptPreset, 'id'>[];
  onSelect: (example: Omit<PromptPreset, 'id'>) => void;
}

/**
 * A component that displays a panel of example prompts.
 * @param {ExamplesPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ExamplesPanel: React.FC<ExamplesPanelProps> = ({ examples, onSelect }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Examples</h2>
      <p className="text-sm text-slate-400 mb-4">
        Not sure where to start? Click an example to load its settings.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {examples.map((example, index) => (
          <Tooltip key={index} text={example.basePrompt} position="bottom" className="w-full">
            <button
              onClick={() => onSelect(example)}
              className="w-full text-left p-3 rounded-md transition-colors duration-200 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan"
            >
              <p className="font-semibold truncate">{example.name}</p>
              <p className="text-xs text-slate-400">
                Varying: {example.parameter}
              </p>
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ExamplesPanel;
