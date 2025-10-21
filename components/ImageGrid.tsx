import React from 'react';
import type { GeneratedImage } from '../types';
import LoadingSpinner from './LoadingSpinner';
import Tooltip from './Tooltip';

/**
 * Props for the ImageGrid component.
 * @property images - An array of generated images to display.
 * @property isLoading - A boolean indicating whether the images are currently being loaded.
 * @property onRateImage - A function to call when an image is rated.
 * @property error - An error message to display if an error occurred, or null if there was no error.
 */
interface ImageGridProps {
  images: GeneratedImage[];
  isLoading: boolean;
  onRateImage: (imageId: string, rating: number) => void;
  error: string | null;
}

/**
 * A component that displays a welcome message when there are no images to display.
 * @returns {JSX.Element} The rendered component.
 */
const WelcomeMessage: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h2 className="text-2xl font-bold text-slate-200">Welcome to the Lab</h2>
    <p className="mt-2 max-w-md text-slate-400">
      Start your creative journey by defining a subject and choosing parameters on the left. Your generated images will appear here.
    </p>
  </div>
);

/**
 * A component that displays an error message.
 * @param {object} props - The props for the component.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The rendered component.
 */
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-red-900/20 rounded-lg border-2 border-dashed border-red-500/50 text-red-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <h2 className="text-2xl font-bold text-red-200">Generation Failed</h2>
    <p className="mt-2 max-w-md text-red-300">{message}</p>
  </div>
);

/**
 * A component that displays a star icon for rating.
 * @param {object} props - The props for the component.
 * @param {boolean} props.filled - Whether the star should be filled.
 * @param {() => void} props.onClick - The function to call when the star is clicked.
 * @returns {JSX.Element} The rendered component.
 */
const StarIcon: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 cursor-pointer transition-colors ${filled ? 'text-amber-400' : 'text-slate-500 hover:text-amber-300'}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

/**
 * A component that displays a single image card with its prompt and rating.
 * @param {object} props - The props for the component.
 * @param {GeneratedImage} props.image - The image to display.
 * @param {(rating: number) => void} props.onRate - The function to call when the image is rated.
 * @returns {JSX.Element} The rendered component.
 */
const ImageCard: React.FC<{ image: GeneratedImage; onRate: (rating: number) => void }> = ({ image, onRate }) => (
  <div className="group relative overflow-hidden rounded-lg bg-slate-800 shadow-lg border border-slate-700/50 transition-all duration-300 hover:shadow-cyan-500/20 hover:border-brand-cyan/50">
    <img src={image.src} alt={image.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm text-slate-100">{image.variation}</p>
          <p className="text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate" title={image.prompt}>{image.prompt}</p>
        </div>
        <Tooltip text="Rate this image. Your ratings are used by the Style Blueprint Generator.">
          <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                filled={image.rating ? image.rating > i : false}
                onClick={() => onRate(i + 1)}
              />
            ))}
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
);

/**
 * A component that displays a grid of generated images.
 * @param {ImageGridProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, onRateImage, error }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (images.length === 0) {
    return <WelcomeMessage />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {images.map(image => (
        <ImageCard key={image.id} image={image} onRate={(rating) => onRateImage(image.id, rating)} />
      ))}
    </div>
  );
};

export default ImageGrid;
