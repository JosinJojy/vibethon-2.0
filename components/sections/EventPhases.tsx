'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { phaseCopy } from '@/content/event';
import BorderGlow from '@/components/effects/BorderGlow';

export function EventPhases() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="phases" className="w-full bg-[#141416] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        
        <div className="mb-16 md:mb-24">
          <h2 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[0.95] tracking-tight text-foreground uppercase mb-4">
            Inside the eight hours
          </h2>
          <p className="font-sans text-base md:text-lg text-muted">
            Three phases. One product built by your team.
          </p>
        </div>

        <div className="phase-list flex flex-col border-t border-border-subtle group/list">
          {phaseCopy.map((phase, i) => (
            <motion.div
              key={phase.number}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="w-full"
            >
              <BorderGlow className="phase-row glass-panel group/row" contentClassName="flex flex-col md:grid md:grid-cols-12 md:gap-6">
              {/* Mobile: Number + Title. Desktop: separated */}
              <div className="flex items-baseline gap-4 md:col-span-2 md:block mb-4 md:mb-0">
                <span className="font-display text-5xl md:text-7xl text-muted group-hover/row:text-accent-red transition-colors duration-300">
                  {phase.number}
                </span>
                <h3 className="font-sans text-xl md:hidden font-semibold text-foreground">
                  {phase.title}
                </h3>
              </div>

              {/* Desktop Title */}
              <div className="hidden md:flex flex-col justify-start md:col-span-4">
                <h3 className="font-sans text-2xl font-semibold text-foreground">
                  {phase.title}
                </h3>
              </div>

              {/* Description and Badge */}
              <div className="md:col-span-6 flex flex-col items-start">
                {phase.aiBadge && (
                  <span className={`inline-block font-mono text-[10px] md:text-[11px] tracking-[0.1em] px-2 py-1 mb-4 border uppercase ${
                    phase.aiBadge.includes('NO') 
                      ? 'border-accent-red text-accent-red bg-accent-red/5' 
                      : 'border-muted text-foreground'
                  }`}>
                    {phase.aiBadge}
                  </span>
                )}
                <p className="font-sans text-base md:text-[17px] leading-relaxed text-muted max-w-[62ch]">
                  {phase.description}
                </p>
              </div>

              </BorderGlow>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
