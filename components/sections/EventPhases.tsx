'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { phaseCopy } from '@/content/event';

function parseFormattedText(text: string) {
  return text.split('\n\n').map((paragraph, i) => (
    <p key={i} className="font-sans text-base md:text-[17px] leading-relaxed text-muted max-w-[62ch] mb-4 last:mb-0">
      {paragraph.split(/\*\*(.*?)\*\*/g).map((part, j) => 
        j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
      )}
    </p>
  ));
}

export function EventPhases() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="phases" className="w-full py-28 md:py-40">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">

        <div className="mb-14 md:mb-20">
          <h2 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[0.95] text-foreground uppercase mb-4">
            Inside the eight hours
          </h2>
          <p className="font-sans text-base md:text-lg text-muted">
            Three phases. One product built by your team.
          </p>
        </div>

        <ol className="border-t border-white/10">
          {phaseCopy.map((phase, i) => (
            <motion.li
              key={phase.number}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="phase-row group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-10 md:py-12 border-b border-white/10"
            >
              <span className="md:col-span-2 font-display text-5xl md:text-7xl leading-none text-white/20 group-hover:text-accent-red transition-colors duration-300">
                {phase.number}
              </span>
              <h3 className="md:col-span-4 font-sans text-xl md:text-2xl font-semibold text-foreground md:pt-2">
                {phase.title}
              </h3>
              <div className="md:col-span-6 md:pt-2">
                {phase.aiBadge && (
                  <span className={`inline-block font-mono text-[10px] md:text-[11px] font-bold tracking-[0.16em] mb-3 uppercase ${phase.aiBadge.includes('NO') ? 'text-accent-red' : 'text-foreground/70'}`}>
                    {phase.aiBadge}
                  </span>
                )}
                <div className="phase-description">
                  {parseFormattedText(phase.description)}
                </div>
              </div>
            </motion.li>

          ))}
        </ol>

      </div>
    </section>
  );
}
