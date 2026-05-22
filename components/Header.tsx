/// file: components/Header.tsx ///
import React from 'react';

interface HeaderProps {
  onToggleAgentPanel?: () => void;
}

/**
 * A component that displays the application header.
 * Provides consistent branding and navigation anchoring across the topological canvas.
 * @param {HeaderProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header: React.FC<HeaderProps> = ({ onToggleAgentPanel }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between max-w-7xl px-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
            <path d="M12 12l-2.83 2.83"></path>
            <path d="M12 12l2.83 2.83"></path>
            <path d="M12 12l2.83-2.83"></path>
            <path d="M12 12l-2.83-2.83"></path>
            <path d="M15 15l-3 3-3-3 3-3 3 3z"></path>
          </svg>
          <h1 className="text-xl font-bold text-slate-100 tracking-wider">Aesthetic Alchemy Lab</h1>
        </div>

        {onToggleAgentPanel && (
          <button
            onClick={onToggleAgentPanel}
            className="flex items-center text-sm bg-slate-800 hover:bg-slate-700 text-brand-cyan px-3 py-1.5 rounded-md border border-brand-cyan/30 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Sovereign Agents
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
