import re

with open('components/ImageGrid.tsx', 'r') as f:
    content = f.read()

# Import JUR
content = content.replace("import type { GeneratedImage } from '../types';", "import type { GeneratedImage, JustifiedUncertaintyReport } from '../types';")

# Add JUR to ImageGridProps
content = content.replace("images: GeneratedImage[];", "images: GeneratedImage[];\n  jur?: JustifiedUncertaintyReport;")
content = content.replace("interface ImageGridProps {\n  images: GeneratedImage[];", "interface ImageGridProps {\n  images: GeneratedImage[];\n  jur?: JustifiedUncertaintyReport;")

# Add jur to props destructuring
content = content.replace("const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, onRateImage, error }) => {", "const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, onRateImage, error, jur }) => {")

jur_jsx = """
  return (
    <div className="w-full space-y-6">
      {jur && (
        <div className="w-full bg-slate-900 border border-amber-500/50 rounded-xl p-6 shadow-lg shadow-amber-500/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">⚠️</span>
            <h3 className="text-lg font-bold text-amber-500 font-mono tracking-tight uppercase">Justified Uncertainty Report (JUR)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="space-y-2">
              <div className="flex justify-between bg-slate-800 p-2 rounded">
                <span className="font-semibold text-slate-400">Geometric Density Score</span>
                <span className="font-mono text-cyan-400">{jur.geometricDensityScore.toFixed(2)}</span>
              </div>
              <div className="flex justify-between bg-slate-800 p-2 rounded">
                <span className="font-semibold text-slate-400">Golden Scar Protocol</span>
                <span className={`font-mono ${jur.goldenRatioApplied ? 'text-green-400' : 'text-rose-400'}`}>
                  {jur.goldenRatioApplied ? 'APPLIED (1.618)' : 'FAILED'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
               <div className="bg-slate-800 p-3 rounded h-full">
                 <span className="block font-semibold text-rose-400 text-xs uppercase mb-1">Ontological Shear</span>
                 <p className="text-slate-300 text-xs">{jur.ontologicalShear}</p>
                 <div className="mt-2 text-[10px] text-slate-500 font-mono">
                    Dialectical Synthesis Engine suspended execution on contradictory topology. Human resolution required.
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
"""

# Replace the main return block
content = re.sub(r'  return \(\s*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">', jur_jsx, content)

with open('components/ImageGrid.tsx', 'w') as f:
    f.write(content)
