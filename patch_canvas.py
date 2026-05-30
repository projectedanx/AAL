import re

with open("src/components/NodeCanvas.tsx", "r") as f:
    content = f.read()

# Add MycelialScarRouterNode component
mycelial_component = """
// --- Mycelial Scar Router Node ---
const MycelialScarRouterNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-[#FF4500]/10 border-2 border-[#FF4500] rounded-md p-3 min-w-[150px] shadow-[0_0_15px_rgba(255,69,0,0.3)]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-[#FF4500]" />
      <div className="font-bold text-[#FF4500] text-xs uppercase tracking-wider mb-1">Mycelial Scar Router</div>
      <div className="text-gray-300 text-[10px] mb-1">Threshold: <span className="font-bold text-white">{data.scarThreshold || 1.618}</span></div>
      <div className="text-[10px] bg-slate-900 px-2 py-1 rounded text-[#FF4500] border border-[#FF4500]/30 font-mono mt-2 flex flex-col gap-1">
        <span>Active Scars:</span>
        {(data.activeScars || []).map((scar: string, idx: number) => (
          <span key={idx} className="bg-[#FF4500]/20 px-1 rounded">- {scar}</span>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-[#FF4500]" />
    </div>
  );
};
"""

if "MycelialScarRouterNode =" not in content:
    content = content.replace(
        "const nodeTypes = {",
        f"{mycelial_component}\nconst nodeTypes = {{"
    )

if "PipelineNodeType.MYCELIAL_SCAR_ROUTER]: MycelialScarRouterNode," not in content:
    content = content.replace(
        "[PipelineNodeType.CIPHER_SECURITY_GATE]: CipherSecurityNode,",
        "[PipelineNodeType.CIPHER_SECURITY_GATE]: CipherSecurityNode,\n  [PipelineNodeType.MYCELIAL_SCAR_ROUTER]: MycelialScarRouterNode,"
    )

new_node = """  {
    id: 'mycelial-1',
    type: PipelineNodeType.MYCELIAL_SCAR_ROUTER,
    position: { x: 50, y: -50 },
    data: { scarThreshold: 1.618, activeScars: ['SCAR-004', 'SCAR-KIRA-005'] }
  },
"""

if "id: 'mycelial-1'" not in content:
    content = content.replace(
        "const initialNodes: Node[] = [",
        f"const initialNodes: Node[] = [\n{new_node}"
    )

if "id: 'emycelial'" not in content:
    new_edge = "  { id: 'emycelial', source: 'base-1', target: 'mycelial-1', animated: true, style: { stroke: '#FF4500' } },\n"
    content = content.replace(
        "const initialEdges: Edge[] = [",
        f"const initialEdges: Edge[] = [\n{new_edge}"
    )

with open("src/components/NodeCanvas.tsx", "w") as f:
    f.write(content)

print("src/components/NodeCanvas.tsx updated")
