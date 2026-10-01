'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { prizes } from '@/content/event';
import BorderGlow from '@/components/effects/BorderGlow';

export function PrizeReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // Default true to prevent SSR hydration mismatch jumps on x

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={sectionRef} id="prizes" className="relative w-full bg-[#141416] py-24 md:py-32 overflow-hidden">
      {/* Decorative Door Panels */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
        <motion.div 
          className="w-1/2 h-full bg-[#1A1A1D] border-r border-border-subtle"
          initial={shouldReduceMotion ? { x: 0, opacity: 0.15 } : { x: 0, opacity: 0.8 }}
          animate={isInView ? { x: isMobile || shouldReduceMotion ? 0 : '-28%', opacity: 0.15 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div 
          className="w-1/2 h-full bg-[#1A1A1D] border-l border-border-subtle"
          initial={shouldReduceMotion ? { x: 0, opacity: 0.15 } : { x: 0, opacity: 0.8 }}
          animate={isInView ? { x: isMobile || shouldReduceMotion ? 0 : '28%', opacity: 0.15 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 flex flex-col items-center text-center">
        <h2 className="font-mono text-[12px] tracking-[0.12em] text-muted mb-4 uppercase">
          The vault holds
        </h2>
        
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="prize-total font-display text-[clamp(72px,13vw,176px)] leading-none tracking-tight text-foreground">
            {prizes.total}
          </div>
          <div className="font-sans text-sm md:text-base font-semibold tracking-wider text-accent-red mt-4 uppercase">
            Total Prize Pool
          </div>
        </motion.div>

        {/* Prize Split Breakdown */}
        <BorderGlow className="glass-panel prize-breakdown mt-20 md:mt-24 w-full max-w-4xl" contentClassName="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          
          <div className="flex-1 py-8 md:py-10 flex flex-row md:flex-col items-center justify-between md:justify-center px-4 md:px-0">
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted uppercase md:mb-4">First</span>
            <span className="font-display text-4xl md:text-6xl text-foreground">{prizes.first}</span>
          </div>
          
          <div className="flex-1 py-8 md:py-10 flex flex-row md:flex-col items-center justify-between md:justify-center px-4 md:px-0">
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted uppercase md:mb-4">Second</span>
            <span className="font-display text-3xl md:text-5xl text-foreground">{prizes.second}</span>
          </div>
          
          <div className="flex-1 py-8 md:py-10 flex flex-row md:flex-col items-center justify-between md:justify-center px-4 md:px-0">
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted uppercase md:mb-4">Third</span>
            <span className="font-display text-3xl md:text-5xl text-foreground">{prizes.third}</span>
          </div>
          
        </BorderGlow>
      </div>
    </section>
  );
}
