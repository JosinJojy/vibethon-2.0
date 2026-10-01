'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { prizes } from '@/content/event';

const tiers = [
  { label: 'First', amount: prizes.first },
  { label: 'Second', amount: prizes.second },
  { label: 'Third', amount: prizes.third },
];

export function PrizeReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="prizes" className="w-full py-28 md:py-40">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 flex flex-col items-center text-center">
        <h2 className="font-mono text-[12px] font-bold tracking-[0.24em] text-muted mb-6 uppercase">
          The vault holds
        </h2>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="prize-total font-display text-[clamp(72px,13vw,176px)] leading-none text-foreground">
            {prizes.total}
          </div>
          <div className="font-mono text-[12px] font-bold tracking-[0.24em] text-accent-red mt-6 uppercase">
            Total prize pool
          </div>
        </motion.div>

        <dl className="prize-tiers mt-20 md:mt-24 w-full max-w-3xl grid grid-cols-3">
          {tiers.map(tier => (
            <div key={tier.label} className="prize-tier">
              <dt className="font-mono text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-muted uppercase">{tier.label}</dt>
              <dd className="font-display text-[28px] md:text-5xl text-foreground mt-3">{tier.amount}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
