/// file: components/ImageGrid.tsx ///
import React from 'react';
import type { GeneratedImage, JustifiedUncertaintyReport } from '../types';
import LoadingSpinner from './LoadingSpinner';
import Tooltip from './Tooltip';

/**
 * Interface defining the properties for the ImageGrid component.
 * @interface ImageGridProps
 * @property {GeneratedImage[]} images - An array of generated images to display in the grid.
 * @property {boolean} isLoading - A flag indicating whether the generative API request is still processing.
 * @property {(imageId: string, rating: number) => void} onRateImage - Callback executed when a user assigns a rating to a specific image.
 * @property {string | null} error - An error message string to display if the generation request fails, or null if successful.
 */
interface ImageGridProps {
  images: GeneratedImage[];
  jur?: JustifiedUncertaintyReport;
  isLoading: boolean;
  onRateImage: (imageId: string, rating: number) => void;
  error: string | null;
}

/**
 * A component that renders a responsive grid layout of generated images.
 * Facilitates visual review and interactive rating of the pluralistic aesthetic outputs derived from the DAG pipeline.
 * Manages loading states, error boundaries, and individual image rendering.
 *
 * @param {ImageGridProps} props - The configuration parameters for the grid.
 * @returns {JSX.Element | null} The rendered ImageGrid component, or null if no active data and not loading/error.
 */
const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, onRateImage, error, jur }) => {
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-slate-800/30 rounded-xl border border-slate-700/50 shadow-inner">
         <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-slate-800/30 rounded-xl border border-slate-700/50 p-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-medium text-slate-200 mb-2">Generation Failed</h3>
        <p className="text-slate-400 text-center max-w-md">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-slate-800/30 rounded-xl border border-slate-700/50 text-slate-500 border-dashed">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg font-medium">Your canvas awaits.</p>
        <p className="text-sm opacity-75 mt-2">Configure a base prompt and parameters to begin.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {images.map((img) => (
        <div key={img.id} className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 shadow-md hover:shadow-brand-cyan/20 transition-all duration-300 transform hover:-translate-y-1">
          <div className="aspect-square w-full bg-slate-900 relative">
            <img
              src={img.src}
              alt={img.prompt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="p-4 relative">
             <div className="mb-4">
              <span className="inline-block px-2.5 py-1 bg-slate-700/80 text-brand-cyan text-xs font-semibold rounded-full border border-slate-600 mb-2">
                {img.variation}
              </span>
              <Tooltip text={img.prompt} position="top">
                <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed cursor-help">
                  {img.prompt}
                </p>
              </Tooltip>
            </div>

            <div className="mt-auto pt-3 border-t border-slate-700/50 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Rate Aesthetic</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onRateImage(img.id, star)}
                    className={`focus:outline-none transition-transform hover:scale-110 ${
                      (img.rating || 0) >= star
                        ? 'text-yellow-400'
                        : 'text-slate-600 hover:text-yellow-200'
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
