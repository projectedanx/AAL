/// file: components/LoadingSpinner.tsx ///
import React from 'react';

/**
 * A component that displays an animated loading spinner.
 * Used to indicate asynchronous generative processes mapping via the Gemini API.
 * @returns {JSX.Element} The rendered LoadingSpinner component.
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-cyan"></div>
      <p className="mt-4 text-slate-300 text-lg font-semibold">Brewing visual magic...</p>
      <p className="mt-1 text-slate-400 text-sm">This can take a moment, especially for multiple images.</p>
    </div>
  );
};

export default LoadingSpinner;
