'use client';

import { useState, useRef, useEffect } from 'react';
import { GalleryItem } from '@/content/assets';
import { Lightbox } from './Lightbox';

export function Gallery({ images }: { images: GalleryItem[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for mobile pagination
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || images.length === 0) return;

    const handleScroll = () => {
      const scrollX = container.scrollLeft;
      const itemWidth = container.clientWidth * 0.86; // 86vw
      const newIndex = Math.round(scrollX / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, images.length]);

  const scrollTo = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const itemWidth = container.clientWidth * 0.86;
    container.scrollTo({
      left: index * itemWidth,
      behavior: prefersReduced ? 'auto' : 'smooth'
    });
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    if (images.length === 0) return;
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-64 border border-border-subtle bg-surface flex flex-col items-center justify-center text-center p-8">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-muted mb-4" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p className="font-sans text-muted">Glimpses from 2025 will be added soon</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-12 auto-rows-[240px] lg:auto-rows-[320px] gap-3">
          {images.map((img, i) => {
            let colSpan = "col-span-4";
            let rowSpan = "row-span-1";
            
            if (i === 0) {
              colSpan = "col-span-8";
              rowSpan = "row-span-2";
            } else if (i > 2) {
              // remaining in 3 equal cols means col-span-4 (since 12/3 = 4)
              colSpan = "col-span-4";
            }

            return (
              <button
                key={img.id}
                className={`${colSpan} ${rowSpan} relative group focus:outline-none focus:ring-4 focus:ring-accent-red focus:ring-offset-2 focus:ring-offset-background overflow-hidden`}
                onClick={() => openLightbox(i)}
                aria-label={`View photo: ${img.alt || img.caption}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
                <div className="absolute inset-0 bg-[#3B2C24]/10 mix-blend-color pointer-events-none" /> {/* Mild consistent grade */}
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Snap */}
        <div className="md:hidden flex flex-col">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 pb-4"
          >
            {images.map((img, i) => (
              <button
                key={img.id}
                className="relative snap-start flex-none w-[86vw] aspect-4/3 focus:outline-none focus:ring-2 focus:ring-accent-red"
                onClick={() => openLightbox(i)}
                aria-label={`View photo: ${img.alt || img.caption}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#3B2C24]/10 mix-blend-color pointer-events-none" />
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="font-mono text-xs text-muted tracking-widest uppercase">
              {currentIndex + 1} / {images.length}
            </p>
            <div className="flex gap-2">
              <button 
                className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded text-foreground focus:outline-none focus:ring-2 focus:ring-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => scrollTo(currentIndex - 1)}
                disabled={currentIndex === 0}
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button 
                className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded text-foreground focus:outline-none focus:ring-2 focus:ring-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => scrollTo(currentIndex + 1)}
                disabled={currentIndex === images.length - 1}
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          
          <p className="font-sans text-sm text-muted mt-4 min-h-[3rem]">
            {images[currentIndex]?.caption}
          </p>
        </div>
      </div>

      {lightboxOpen && images.length > 0 && (
        <Lightbox 
          images={images} 
          initialIndex={currentIndex} 
          onClose={() => {
            setLightboxOpen(false);
            // Optional: return focus to trigger
          }} 
        />
      )}
    </>
  );
}
