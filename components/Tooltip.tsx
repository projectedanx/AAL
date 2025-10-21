import React from 'react';

/**
 * Props for the Tooltip component.
 * @property text - The text to display in the tooltip.
 * @property children - The content that the tooltip is for.
 * @property position - The position of the tooltip relative to the content.
 * @property className - Additional classes to apply to the tooltip container.
 */
interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * A component that displays a tooltip when the user hovers over its content.
 * @param {TooltipProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top', className = '' }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };
  
  return (
    <div className={`relative group ${className}`}>
      {children}
      <span className={`absolute ${getPositionClasses()} w-max max-w-xs bg-slate-900 text-slate-200 border border-slate-700 text-xs rounded-md shadow-lg py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30`}>
        {text}
      </span>
    </div>
  );
};

export default Tooltip;