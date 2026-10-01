'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { eventConfig, prizes } from '@/content/event';
import { announceReveal } from '@/lib/reveal';

const CREW = ['TOKIO', 'BERLÍN', 'NAIROBI', 'RÍO', 'DENVER', 'HELSINKI', 'MOSCÚ', 'LISBOA', 'PALERMO', 'BOGOTÁ', 'MANILA', 'ESTOCOLMO'];
const STEPS = [
  { at: 0, es: 'Reuniendo a la banda', en: 'Assembling the crew' },
  { at: 24, es: 'Burlando la seguridad', en: 'Bypassing security' },
  { at: 50, es: `Imprimiendo ${prizes.total}`, en: 'Printing the prize pool' },
  { at: 76, es: 'Abriendo la bóveda', en: 'Cracking the vault' },
  { at: 100, es: 'Bóveda abierta', en: 'Vault open' },
];
// A stuttered curve makes the counter feel like real work instead of a linear tween.
const CURVE: [number, number][] = [[0, 0], [0.16, 19], [0.26, 24], [0.44, 47], [0.52, 51], [0.72, 78], [0.82, 83], [1, 100]];
const COMBINATION = [-118, 154, -62];
const TICKS = Array.from({ length: 100 }, (_, i) => i);
const GRIPS = Array.from({ length: 48 }, (_, i) => i);
const DURATION = 3800;
const REDUCED_DURATION = 1100;
const MAX_WAIT = 9000;
const HOLD = 700;
const EXIT = 1100;
const DOOR_EASE = [0.76, 0, 0.24, 1] as const;

type Phase = 'loading' | 'open' | 'exit' | 'done';

function curve(t: number) {
  for (let i = 1; i < CURVE.length; i++) {
    const [t1, v1] = CURVE[i];
    if (t <= t1) {
      const [t0, v0] = CURVE[i - 1];
      return v0 + (v1 - v0) * ((t - t0) / (t1 - t0));
    }
  }
  return 100;
}

function dialAngle(progress: number) {
  const span = 100 / 3;
  const segment = Math.min(Math.floor(progress / span), 2);
  const local = (progress - segment * span) / span;
  const eased = local < 0.85 ? 1 - Math.pow(1 - local / 0.85, 3) : 1;
  const from = segment === 0 ? 0 : COMBINATION[segment - 1];
  return from + (COMBINATION[segment] - from) * eased;
}

function stepFor(progress: number) {
  let index = 0;
  STEPS.forEach((step, i) => { if (progress >= step.at) index = i; });
  return index;
}

