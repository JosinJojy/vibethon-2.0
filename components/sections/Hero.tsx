'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { assets } from '@/content/assets';
import { eventConfig } from '@/content/event';
import { Countdown } from './Countdown';
import { EventActions } from './EventActions';

export function Hero() {
  const mottoText = eventConfig.motto || 'Official motto coming soon';
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 24]);

  useEffect(() => {
    // Check if intro should be skipped
    let hasPlayed = false;
    try {
      hasPlayed = sessionStorage.getItem('vibethon-intro-v1') === 'true';
    } catch {
      hasPlayed = true;
    }
    
    if (hasPlayed || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.location.hash.length > 1 || window.scrollY >= 10) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRevealed(true);
      return;
    }

    const handleReveal = () => setRevealed(true);
    window.addEventListener('vibethon-reveal', handleReveal);
    
    // Safety fallback
    const t = setTimeout(handleReveal, 2200);

    return () => {
      window.removeEventListener('vibethon-reveal', handleReveal);
      clearTimeout(t);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative flex flex-col items-center justify-center min-h-[100svh] pt-[96px] pb-12 overflow-hidden bg-background"
    >
      {/* Background Images with Parallax */}
      <motion.div className="absolute inset-0 z-0 select-none" style={{ y: yParallax }}>
        {assets.heroMobile.available && assets.heroDesktop.available && (
          <picture>
            <source 
              media="(min-width: 768px)" 
              srcSet={assets.heroDesktop.src || ''} 
            />
            <img 
              src={assets.heroMobile.src || ''} 
              alt="" 
              className="w-full h-full object-cover object-center opacity-40" 
              decoding="sync"
              fetchPriority="high"
            />
          </picture>
        )}
        {/* Dark overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {/* Subtle radial red glow - animated once over 8s */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-red)_0%,_transparent_70%)] mix-blend-overlay"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={revealed ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[1280px] px-5 md:px-8 mx-auto mt-auto mb-auto">
        <p className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-accent-red mb-4">
          ENCIDE PRESENTS
        </p>
        
        <motion.h1 
          className="font-bebas text-[clamp(50px,16vw,112px)] md:text-[clamp(96px,14vw,208px)] leading-[0.85] tracking-[-0.02em] text-foreground text-shadow-hero uppercase select-none"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {eventConfig.brand.name}
        </motion.h1>
        
        <motion.p 
          className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-foreground mt-4 mb-6 md:mb-8"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          {eventConfig.brand.edition} / {eventConfig.brand.year}
        </motion.p>
        
        <motion.div 
          className="max-w-[34ch] w-full min-h-[3rem] mb-8 md:mb-10 text-muted font-sans text-base md:text-lg text-balance"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {mottoText}
        </motion.div>
        
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          <Countdown target={eventConfig.countdownTarget} />
        </motion.div>
        
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
        >
          <EventActions className="mt-10 mb-12 md:mt-12 md:mb-16" />
        </motion.div>
        
        <motion.div 
          className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted flex flex-wrap justify-center gap-2 md:gap-4 uppercase"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
        >
          <span>{eventConfig.durationHours} HOURS</span>
          <span className="opacity-50">/</span>
          <span>{eventConfig.mode}</span>
          <span className="opacity-50">/</span>
          <span>{eventConfig.organizer.shortName}, {eventConfig.organizer.city}</span>
        </motion.div>
      </div>
    </section>
  );
}
