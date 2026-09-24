'use client';

import { useState, useEffect, useRef } from 'react';

export function IntroSequence() {
  const [state, setState] = useState<'idle' | 'arming' | 'unlocking' | 'reveal' | 'complete'>('idle');
  const [shouldRender, setShouldRender] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Only run on client after hydration
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHash = window.location.hash.length > 1;
    const isScrolled = window.scrollY >= 10;
    
    let hasPlayed = false;
    try {
      hasPlayed = sessionStorage.getItem('vibethon-intro-v1') === 'true';
    } catch {
      // Storage errors mean skip intro
      hasPlayed = true;
    }

    if (prefersReducedMotion || hasHash || isScrolled || hasPlayed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState('complete');
      return;
    }

    setShouldRender(true);
    
    // Set flag immediately so reload skips
    try {
      sessionStorage.setItem('vibethon-intro-v1', 'true');
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!shouldRender || state === 'complete') return;

    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
    
    document.body.style.overflow = 'hidden';

    const cleanup = () => {
      document.body.style.overflow = '';
      if (dialog && dialog.open) {
        dialog.close();
      }
      setState('complete');
      setShouldRender(false);
      // Optional: focus main heading
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.tabIndex = -1;
        h1.focus({ preventScroll: true });
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cleanup();
    };
    window.addEventListener('keydown', handleEscape);

    // Timeline based on requirements
    // 0-350ms: arming (red indicator fades in, INITIALIZING)
    // 350-900ms: access sequence (horizontal scan)
    // 900-1400ms: unlocking (two CSS shutter outlines separate by 18px, VAULT UNLOCKED)
    // 1400-1900ms: reveal (overlay fades out)
    // <= 2200ms: complete

    const t1 = setTimeout(() => setState('arming'), 0);
    const t2 = setTimeout(() => setState('unlocking'), 350);
    const t3 = setTimeout(() => setState('reveal'), 900);
    const t4 = setTimeout(() => cleanup(), 1900); // 1400 to start fade out, done at 1900

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [shouldRender, state]);

  if (!shouldRender) return null;

  let label = '';
  if (state === 'idle' || state === 'arming') label = 'INITIALIZING';
  else if (state === 'unlocking') label = 'ACCESS SEQUENCE';
  else if (state === 'reveal') label = 'VAULT UNLOCKED';

  const opacityClass = state === 'reveal' ? 'opacity-0' : 'opacity-100';

  return (
    <dialog
      ref={dialogRef}
      className={`fixed inset-0 w-full h-full p-0 m-0 bg-transparent border-none z-[100] transition-opacity duration-500 ease-out ${opacityClass} flex flex-col items-center justify-center`}
      aria-label="Event introduction sequence"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-none" />
      
      {/* Intro Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Decorative elements */}
        <div className="relative w-48 h-12 mb-8 flex items-center justify-center">
          {/* Shutters outline */}
          <div 
            className="absolute inset-0 border border-border-subtle transition-transform duration-500"
            style={{ transform: state === 'reveal' ? 'translateY(-18px)' : 'translateY(0)' }}
          />
          <div 
            className="absolute inset-0 border border-border-subtle transition-transform duration-500"
            style={{ transform: state === 'reveal' ? 'translateY(18px)' : 'translateY(0)' }}
          />
          
          {/* Horizontal scan line */}
          {(state === 'unlocking' || state === 'arming') && (
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent-red animate-pulse" />
          )}
          
          {/* Red indicator dot */}
          <div className={`w-2 h-2 rounded-full bg-accent-red transition-opacity duration-350 ${state === 'idle' ? 'opacity-0' : 'opacity-100'}`} />
        </div>

        <p className="font-mono text-xs tracking-[0.2em] text-foreground uppercase" aria-live="polite">
          {label}
        </p>
      </div>

      <button
        onClick={() => setState('reveal')}
        className="absolute bottom-8 font-mono text-[10px] tracking-widest text-muted uppercase px-4 py-2 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground rounded"
      >
        Skip sequence
      </button>
    </dialog>
  );
}
