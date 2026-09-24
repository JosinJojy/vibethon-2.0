'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { eventConfig } from '@/content/event';
import { assets } from '@/content/assets';

export function AboutBriefing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="about" className="w-full bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        
        {/* CSS Grid for Mobile vs Desktop ordering */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
          
          {/* Header & First Paragraph */}
          <div className="md:col-start-7 md:col-span-6 md:row-start-1 mb-8 md:mb-0">
            <h2 className="font-bebas text-[clamp(40px,5.5vw,80px)] leading-[0.95] tracking-tight text-foreground uppercase mb-6 md:mb-8">
              The Professor&apos;s Briefing
            </h2>
            <p className="font-sans text-base md:text-[17px] leading-relaxed text-muted max-w-[62ch]">
              VIBETHON 2.0 is an 8-hour, on-site vibe coding hackathon organized by {eventConfig.organizer.name} at {eventConfig.organizer.institution}, {eventConfig.organizer.city}. Build with modern AI tools while demonstrating your own technical understanding, originality, problem-solving and product decisions.
            </p>
          </div>

          {/* Portrait Asset */}
          <div className="md:col-start-1 md:col-span-5 md:row-start-1 md:row-span-2 flex justify-center md:justify-start relative mb-12 md:mb-0 min-h-[300px]">
            {/* Schematic / Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-red)_0%,_transparent_60%)] opacity-5 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {assets.professor.available && assets.professor.src ? (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-[360px] md:max-w-none h-[360px] md:h-[560px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={assets.professor.src} 
                  alt="Illustration of the Professor from Money Heist" 
                  className="w-full h-full object-contain object-bottom"
                />
              </motion.div>
            ) : (
              <div className="w-full h-[360px] md:h-[560px] flex items-center justify-center border border-border-subtle bg-surface">
                <div className="w-32 h-32 border border-accent-red/20 rotate-45 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent-red/10 rotate-12" />
                </div>
              </div>
            )}
          </div>

          {/* Remaining Copy */}
          <div className="md:col-start-7 md:col-span-6 md:row-start-2 flex flex-col">
            <p className="font-sans text-base md:text-[17px] leading-relaxed text-muted max-w-[62ch] mb-8">
              AI can accelerate the work. Your team still owns the thinking, the decisions and the final product.
            </p>
            
            <div className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-foreground flex flex-wrap gap-4 uppercase mb-12">
              <span className="px-3 py-1.5 border border-border-subtle rounded-sm">{eventConfig.durationHours} hours</span>
              <span className="px-3 py-1.5 border border-border-subtle rounded-sm">{eventConfig.mode}</span>
              <span className="px-3 py-1.5 border border-border-subtle rounded-sm">AI-assisted building</span>
            </div>
            
            <div className="border-t border-border-subtle pt-8">
              <h3 className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted uppercase mb-4">
                The crew behind the mission
              </h3>
              <p className="font-sans text-base leading-relaxed text-foreground max-w-[62ch]">
                {eventConfig.organizer.name} is the coding club at {eventConfig.organizer.institution}, {eventConfig.organizer.city}, and the organizer of {eventConfig.brand.name} {eventConfig.brand.edition}.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
