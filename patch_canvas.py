import re

with open('components/NodeCanvas.tsx', 'r') as f:
    content = f.read()

vulcan_nodes = """
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
"""

content = re.sub(
    r'(const nodeTypes = \{)',
    vulcan_nodes + r'\n\1',
    content
)

node_types_addition = """  [PipelineNodeType.VULCAN_BOUNDED_CONTEXT]: BoundedContextNode,
  [PipelineNodeType.VULCAN_EVENT_BROKER]: EventBrokerNode,
  [PipelineNodeType.VULCAN_SHARED_DATABASE]: SharedDatabaseNode,"""

content = re.sub(
    r'(const nodeTypes = \{)',
    r'\1\n' + node_types_addition,
    content
)


initial_nodes_addition = """  {
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
  },"""

content = re.sub(
    r'(const initialNodes: Node\[\] = \[)',
    r'\1\n' + initial_nodes_addition,
    content
)

with open('components/NodeCanvas.tsx', 'w') as f:
    f.write(content)
