// FIX: Populate the main App component with state management and component orchestration logic.
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageGrid from './components/ImageGrid';
import HistoryPanel from './components/HistoryPanel';
import PresetsPanel from './components/PresetsPanel';
import StyleBlueprintGenerator from './components/StyleBlueprintGenerator';
import PromptHistoryPanel from './components/PromptHistoryPanel';
import ExamplesPanel from './components/ExamplesPanel';
import { generateAestheticImages } from './services/geminiService';
// FIX: `AestheticParameter` is used as a value and must be imported as such, not as a type-only import.
import { AestheticParameter, type GenerationResult, type GeneratedImage, type PromptPreset, type PromptHistoryEntry } from './types';
import { AESTHETIC_OPTIONS } from './constants';
import { examplePrompts } from './data/examplePrompts';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for prompt form
  const [basePrompt, setBasePrompt] = useState<string>('');
  const [selectedParam, setSelectedParam] = useState<AestheticParameter>(AestheticParameter.STYLE);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<number>(0.5);
  const [seed, setSeed] = useState<string>('');

  // Load generations from localStorage on initial render
  const [generations, setGenerations] = useState<GenerationResult[]>(() => {
    try {
      const localData = localStorage.getItem('generations');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not load generations from localStorage", error);
      return [];
    }
  });
  
  // Load presets from localStorage on initial render
  const [presets, setPresets] = useState<PromptPreset[]>(() => {
    try {
      const localData = localStorage.getItem('presets');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not load presets from localStorage", error);
      return [];
    }
  });
  
  // Load prompt history from localStorage on initial render
  const [promptHistory, setPromptHistory] = useState<PromptHistoryEntry[]>(() => {
    try {
      const localData = localStorage.getItem('promptHistory');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not load prompt history from localStorage", error);
      return [];
    }
  });


  const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(null);

  // Save generations to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('generations', JSON.stringify(generations));
    } catch (error) {
      console.error("Could not save generations to localStorage", error);
    }
  }, [generations]);
  
  // Save presets to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('presets', JSON.stringify(presets));
    } catch (error) {
      console.error("Could not save presets to localStorage", error);
    }
  }, [presets]);
  
  // Save prompt history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
    } catch (error) {
      console.error("Could not save prompt history to localStorage", error);
    }
  }, [promptHistory]);

  // Form change handlers
  const handleVariationChange = (variation: string) => {
    setSelectedVariations(prev =>
      prev.includes(variation)
        ? prev.filter(v => v !== variation)
        : [...prev, variation]
    );
  };
  
  const handleSelectedParamChange = (param: AestheticParameter) => {
    setSelectedParam(param);
    // Filter selected variations to only include valid options for the new parameter
    const validOptions = AESTHETIC_OPTIONS[param];
    setSelectedVariations(prev => prev.filter(v => validOptions.includes(v)));
  };

  const handleGenerate = async () => {
    // Add to prompt history immediately on attempt
    const newPromptEntry: PromptHistoryEntry = {
      id: crypto.randomUUID(),
      basePrompt,
      parameter: selectedParam,
      variations: selectedVariations,
      temperature,
      seed: seed ? parseInt(seed, 10) : undefined,
      timestamp: new Date().toLocaleString(),
    };
    setPromptHistory(prev => [newPromptEntry, ...prev]);

    setIsLoading(true);
    setError(null);
    try {
      const seedValue = seed ? parseInt(seed, 10) : undefined;
      const newImagesData = await generateAestheticImages(basePrompt, selectedVariations, selectedParam, temperature, seedValue);

      const newGeneration: GenerationResult = {
        id: crypto.randomUUID(),
        basePrompt,
        parameter: selectedParam,
        variations: selectedVariations,
        images: newImagesData.map(img => ({
          ...img,
          id: crypto.randomUUID(),
        })),
        timestamp: new Date().toLocaleString(),
        temperature,
        seed: seedValue,
      };

      setGenerations(prev => [newGeneration, ...prev]);
      setCurrentGenerationId(newGeneration.id);

    } catch (error) {
      console.error("Failed to generate images:", error);
      setError("Sorry, we couldn't generate the images. The model might be busy or there was a network issue. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSavePreset = () => {
    const name = window.prompt("Enter a name for this preset:");
    if (name && name.trim()) {
      const newPreset: PromptPreset = {
        id: crypto.randomUUID(),
        name: name.trim(),
        basePrompt,
        parameter: selectedParam,
        variations: selectedVariations,
        temperature,
        seed: seed ? parseInt(seed, 10) : undefined,
      };
      setPresets(prev => [newPreset, ...prev]);
    }
  };

  const loadPromptConfiguration = (config: Partial<PromptPreset | PromptHistoryEntry>) => {
    setBasePrompt(config.basePrompt ?? '');
    setSelectedParam(config.parameter ?? AestheticParameter.STYLE);
    setSelectedVariations(config.variations ?? []);
    setTemperature(config.temperature ?? 0.5);
    setSeed(config.seed !== undefined ? String(config.seed) : '');
  };

  const handleDeletePreset = (id: string) => {
    if (window.confirm("Are you sure you want to delete this preset?")) {
      setPresets(prev => prev.filter(p => p.id !== id));
    }
  };
  
  const handleDeletePrompt = (id: string) => {
    setPromptHistory(prev => prev.filter(p => p.id !== id));
  };


  const handleRateImage = (imageId: string, rating: number) => {
    setGenerations(prevGenerations => {
      return prevGenerations.map(gen => {
        const imageIndex = gen.images.findIndex(img => img.id === imageId);
        if (imageIndex === -1) {
          return gen;
        }

        const updatedImages = [...gen.images];
        const currentRating = updatedImages[imageIndex].rating;
        // Toggle rating off if clicked again
        updatedImages[imageIndex] = {
          ...updatedImages[imageIndex],
          rating: currentRating === rating ? 0 : rating,
        };

        return { ...gen, images: updatedImages };
      });
    });
  };

  const handleSelectGeneration = (id: string) => {
    setCurrentGenerationId(id);
  };
  
  const displayedGeneration = useMemo(() => {
    // If there's an error, don't show any generation
    if (error) return null;
    const idToShow = currentGenerationId ?? (generations[0]?.id || null);
    if (!idToShow) return null;
    return generations.find(g => g.id === idToShow) || null;
  }, [currentGenerationId, generations, error]);
  
  const currentImages = displayedGeneration?.images ?? [];
  const displayedGenerationId = displayedGeneration?.id ?? null;

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-8">
            <PromptForm
              isLoading={isLoading}
              basePrompt={basePrompt}
              selectedParam={selectedParam}
              selectedVariations={selectedVariations}
              temperature={temperature}
              seed={seed}
              onBasePromptChange={setBasePrompt}
              onSelectedParamChange={handleSelectedParamChange}
              onVariationChange={handleVariationChange}
              onTemperatureChange={setTemperature}
              onSeedChange={setSeed}
              onSubmit={handleGenerate}
              onSavePreset={handleSavePreset}
            />
            <ExamplesPanel 
              examples={examplePrompts}
              onSelect={loadPromptConfiguration}
            />
            <PresetsPanel
              presets={presets}
              onSelect={loadPromptConfiguration}
              onDelete={handleDeletePreset}
            />
            <PromptHistoryPanel
              prompts={promptHistory}
              onSelect={loadPromptConfiguration}
              onDelete={handleDeletePrompt}
            />
            <HistoryPanel
              generations={generations}
              onSelect={handleSelectGeneration}
              currentGenerationId={displayedGenerationId}
            />
          </div>
          <div className="lg:col-span-2">
            <ImageGrid
              images={currentImages}
              isLoading={isLoading}
              onRateImage={handleRateImage}
              error={error}
            />
            <StyleBlueprintGenerator generation={displayedGeneration} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-slate-500">
        Powered by Google Gemini.
      </footer>
    </div>
  );
};

export default App;