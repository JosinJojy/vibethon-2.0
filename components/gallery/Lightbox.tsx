'use client';

import { useEffect, useRef, useState } from 'react';
import { GalleryItem } from '@/content/assets';

interface LightboxProps {
  images: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  // Show dialog and trap focus
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      // Dialog natively handles Escape to close, but we need to trigger our onClose
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, onClose]);

  const handleCloseClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose(); // Close if clicked on backdrop
    }
  };

  const currentImage = images[index];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleCloseClick}
      className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-background/95 backdrop-blur-sm z-[100] text-foreground p-0 m-0 border-none open:flex flex-col items-center justify-center"
      aria-label={`Image ${index + 1} of ${images.length}: ${currentImage.caption}`}
    >
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex gap-4">
        <p className="hidden md:flex items-center font-mono text-xs tracking-widest uppercase mr-4">
          {index + 1} / {images.length}
        </p>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center bg-[#1A1A1D] rounded text-foreground focus:outline-none focus:ring-2 focus:ring-accent-red"
          aria-label="Close dialog"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative w-full max-w-[1280px] h-full max-h-[100svh] px-4 py-20 md:p-16 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[70vh] object-contain select-none"
          />
          <p className="mt-6 font-sans text-sm md:text-base text-center max-w-[600px]">
            {currentImage.caption}
          </p>
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="w-14 h-14 flex items-center justify-center bg-[#1A1A1D] rounded text-foreground disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-red"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="md:hidden font-mono text-xs tracking-widest w-16 text-center">
            {index + 1}/{images.length}
          </span>
          <button
            onClick={handleNext}
            disabled={index === images.length - 1}
            className="w-14 h-14 flex items-center justify-center bg-[#1A1A1D] rounded text-foreground disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-red"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  );
}
