'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import TechText from '@/components/effects/TechText';
import TextLoop from '@/components/effects/TextLoop';
import BorderGlow from '@/components/effects/BorderGlow';
import { assets } from '@/content/assets';
import { eventConfig } from '@/content/event';
import { Countdown } from './Countdown';
import { EventActions } from './EventActions';

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 30]);

  useEffect(() => {
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
    const timer = setTimeout(handleReveal, 2200);
    return () => {
      window.removeEventListener('vibethon-reveal', handleReveal);
      clearTimeout(timer);
    };
  }, []);

  const revealMotion = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: revealed ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={containerRef} id="hero" className="hero-stage relative overflow-hidden">
      <motion.div className="hero-backdrop absolute inset-0 select-none" style={{ y: yParallax }} aria-hidden="true">
        {assets.heroMobile.available && assets.heroDesktop.available && (
          <picture>
            <source media="(min-width: 768px)" srcSet={assets.heroDesktop.src || ''} />
            <img src={assets.heroMobile.src || ''} alt="" className="h-full w-full object-cover object-center" decoding="sync" fetchPriority="high" />
          </picture>
        )}
      </motion.div>
      <div className="hero-shell relative z-10 mx-auto w-full">
        <div className="hero-main">
          <motion.p {...revealMotion(0)} className="hero-kicker font-mono uppercase">
            ENCIDE PRESENTS <span aria-hidden="true">/</span> 16 OCTOBER 2026
          </motion.p>
          <motion.h1 {...revealMotion(0.08)} className="hero-tech-title font-bebas" aria-label={eventConfig.brand.name}>
            <span className="hero-wordmark-fallback" aria-hidden="true">{eventConfig.brand.name}</span>
            <span className="hero-tech-canvas" aria-hidden="true">
              <TechText
                text={eventConfig.brand.name}
                fontWeight={400}
                fontSize={280}
                letterSpacing={-0.018}
                color="#fff1e5"
                accentColor="#fc5e68"
                reveal="letter"
                dashLength={5}
                dashGap={3}
                specks={9}
                speed={0.62}
              />
            </span>
          </motion.h1>
          <motion.div {...revealMotion(0.16)} className="hero-message">
            <p className="hero-tagline font-bebas uppercase"><span>2.0</span> Eight hours. One big idea.</p>
            <p className="hero-summary">An on-site vibe coding hackathon at MACE, Kothamangalam.</p>
            {eventConfig.motto && <p className="hero-motto">{eventConfig.motto}</p>}
          </motion.div>

          <motion.div {...revealMotion(0.24)} className="hero-control-wrap">
            <BorderGlow
              className="hero-control glass-panel"
              backgroundColor="#151116"
              borderRadius={24}
              glowColor="355 88 66"
              colors={['#9c2636', '#fa6669', '#ffc1ab']}
              glowIntensity={0.7}
              glowRadius={28}
              edgeSensitivity={24}
            >
              <Countdown target={eventConfig.countdownTarget} />
              <EventActions className="hero-control-actions" />
            </BorderGlow>
          </motion.div>
        </div>

        <motion.div {...revealMotion(0.38)} className="hero-base-line font-mono uppercase">
          <div className="hero-facts-loop" aria-label={`${eventConfig.durationHours} hours. ${eventConfig.mode}. ${eventConfig.organizer.shortName}, ${eventConfig.organizer.city}.`}>
            <TextLoop
              text={`${eventConfig.durationHours} HOURS ✦ ${eventConfig.mode} ✦ ${eventConfig.organizer.shortName}, ${eventConfig.organizer.city}`}
              shape="line"
              compact
              speed={52}
              separator="✦"
              fontSize={27}
              fontWeight={600}
              letterSpacing={2}
              color="#f4ded9"
              ribbon
              ribbonColor="#5f1b29"
              ribbonWidth={38}
              className="hero-facts-ribbon"
            />
          </div>
          <a href="#prizes" className="hero-scroll-link">Explore the mission <span aria-hidden="true">↓</span></a>
        </motion.div>
      </div>
    </section>
  );
}
