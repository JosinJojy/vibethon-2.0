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
    <section ref={sectionRef} id="about" className="w-full py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">

        {assets.professor.available && assets.professor.src && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="briefing-portrait md:col-span-5 h-[380px] md:h-[600px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.professor.src}
              alt="Illustration of the Professor from Money Heist"
              className="w-full h-full object-contain object-bottom"
            />
          </motion.div>
        )}

        <div className="md:col-start-7 md:col-span-6">
          <h2 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[0.95] text-foreground uppercase mb-8">
            The Professor&apos;s Briefing
          </h2>
          <p className="font-sans text-base md:text-[17px] leading-relaxed text-muted max-w-[58ch]">
            VIBETHON 2.0 is an 8-hour, on-site vibe coding hackathon organized by {eventConfig.organizer.name} at {eventConfig.organizer.institution}, {eventConfig.organizer.city}. Build with modern AI tools while demonstrating your own technical understanding, originality, problem-solving and product decisions.
          </p>
          <p className="font-serif italic text-[22px] md:text-[26px] leading-snug text-foreground mt-10 max-w-[36ch]">
            AI can accelerate the work. Your team still owns the thinking, the decisions and the final product.
          </p>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-mono text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-accent-red uppercase mb-3">
              The crew behind the mission
            </h3>
            <p className="font-sans text-base leading-relaxed text-muted max-w-[58ch]">
              {eventConfig.organizer.name} is the coding club at {eventConfig.organizer.institution}, {eventConfig.organizer.city}, and the organizer of {eventConfig.brand.name} {eventConfig.brand.edition}.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
