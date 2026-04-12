/// file: components/Tooltip.tsx ///
import React from 'react';

/**
 * Interface defining the properties for the Tooltip component.
 * @interface TooltipProps
 * @property {string} text - The informational text to display inside the tooltip hover state.
 * @property {React.ReactNode} children - The target DOM elements wrapped by the tooltip.
 * @property {'top' | 'bottom' | 'left' | 'right'} [position] - The spatial orientation of the tooltip relative to its children.
 * @property {string} [className] - Optional Tailwind classes to extend the tooltip's container styling.
 */
interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * A utility component that renders a stylized, directional tooltip on hover.
 * Encapsulates contextual hints for UI elements across the canvas without cluttering the layout.
 *
 * @param {TooltipProps} props - The configuration parameters for the tooltip.
 * @returns {JSX.Element} The rendered Tooltip component wrapping the provided children.
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