export function IntroSequence() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [reduced, setReduced] = useState(false);
  const [frame, setFrame] = useState({ progress: 0, elapsed: 0, step: 0, stepAt: 0 });
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(reduce);
    const duration = reduce ? REDUCED_DURATION : DURATION;

    let pageReady = document.readyState === 'complete';
    let fontsReady = !document.fonts;
    const markPageReady = () => { pageReady = true; };
    window.addEventListener('load', markPageReady, { once: true });
    document.fonts?.ready.then(() => { fontsReady = true; });

    const start = performance.now();
    const timers: number[] = [];
    let raf = 0;
    let last = start;
    let shown = 0;
    let finished = false;
    let step = 0;
    let stepAt = 0;

    const finish = (fast: boolean) => {
      if (finished) return;
      finished = true;
      setPhase('open');
      timers.push(window.setTimeout(() => {
        cancelAnimationFrame(raf);
        setPhase('exit');
        announceReveal();
        timers.push(window.setTimeout(() => setPhase('done'), EXIT + 150));
      }, fast ? 250 : HOLD));
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      if (!finished) {
        const loaded = (pageReady && fontsReady) || elapsed > MAX_WAIT;
        const target = Math.min(curve(Math.min(elapsed / duration, 1)), loaded ? 100 : 92);
        shown += (target - shown) * Math.min(1, (now - last) / 70);
        if (target >= 100 && shown > 99.5) finish(reduce);
      }
      last = now;
      const progress = finished ? 100 : shown;
      const nextStep = stepFor(progress);
      if (nextStep !== step) {
        step = nextStep;
        stepAt = elapsed;
      }
      setFrame({ progress, elapsed, step, stepAt });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    skipRef.current = () => finish(true);
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') finish(true); };
    window.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('load', markPageReady);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (phase === 'done') return null;

  const exiting = phase === 'exit';
  const span = 100 / 3;
  const unlocked = [0, 1, 2].filter(i => frame.progress >= (i + 0.85) * span).length;
  const angle = reduced ? 0 : dialAngle(frame.progress);
  const crew = phase === 'loading' && !reduced ? CREW[Math.floor(frame.elapsed / 130) % CREW.length] : 'EL PROFESOR';
  const status = STEPS[frame.step];
  const typed = status.es.slice(0, Math.max(0, Math.floor((frame.elapsed - frame.stepAt) / 26)));
  const doorTransition = { duration: reduced ? 0.3 : EXIT / 1000, ease: DOOR_EASE, delay: reduced ? 0 : 0.12 };

  return (
    <>
      <noscript><style>{'.heist-loader{display:none!important}'}</style></noscript>
      <div
        className={`heist-loader${exiting ? ' is-exiting' : ''}`}
        data-phase={phase}
        role="status"
        aria-live="polite"
        aria-busy={!exiting}
        aria-label={`Loading ${eventConfig.brand.name} ${eventConfig.brand.edition}`}
      >
        <motion.div
          className="heist-door heist-door--left"
          initial={false}
          animate={exiting ? (reduced ? { opacity: 0 } : { x: '-101%' }) : undefined}
          transition={doorTransition}
        />
        <motion.div
          className="heist-door heist-door--right"
          initial={false}
          animate={exiting ? (reduced ? { opacity: 0 } : { x: '101%' }) : undefined}
          transition={doorTransition}
        />
        <motion.div
          className="heist-seam"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={exiting ? { scaleY: 1, opacity: 0 } : phase === 'open' ? { scaleY: 1, opacity: 1 } : undefined}
          transition={{ duration: exiting ? 0.35 : 0.55, ease: DOOR_EASE }}
        />

        <motion.div className="heist-ui" initial={false} animate={{ opacity: exiting ? 0 : 1 }} transition={{ duration: 0.25 }}>
          <div className="heist-ui-top">
            <div>
              <p className="heist-brand font-display">{eventConfig.brand.name} <span>{eventConfig.brand.edition}</span></p>
              <p className="heist-brand-es font-serif italic">La casa del código</p>
            </div>
            <div className="heist-file font-mono">
              <p>Exp. Nº 002/{eventConfig.brand.year}</p>
              <p className="heist-classified">Confidencial</p>
            </div>
          </div>

          <div className="heist-center" aria-hidden="true">
            <svg className="heist-dial" viewBox="0 0 240 240">
              <circle className="heist-dial-ring" cx="120" cy="120" r="117" />
              <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '120px 120px' }}>
                {TICKS.map(i => (
                  <line
                    key={i}
                    className={i % 10 === 0 ? 'is-major' : undefined}
                    x1="120" y1={i % 10 === 0 ? 10 : i % 5 === 0 ? 14 : 17} x2="120" y2="24"
                    transform={`rotate(${i * 3.6} 120 120)`}
                  />
                ))}
                {TICKS.filter(i => i % 10 === 0).map(i => (
                  <text key={i} x="120" y="40" textAnchor="middle" transform={`rotate(${i * 3.6} 120 120)`}>{i}</text>
                ))}
                <circle className="heist-dial-face" cx="120" cy="120" r="68" />
                {GRIPS.map(i => (
                  <rect key={i} className="heist-dial-grip" x="119" y="53" width="2" height="7" transform={`rotate(${i * 7.5} 120 120)`} />
                ))}
              </g>
              <path className="heist-dial-pointer" d="M120 26 L114 14 H126 Z" />
              <circle className="heist-dial-hub" cx="120" cy="120" r="44" />
              <text className="heist-dial-hub-text" x="120" y="132" textAnchor="middle">{eventConfig.brand.edition}</text>
            </svg>
            <div className="heist-tumblers">
              {[0, 1, 2].map(i => <span key={i} className={i < unlocked ? 'is-on' : undefined} />)}
            </div>
            <p className="heist-crew-label font-mono">Llamando a</p>
            <p className="heist-crew font-display">{crew}</p>
          </div>

          <div className="heist-ui-bottom">
            <div className="heist-status font-mono">
              <p className="heist-status-es"><span>&gt;</span> {typed}<i className="heist-caret" /></p>
              <p className="heist-status-en">{status.en}</p>
            </div>
            <p className="heist-pct font-display">{String(Math.floor(frame.progress)).padStart(3, '0')}<span>%</span></p>
          </div>

          <button type="button" className="heist-skip font-mono" onClick={() => skipRef.current()}>
            Saltar / Skip
          </button>
        </motion.div>

        <div className="heist-progress" style={{ transform: `scaleX(${frame.progress / 100})` }} />
      </div>
    </>
  );
}
