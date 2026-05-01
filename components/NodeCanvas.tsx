/**
 * Interface defining the properties for the NodeCanvas component.
 * @interface NodeCanvasProps
 * @property {Node[]} nodes - The array of topological nodes currently present on the canvas.
 * @property {Edge[]} edges - The array of edges defining the directional connections between nodes.
 * @property {(nodes: Node[] | ((nds: Node[]) => Node[])) => void} onNodesChange - Callback to handle spatial or state changes to the nodes.
 * @property {(edges: Edge[] | ((eds: Edge[]) => Edge[])) => void} onEdgesChange - Callback to handle creation or modification of edges.
 * @property {(connection: Connection) => void} onConnect - Callback fired when a user successfully connects two nodes via handles.
 * @property {boolean} isGenerating - Flag indicating if the DAG is currently being resolved and executed via the API.
 * @property {() => void} onGenerate - Callback to trigger the Pluriversal generation pipeline derived from the graph topology.
 * @property {() => void} onAddNode - Callback to spawn a new Parameter node onto the canvas.
 * @property {() => void} onClear - Callback to reset the canvas to its default, empty state.
 */
/// file: components/NodeCanvas.tsx ///
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  NodeProps,
  Edge,
  Node,
  Connection
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PipelineNodeType, AestheticParameter } from '../types';

/**
 * Custom Node for Base Prompt input
 */
const BasePromptNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-slate-800 border-2 border-brand-cyan rounded-lg p-4 w-64 shadow-lg shadow-brand-cyan/20">
      <div className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-700 pb-1">Base Prompt</div>
      <input
        type="text"
        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 text-sm focus:ring-1 focus:ring-brand-cyan"
        defaultValue={data.value as string}
        placeholder="A majestic cat..."
        onChange={(e) => {
          if(data.onChange) (data as any).onChange(e.target.value);
        }}
      />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-brand-cyan" />
    </div>
  );
};

/**
 * Custom Node for Aesthetic Parameter Variations
 */
const ParameterNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-slate-800 border-2 border-purple-500 rounded-lg p-4 w-64 shadow-lg shadow-purple-500/20">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500" />
      <div className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-700 pb-1">{data.label || 'Parameter'}</div>
      <div className="text-xs text-slate-400 mb-2">{data.value}</div>
      <div className="flex flex-wrap gap-1">
        {(data.variations as string[])?.map(v => (
          <span key={v} className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded">{v}</span>
        ))}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  );
};

/**
 * Custom Node for Output / Generation Trigger
 */
const OutputNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-slate-800 border-2 border-green-500 rounded-lg p-4 w-48 shadow-lg shadow-green-500/20 text-center">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500" />
      <div className="text-sm font-bold text-slate-300 mb-2">Synthesis Engine</div>
      <button
        className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 px-4 rounded w-full transition-colors"
        onClick={() => {
            if(data.onGenerate) (data as any).onGenerate();
        }}
      >
        Generate Trajectories
      </button>
    </div>
  );
};


/**
 * Custom Node for Topological Persona (DRP-PLURI-808)
 */
const TopologicalPersonaNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-slate-800 border-2 border-amber-500 rounded-lg p-4 w-72 shadow-lg shadow-amber-500/20">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-amber-500" />
      <div className="text-sm font-bold text-slate-300 mb-2 border-b border-slate-700 pb-1">Topological Persona</div>
      <div className="text-xs text-slate-400 mb-2">Role: {data.personaRole || 'Undefined'}</div>

      {Array.isArray(data.contradictoryDirectives) && data.contradictoryDirectives.length > 0 && (
        <div className="mb-2">
          <div className="text-[10px] font-semibold text-rose-400 uppercase">PAL2v Tension (Contradictions)</div>
          <ul className="list-disc list-inside text-xs text-slate-300">
            {(data.contradictoryDirectives as string[]).map((d: string, i: number) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}

      {Array.isArray(data.pdtConstraints) && data.pdtConstraints.length > 0 && (
        <div>
           <div className="text-[10px] font-semibold text-cyan-400 uppercase">PD&T Constraints</div>
           <div className="flex flex-col gap-1 mt-1">
             {(data.pdtConstraints as Array<{ type: string; datum: string; tolerance: string }>).map((c: any, i: number) => (
                <div key={i} className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-300 border border-slate-700">
                  <span className="text-brand-cyan">{c.type}</span> | Datum: {c.datum} | Tol: {c.tolerance}
                </div>
             ))}
           </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-amber-500" />
    </div>
  );
};

const nodeTypes = {
  [PipelineNodeType.BASE_PROMPT]: BasePromptNode,
  [PipelineNodeType.PARAMETER]: ParameterNode,
  [PipelineNodeType.OUTPUT]: OutputNode,
  [PipelineNodeType.TOPOLOGICAL_PERSONA]: TopologicalPersonaNode,
};

const initialNodes: Node[] = [
  {
    id: 'persona-1',
    type: PipelineNodeType.TOPOLOGICAL_PERSONA,
    position: { x: 50, y: 350 },
    data: {
      personaRole: 'Site Planning Operator',
      contradictoryDirectives: ['Maximize production yield', 'Maintain strict zero-emission footprint'],
      pdtConstraints: [
        { type: 'LOGICAL_ORTHOGONALITY', datum: 'A', tolerance: '< 0.30' },
        { type: 'TONAL_CONSISTENCY', datum: 'B', tolerance: 'DEVIATION: 0.10' }
      ]
    }
  },
  {
    id: 'base-1',
    type: PipelineNodeType.BASE_PROMPT,
    position: { x: 50, y: 200 },
    data: { value: 'A majestic cat in a library' }
  },
  {
    id: 'param-style',
    type: PipelineNodeType.PARAMETER,
    position: { x: 400, y: 100 },
    data: { label: 'Style Branch', value: AestheticParameter.STYLE, variations: ['Cyberpunk', 'Watercolor'] }
  },
  {
    id: 'param-lighting',
    type: PipelineNodeType.PARAMETER,
    position: { x: 400, y: 300 },
    data: { label: 'Lighting Branch', value: AestheticParameter.LIGHTING, variations: ['Cinematic', 'Neon'] }
  },
  {
    id: 'output-1',
    type: PipelineNodeType.OUTPUT,
    position: { x: 800, y: 200 },
    data: { }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-persona', source: 'base-1', target: 'persona-1', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'epersona-style', source: 'persona-1', target: 'param-style', animated: true, style: { stroke: '#f59e0b' } },
  { id: 'e1-3', source: 'base-1', target: 'param-lighting', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e2-4', source: 'param-style', target: 'output-1', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e3-4', source: 'param-lighting', target: 'output-1', animated: true, style: { stroke: '#a855f7' } },
];

/**
 * NodeCanvas Component
 * Represents the Semantic Parallax Zone for DAG-based prompt engineering.
 */
export const NodeCanvas: React.FC<{ onExecuteGraph: (nodes: Node[], edges: Edge[]) => void }> = ({ onExecuteGraph }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Inject callback into Output node
  const nodesWithCallbacks = nodes.map(node => {
    if (node.type === PipelineNodeType.OUTPUT) {
      return {
        ...node,
        data: {
          ...node.data,
          onGenerate: () => onExecuteGraph(nodes, edges)
        }
      };
    }
    if (node.type === PipelineNodeType.BASE_PROMPT) {
      return {
        ...node,
        data: {
          ...node.data,
          onChange: (val: string) => {
             setNodes(nds => nds.map(n => n.id === node.id ? { ...n, data: { ...n.data, value: val } } : n));
          }
        }
      }
    }
    return node;
  });

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

  return (
    <div className="w-full h-[600px] border border-slate-700 rounded-lg overflow-hidden bg-slate-900/80">
      <ReactFlow
        nodes={nodesWithCallbacks}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
      >
        <MiniMap
            nodeColor={(n) => {
                if (n.type === PipelineNodeType.BASE_PROMPT) return '#06b6d4';
                if (n.type === PipelineNodeType.PARAMETER) return '#a855f7';
                if (n.type === PipelineNodeType.TOPOLOGICAL_PERSONA) return '#f59e0b';
                return '#22c55e';
            }}
            maskColor="rgba(15, 23, 42, 0.8)"
            className="bg-slate-800"
        />
        <Controls className="bg-slate-800 fill-slate-200" />
        <Background gap={16} size={1} color="#334155" />
      </ReactFlow>
    </div>
  );
};

export default NodeCanvas;
