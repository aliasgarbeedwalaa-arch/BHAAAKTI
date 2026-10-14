import React, { useEffect } from 'react';
import { PhotoVisual } from '../types';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface PhotoLightboxProps {
  photos: PhotoVisual[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  activeIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % photos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || photos.length === 0) return null;

  const current = photos[activeIndex] || photos[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center justify-between text-slate-300 max-w-6xl mx-auto w-full z-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Camera className="w-4 h-4" />
          <span>High-Resolution Match Photography</span>
          <span className="text-slate-500 font-normal">
            ({activeIndex + 1} of {photos.length})
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all hover:scale-105"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4 overflow-hidden">
        <img
          src={current.url}
          alt={current.caption}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-slate-800/80"
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => onNavigate((activeIndex + 1) % photos.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Caption */}
      <div className="max-w-3xl mx-auto text-center px-4 py-2">
        <p className="text-sm sm:text-base text-slate-200 font-medium">
          {current.caption}
        </p>
        {current.credit && (
          <p className="text-xs text-amber-400/80 mt-1">
            Photo Credit: {current.credit}
          </p>
        )}
      </div>
    </div>
  );
};
