// FIX: Populate file with a form component for user input.
import React from 'react';
import { AESTHETIC_OPTIONS } from '../constants';
import { AestheticParameter } from '../types';
import Tooltip from './Tooltip';

interface PromptFormProps {
  isLoading: boolean;
  // State values
  basePrompt: string;
  selectedParam: AestheticParameter;
  selectedVariations: string[];
  temperature: number;
  seed: string;
  // Change handlers
  onBasePromptChange: (value: string) => void;
  onSelectedParamChange: (param: AestheticParameter) => void;
  onVariationChange: (variation: string) => void;
  onTemperatureChange: (value: number) => void;
  onSeedChange: (value: string) => void;
  // Actions
  onSubmit: () => void;
  onSavePreset: () => void;
}

const InfoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PromptForm: React.FC<PromptFormProps> = ({
  isLoading,
  basePrompt,
  selectedParam,
  selectedVariations,
  temperature,
  seed,
  onBasePromptChange,
  onSelectedParamChange,
  onVariationChange,
  onTemperatureChange,
  onSeedChange,
  onSubmit,
  onSavePreset,
}) => {
  
  const handleParamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedParamChange(e.target.value as AestheticParameter);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (basePrompt.trim() && selectedVariations.length > 0) {
      onSubmit();
    }
  };

  const currentOptions = AESTHETIC_OPTIONS[selectedParam];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
      <div>
        <label htmlFor="basePrompt" className="block text-sm font-medium text-slate-300 mb-2">
          <div className="flex items-center space-x-2">
            <span>1. Enter your core subject</span>
            <Tooltip text="The main subject of your image (e.g., 'a cat', 'a futuristic city').">
              <InfoIcon />
            </Tooltip>
          </div>
        </label>
        <input
          id="basePrompt"
          type="text"
          value={basePrompt}
          onChange={(e) => onBasePromptChange(e.target.value)}
          placeholder="e.g., A majestic cat in a library"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-3 text-slate-100 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition"
          required
        />
      </div>

      <div>
        <label htmlFor="parameter" className="block text-sm font-medium text-slate-300 mb-2">
          <div className="flex items-center space-x-2">
            <span>2. Choose a parameter to vary</span>
            <Tooltip text="Choose the aesthetic quality you want to experiment with.">
              <InfoIcon />
            </Tooltip>
          </div>
        </label>
        <select
          id="parameter"
          value={selectedParam}
          onChange={handleParamChange}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-3 text-slate-100 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition"
        >
          {Object.values(AestheticParameter).map(param => (
            <option key={param} value={param}>{param}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <div className="flex items-center space-x-2">
            <span>3. Select variations ({selectedVariations.length} selected)</span>
            <Tooltip text="Select one or more variations to generate an image for each.">
              <InfoIcon />
            </Tooltip>
          </div>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2">
          {currentOptions.map(option => (
            <label key={option} className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors duration-200 text-sm ${
              selectedVariations.includes(option) ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-slate-700/50 hover:bg-slate-700'
            }`}>
              <input
                type="checkbox"
                checked={selectedVariations.includes(option)}
                onChange={() => onVariationChange(option)}
                className="h-4 w-4 rounded bg-slate-900 border-slate-600 text-brand-cyan focus:ring-brand-cyan"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="temperature" className="block text-sm font-medium text-slate-300 mb-2">
          <div className="flex items-center space-x-2">
            <span>4. Adjust creativity (Temperature: {temperature.toFixed(1)})</span>
            <Tooltip text="Controls randomness. Higher values (towards 1.0) lead to more creative and unexpected results.">
              <InfoIcon />
            </Tooltip>
          </div>
        </label>
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
        />
      </div>

      <div>
        <label htmlFor="seed" className="block text-sm font-medium text-slate-300 mb-2">
          <div className="flex items-center space-x-2">
            <span>5. Set seed (optional for reproducibility)</span>
            <Tooltip text="A specific number to ensure you get the same image results for the same prompt. Leave blank for a random seed each time.">
              <InfoIcon />
            </Tooltip>
          </div>
        </label>
        <input
          id="seed"
          type="number"
          value={seed}
          onChange={(e) => onSeedChange(e.target.value)}
          placeholder="e.g., 42"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-md p-3 text-slate-100 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Tooltip text="Save the current prompt and settings for later use." className="w-full">
          <button
            type="button"
            onClick={onSavePreset}
            disabled={!basePrompt.trim()}
            className="w-full bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-md transition-all duration-300 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            Save as Preset
          </button>
        </Tooltip>
        <Tooltip text="Start generating images based on your current settings." className="w-full">
          <button
            type="submit"
            disabled={isLoading || !basePrompt.trim() || selectedVariations.length === 0}
            className="w-full bg-brand-cyan text-slate-900 font-bold py-3 px-4 rounded-md transition-all duration-300 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-cyan disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : `Generate ${selectedVariations.length} Images`}
          </button>
        </Tooltip>
      </div>
    </form>
  );
};

export default PromptForm;
