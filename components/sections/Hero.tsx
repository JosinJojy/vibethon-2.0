'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { assets } from '@/content/assets';
import { eventConfig } from '@/content/event';
import { formatClock, formatDotDate } from '@/lib/dates';
import { onReveal } from '@/lib/reveal';
import { Countdown } from './Countdown';
import { EventActions } from './EventActions';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => onReveal(() => setRevealed(true)), []);

  const enter = (delay: number, y = 18) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: revealed ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay + 0.8, ease: EASE },
  });

  const { brand, organizer } = eventConfig;

  return (
    <section ref={sectionRef} id="hero" className="hero">
      <motion.div className="hero-backdrop" style={{ y: backdropY }} aria-hidden="true">
        <motion.div
          className="hero-backdrop-media"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.2 }}
          animate={revealed ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: reduce ? 0 : 2.6, ease: EASE }}
        >
          {assets.heroMobile.available && assets.heroDesktop.available && (
            <picture>
              <source media="(min-width: 768px)" srcSet={assets.heroDesktop.src || ''} />
              <img src={assets.heroMobile.src || ''} alt="" decoding="sync" fetchPriority="high" />
            </picture>
          )}
        </motion.div>
      </motion.div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-shell">
        <motion.div className="hero-center" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p {...enter(0.05)} className="hero-kicker font-mono">
            <a href="https://www.encide.in" target="_blank" rel="noopener noreferrer" className="text-accent-red hover:underline decoration-accent-red underline-offset-4">
              {organizer.name}
            </a> presenta
          </motion.p>

          <h1 className="hero-title font-display" aria-label={`${brand.name} ${brand.edition}`}>
            <span className="hero-title-word" aria-hidden="true">
              {brand.name.split('').map((char, i) => (
                <span key={i} className="hero-title-mask">
                  <motion.span
                    className="hero-title-char"
                    initial={{ y: reduce ? 0 : '108%', opacity: 0 }}
                    animate={revealed ? { y: 0, opacity: 1 } : undefined}
                    transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 0.95 + i * 0.055, ease: EASE }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
            <motion.span
              className="hero-stamp"
              aria-hidden="true"
              initial={{ opacity: 0, scale: reduce ? 1 : 2.4, rotate: reduce ? -9 : -22 }}
              animate={revealed ? { opacity: 1, scale: 1, rotate: -9 } : undefined}
              transition={reduce ? { duration: 0 } : { delay: 1.65, type: 'spring', stiffness: 520, damping: 24 }}
            >
              {brand.edition}
            </motion.span>
          </h1>

          <motion.p {...enter(0.75)} className="hero-es font-serif italic">La casa del código</motion.p>
          <motion.p {...enter(0.85)} className="hero-sub font-mono">
            {eventConfig.durationHours}-hour vibe coding hackathon
            <span aria-hidden="true">/</span>
            {formatDotDate(eventConfig.startsAt)}, {formatClock(eventConfig.startsAt)} IST
            <span aria-hidden="true">/</span>
            {organizer.shortName}
          </motion.p>
          <motion.div {...enter(0.95)} className="hero-cta">
            <EventActions className="hero-actions" />
          </motion.div>
        </motion.div>

        <motion.div {...enter(1.1, 0)} className="hero-bottom">
          <Countdown target={eventConfig.countdownTarget} className="countdown--inline" />
        </motion.div>
      </div>
    </section>
  );
}
