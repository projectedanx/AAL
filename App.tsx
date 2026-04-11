/// file: App.tsx ///
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import NodeCanvas from './components/NodeCanvas';
import ImageGrid from './components/ImageGrid';
import HistoryPanel from './components/HistoryPanel';
import StyleBlueprintGenerator from './components/StyleBlueprintGenerator';
import { GenerationResult, PromptHistoryEntry, PromptPreset, AestheticParameter } from './types';
import { executeGraph } from './services/graphExecutor';
import { Node, Edge } from '@xyflow/react';

const App: React.FC = () => {
  const [generations, setGenerations] = useState<GenerationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<PromptHistoryEntry[]>([]);
  const [presets, setPresets] = useState<PromptPreset[]>([]);

  useEffect(() => {
    try {
      const savedGenerations = localStorage.getItem('generations');
      if (savedGenerations) setGenerations(JSON.parse(savedGenerations));

      const savedHistory = localStorage.getItem('promptHistory');
      if (savedHistory) setPromptHistory(JSON.parse(savedHistory));

      const savedPresets = localStorage.getItem('presets');
      if (savedPresets) setPresets(JSON.parse(savedPresets));
    } catch (e) {
      console.error("Failed to parse local storage data", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('generations', JSON.stringify(generations));
    } catch (error) {
      console.error("Could not save generations to localStorage", error);
    }
  }, [generations]);

  const handleExecuteGraph = async (nodes: Node[], edges: Edge[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await executeGraph(nodes, edges);
      if (results.length > 0) {
          setGenerations(prev => [...results, ...prev]);
          setCurrentGenerationId(results[0].id);

          // Log to history
          const historyEntries = results.map(r => ({
              id: crypto.randomUUID(),
              basePrompt: r.basePrompt,
              parameter: r.parameter,
              variations: r.variations,
              temperature: r.temperature,
              timestamp: r.timestamp
          }));
          setPromptHistory(prev => [...historyEntries, ...prev]);
      } else {
          setError("No valid trajectories found. Check your node connections.");
      }
    } catch (err) {
       console.error("Graph execution failed:", err);
       setError("Graph execution failed. The topology might be unstable.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRateImage = (imageId: string, rating: number) => {
    setGenerations(prevGenerations => {
      return prevGenerations.map(gen => {
        const imageIndex = gen.images.findIndex(img => img.id === imageId);
        if (imageIndex === -1) return gen;

        const updatedImages = [...gen.images];
        const currentRating = updatedImages[imageIndex].rating;
        updatedImages[imageIndex] = {
          ...updatedImages[imageIndex],
          rating: currentRating === rating ? 0 : rating,
        };

        return { ...gen, images: updatedImages };
      });
    });
  };

  const displayedGeneration = useMemo(() => {
    if (error) return null;
    const idToShow = currentGenerationId ?? (generations[0]?.id || null);
    if (!idToShow) return null;
    return generations.find(g => g.id === idToShow) || null;
  }, [currentGenerationId, generations, error]);

  const currentImages = displayedGeneration?.images ?? [];

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-3">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">Semantic Parallax Zone (Node Canvas)</h2>
                <p className="text-sm text-slate-400">Map out multi-dimensional prompt trajectories. Connect parameters to base prompts and synthesize results.</p>
             </div>
             <NodeCanvas onExecuteGraph={handleExecuteGraph} />
          </div>

          <div className="lg:col-span-1">
             <HistoryPanel
              generations={generations}
              onSelect={setCurrentGenerationId}
              currentGenerationId={displayedGeneration?.id || null}
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ImageGrid
              images={currentImages}
              isLoading={isLoading}
              onRateImage={handleRateImage}
              error={error}
            />
            {displayedGeneration && (
               <StyleBlueprintGenerator generation={displayedGeneration} />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-slate-500">
        Pluriversal Topological Shift Enabled. Powered by Google Gemini.
      </footer>
    </div>
  );
};

export default App;
