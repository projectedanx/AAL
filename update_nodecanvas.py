import re

with open('components/NodeCanvas.tsx', 'r') as f:
    content = f.read()

# 1. Add MultispectralConditioningNode component definition
multispectral_node_code = """
/**
 * Custom Node for Multispectral Conditioning (PROJECT AURELIUS)
 */
const MultispectralConditioningNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-slate-800 border-2 border-red-500 rounded-lg p-4 w-72 shadow-lg shadow-red-500/20">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-red-500" />
      <div className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-700 pb-1">Multispectral Conditioning</div>

      {Array.isArray(data.spectralTargets) && data.spectralTargets.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
           {(data.spectralTargets as Array<{ target: string; wavelength: number; fwhm: number }>).map((t: any, i: number) => (
              <div key={i} className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-300 border border-slate-700">
                <div className="font-bold text-red-400">{t.target}</div>
                <div>Wavelength: {t.wavelength}nm</div>
                <div>FWHM: {t.fwhm}nm</div>
              </div>
           ))}
        </div>
      )}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-red-500" />
    </div>
  );
};
"""

content = re.sub(
    r'(const TopologicalPersonaNode = .*?};\n)',
    r'\1' + '\n' + multispectral_node_code,
    content,
    flags=re.DOTALL
)

# 2. Add to nodeTypes
content = re.sub(
    r'(\[PipelineNodeType\.TOPOLOGICAL_PERSONA\]: TopologicalPersonaNode,)',
    r'\1\n  [PipelineNodeType.MULTISPECTRAL_CONDITIONING]: MultispectralConditioningNode,',
    content
)

# 3. Add to MiniMap nodeColor
content = re.sub(
    r'(if \(n\.type === PipelineNodeType\.TOPOLOGICAL_PERSONA\) return \'#f59e0b\';)',
    r'\1\n                if (n.type === PipelineNodeType.MULTISPECTRAL_CONDITIONING) return \'#ef4444\';',
    content
)

# 4. Add an initial node
initial_node = """  {
    id: 'msi-1',
    type: PipelineNodeType.MULTISPECTRAL_CONDITIONING,
    position: { x: 50, y: 550 },
    data: {
      spectralTargets: [
        { target: 'Chlorophyll A', wavelength: 430, fwhm: 20 },
        { target: 'Cyan', wavelength: 490, fwhm: 10 }
      ]
    }
  },"""

content = re.sub(
    r'(const initialNodes: Node\[\] = \[)',
    r'\1\n' + initial_node,
    content
)

# 5. Add an initial edge
initial_edge = """  { id: 'e1-msi', source: 'base-1', target: 'msi-1', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'emsi-style', source: 'msi-1', target: 'param-style', animated: true, style: { stroke: '#ef4444' } },"""

content = re.sub(
    r'(const initialEdges: Edge\[\] = \[)',
    r'\1\n' + initial_edge,
    content
)

with open('components/NodeCanvas.tsx', 'w') as f:
    f.write(content)
