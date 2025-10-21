import React from 'react';

/**
 * A component that displays the header of the application.
 * @returns {JSX.Element} The rendered component.
 */
const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto flex items-center max-w-7xl px-4">
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
    </header>
  );
};

export default Header;