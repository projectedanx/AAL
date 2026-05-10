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


/**
 * Custom Node for VULCAN Bounded Context
 */
const BoundedContextNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-[#1A1A1A] border-2 border-[#FF4500] rounded-none p-4 w-64 shadow-none">
      <Handle type="target" position={Position.Left} className="w-4 h-4 bg-[#FF4500] rounded-none" />
      <div className="text-xs font-mono font-bold text-[#FF4500] mb-2 border-b-2 border-[#FF4500] pb-1 uppercase tracking-widest">Bounded Context</div>
      <div className="text-sm text-white font-mono">{data.domainName || 'UNKNOWN_DOMAIN'}</div>
      <Handle type="source" position={Position.Right} className="w-4 h-4 bg-[#FF4500] rounded-none" />
    </div>
  );
};

/**
 * Custom Node for VULCAN Event Broker
 */
const EventBrokerNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-[#1A1A1A] border-2 border-blue-500 rounded-none p-3 w-48 shadow-none">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500 rounded-none" />
      <div className="text-xs font-mono font-bold text-blue-500 mb-1 border-b border-blue-500 pb-1 uppercase tracking-wider">Event Broker</div>
      <div className="text-xs text-slate-300 font-mono">{data.eventName || 'Topic...'}</div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500 rounded-none" />
    </div>
  );
};

/**
 * Custom Node for VULCAN Shared Database (Anti-Pattern)
 */
const SharedDatabaseNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-red-950 border-4 border-red-600 rounded-none p-4 w-48 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
      <Handle type="target" position={Position.Top} className="w-4 h-4 bg-red-500 rounded-none" />
      <div className="text-xs font-mono font-bold text-red-400 mb-2 border-b border-red-600 pb-1 uppercase text-center animate-pulse">SHARED DB ANATHEMA</div>
      <div className="text-[10px] text-red-300 font-mono text-center">SCAR-002 RISK ZONE</div>
    </div>
  );
};


// --- VORTEX-ARCHITECT Nodes ---
const VortexStigmergicLockNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-[#FF00FF]/10 border-2 border-[#FF00FF] rounded-md p-3 min-w-[150px] shadow-[0_0_15px_rgba(255,0,255,0.3)]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-[#FF00FF]" />
      <div className="font-bold text-[#FF00FF] text-xs uppercase tracking-wider mb-1">Stigmergic Lock</div>
      <div className="text-gray-300 text-[10px]">
        {data.label || 'Mutex AST Lock'}
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-[#FF00FF]" />
    </div>
  );
};

const VortexDccdEnforcerNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-[#FF00FF]/10 border-2 border-[#FF00FF] rounded-md p-3 min-w-[150px] shadow-[0_0_15px_rgba(255,0,255,0.3)]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-[#FF00FF]" />
      <div className="font-bold text-[#FF00FF] text-xs uppercase tracking-wider mb-1">DCCD Enforcer</div>
      <div className="text-gray-300 text-[10px] mb-1">Schema: {data.dccdSchema || 'VORTEX_Emergence_Schema'}</div>
      <div className="text-xs bg-black/50 p-1 rounded font-mono text-gray-400">Draft-Conditioned</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-[#FF00FF]" />
    </div>
  );
};

const nodeTypes = {
  [PipelineNodeType.VULCAN_BOUNDED_CONTEXT]: BoundedContextNode,
  [PipelineNodeType.VULCAN_EVENT_BROKER]: EventBrokerNode,
  [PipelineNodeType.VULCAN_SHARED_DATABASE]: SharedDatabaseNode,
  [PipelineNodeType.BASE_PROMPT]: BasePromptNode,
  [PipelineNodeType.PARAMETER]: ParameterNode,
  [PipelineNodeType.OUTPUT]: OutputNode,
  [PipelineNodeType.TOPOLOGICAL_PERSONA]: TopologicalPersonaNode,
  [PipelineNodeType.VORTEX_STIGMERGIC_LOCK]: VortexStigmergicLockNode,
  [PipelineNodeType.VORTEX_DCCD_ENFORCER]: VortexDccdEnforcerNode,
  [PipelineNodeType.MULTISPECTRAL_CONDITIONING]: MultispectralConditioningNode,
};

const initialNodes: Node[] = [
  {
    id: 'vortex-lock-1',
    type: PipelineNodeType.VORTEX_STIGMERGIC_LOCK,
    position: { x: 50, y: -200 },
    data: { label: '+++ContextLock(anchor="VORTEX")', stigmergicLock: true }
  },
  {
    id: 'vortex-dccd-1',
    type: PipelineNodeType.VORTEX_DCCD_ENFORCER,
    position: { x: 300, y: -200 },
    data: { label: 'Schema Enforcer', dccdSchema: 'C4_Model_ADR_JSON' }
  },
  {
    id: 'bc-1',
    type: PipelineNodeType.VULCAN_BOUNDED_CONTEXT,
    position: { x: 50, y: 350 },
    data: { domainName: 'Order_Domain' },
  },
  {
    id: 'broker-1',
    type: PipelineNodeType.VULCAN_EVENT_BROKER,
    position: { x: 350, y: 350 },
    data: { eventName: 'OrderPlaced' },
  },
  {
    id: 'bc-2',
    type: PipelineNodeType.VULCAN_BOUNDED_CONTEXT,
    position: { x: 600, y: 350 },
    data: { domainName: 'Inventory_Domain' },
  },
  {
    id: 'db-shared',
    type: PipelineNodeType.VULCAN_SHARED_DATABASE,
    position: { x: 350, y: 500 },
    data: {},
  },
  {
    id: 'msi-1',
    type: PipelineNodeType.MULTISPECTRAL_CONDITIONING,
    position: { x: 50, y: 550 },
    data: {
      spectralTargets: [
        { target: 'Chlorophyll A', wavelength: 430, fwhm: 20 },
        { target: 'Cyan', wavelength: 490, fwhm: 10 }
      ]
    }
  },
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
  { id: 'e1-msi', source: 'base-1', target: 'msi-1', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'emsi-style', source: 'msi-1', target: 'param-style', animated: true, style: { stroke: '#ef4444' } },
  { id: 'e1-persona', source: 'base-1', target: 'persona-1', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'epersona-style', source: 'persona-1', target: 'param-style', animated: true, style: { stroke: '#f59e0b' } },
  { id: 'e1-3', source: 'base-1', target: 'param-lighting', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e2-4', source: 'param-style', target: 'output-1', animated: true, style: { stroke: '#a855f7' } },
  { id: 'e3-4', source: 'param-lighting', target: 'output-1', animated: true, style: { stroke: '#a855f7' } },
];

/**
 * React Component representing the interactive node-based canvas.
 * @param {object} props - Component properties.
 * @param {function} props.onExecuteGraph - Callback function triggered when the pipeline is executed.
 * @returns {JSX.Element} The rendered React component.
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
                if (n.type === PipelineNodeType.MULTISPECTRAL_CONDITIONING) return  '#ef4444';
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
