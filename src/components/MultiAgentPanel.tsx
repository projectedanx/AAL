/// file: components/MultiAgentPanel.tsx ///
import React, { useState, useEffect, useRef } from 'react';
import { AgentRole, AgentInstance, AgentMessage } from '../types';

interface MultiAgentPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_AGENTS: AgentInstance[] = [
  { id: 'agent-1', role: AgentRole.RAG_REFLECTOR, name: 'RAG Reflector', status: 'idle' },
  { id: 'agent-2', role: AgentRole.VIPER, name: 'V.I.P.E.R', status: 'idle' },
  { id: 'agent-3', role: AgentRole.ALETHEON, name: 'ALETHEON', status: 'idle' },
  { id: 'agent-4', role: AgentRole.KUT, name: 'KUT', status: 'idle' },
  { id: 'agent-5', role: AgentRole.VULCAN, name: 'VULCAN', status: 'idle' },
  { id: 'agent-6', role: AgentRole.CIPHER, name: 'CIPHER', status: 'idle' },
  { id: 'agent-7', role: AgentRole.KIRA_7, name: 'KIRA-7', status: 'idle' },
];

/**
 * A segregated interface for interacting directly with Sovereign Agents, keeping agent configurations separate from the visual node canvas.
 *
 * @param { isOpen, onClose } - The React props for the component.
 * @returns The rendered React element.
 *
 */
const MultiAgentPanel: React.FC<MultiAgentPanelProps> = ({ isOpen, onClose }) => {
  const [activeAgentId, setActiveAgentId] = useState<string>(DEFAULT_AGENTS[0].id);
  const [messages, setMessages] = useState<Record<string, AgentMessage[]>>({});
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize empty message arrays for all agents
  useEffect(() => {
    const initialMessages: Record<string, AgentMessage[]> = {};
    DEFAULT_AGENTS.forEach(agent => {
      initialMessages[agent.id] = [{
        id: crypto.randomUUID(),
        agentId: agent.id,
        sender: 'system',
        content: `Persona ${agent.name} initialized. Awaiting directives...`,
        timestamp: Date.now()
      }];
    });
    setMessages(initialMessages);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeAgentId, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: AgentMessage = {
      id: crypto.randomUUID(),
      agentId: activeAgentId,
      sender: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => ({
      ...prev,
      [activeAgentId]: [...(prev[activeAgentId] || []), newUserMsg]
    }));

    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      const activeAgent = DEFAULT_AGENTS.find(a => a.id === activeAgentId);
      let responseContent = `Acknowledged. Executing protocol bounds.`;

      if (activeAgent?.role === AgentRole.RAG_REFLECTOR) {
          responseContent = `Retrieval query initiated. Re-ranking confidence: 0.92. Context validated against vector database.`;
      } else if (activeAgent?.role === AgentRole.VIPER) {
          responseContent = `[∇] Adjectival bounds exceeded. Enforcing Hardware-Forced Physicality. Semantic Saponification averted.`;
      } else if (activeAgent?.role === AgentRole.VULCAN) {
          responseContent = `[⊗] Betti-1 Topological Loop Detected. Mereological Route compromised. Golden Scar Protocol engaged.`;
      }

      const newAgentMsg: AgentMessage = {
        id: crypto.randomUUID(),
        agentId: activeAgentId,
        sender: 'agent',
        content: responseContent,
        timestamp: Date.now()
      };

      setMessages(prev => ({
        ...prev,
        [activeAgentId]: [...(prev[activeAgentId] || []), newAgentMsg]
      }));
    }, 1200);
  };

  if (!isOpen) return null;

  const activeAgent = DEFAULT_AGENTS.find(a => a.id === activeAgentId);
  const currentMessages = messages[activeAgentId] || [];

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-slate-800 border-l border-slate-700 shadow-2xl z-50 flex flex-col transition-transform duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
        <h2 className="text-lg font-bold text-slate-100 flex items-center">
          <svg className="w-5 h-5 mr-2 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Sovereign Agent Control
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Agent Selector (Tabs) */}
      <div className="flex overflow-x-auto bg-slate-900 border-b border-slate-700 no-scrollbar">
        {DEFAULT_AGENTS.map(agent => (
          <button
            key={agent.id}
            onClick={() => setActiveAgentId(agent.id)}
            className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeAgentId === agent.id
                ? 'border-brand-cyan text-brand-cyan bg-slate-800'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {agent.name}
          </button>
        ))}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-slate-500 mb-1">
              {msg.sender === 'user' ? 'Operator' : msg.sender === 'system' ? 'System' : activeAgent?.name}
            </span>
            <div className={`p-3 rounded-lg max-w-[85%] text-sm ${
              msg.sender === 'user' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' :
              msg.sender === 'system' ? 'bg-slate-700 text-slate-300 font-mono text-xs' :
              'bg-slate-900 text-slate-200 border border-slate-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Directive for ${activeAgent?.name}...`}
            className="flex-1 bg-slate-800 text-slate-200 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-cyan"
          />
          <button
            onClick={handleSendMessage}
            className="bg-brand-cyan hover:bg-cyan-600 text-slate-900 font-bold p-2 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiAgentPanel;
