'use client';

import { useState, useEffect } from 'react';
import { eventConfig } from '@/content/event';

export function Countdown({ target }: { target: 'eventStart' | 'eventEnd' }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState<'pending' | 'active' | 'ended'>('pending');

  const targetDate = target === 'eventStart' ? eventConfig.startsAt : eventConfig.endsAt;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    if (!targetDate) return;

    const end = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (target === 'eventStart') {
          setStatus(eventConfig.endsAt && now > new Date(eventConfig.endsAt).getTime() ? 'ended' : 'active');
        } else {
          setStatus('ended');
        }
        return;
      }

      setStatus('pending');
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate, target]);

  if (!targetDate) {
    return (
      <div className="flex flex-col items-center">
        <p className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-accent-red mb-3 uppercase">Dates to be announced</p>
        <div className="flex gap-4 md:gap-6 text-foreground font-bebas text-3xl md:text-5xl tracking-wide">
          <div className="flex flex-col items-center"><span className="leading-none">--</span><span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Days</span></div>
          <span className="text-muted leading-none -mt-1">:</span>
          <div className="flex flex-col items-center"><span className="leading-none">--</span><span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Hours</span></div>
          <span className="text-muted leading-none -mt-1">:</span>
          <div className="flex flex-col items-center"><span className="leading-none">--</span><span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Minutes</span></div>
          <span className="text-muted leading-none -mt-1">:</span>
          <div className="flex flex-col items-center"><span className="leading-none">--</span><span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Seconds</span></div>
        </div>
      </div>
    );
  }

  const statusLabel = status === 'pending' ? 'The heist begins in' : (status === 'active' ? 'The heist has begun' : 'The heist has concluded');

  return (
    <div className="flex flex-col items-center">
      <p className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-accent-red mb-3 uppercase" aria-live="polite">
        {statusLabel}
      </p>
      <div className="flex gap-4 md:gap-6 text-foreground font-bebas text-3xl md:text-5xl tracking-wide tabular-nums">
        <div className="flex flex-col items-center">
          <span className="leading-none">{mounted ? String(timeLeft.days).padStart(2, '0') : '--'}</span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Days</span>
        </div>
        <span className="text-muted leading-none -mt-1">:</span>
        <div className="flex flex-col items-center">
          <span className="leading-none">{mounted ? String(timeLeft.hours).padStart(2, '0') : '--'}</span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Hours</span>
        </div>
        <span className="text-muted leading-none -mt-1">:</span>
        <div className="flex flex-col items-center">
          <span className="leading-none">{mounted ? String(timeLeft.minutes).padStart(2, '0') : '--'}</span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Minutes</span>
        </div>
        <span className="text-muted leading-none -mt-1">:</span>
        <div className="flex flex-col items-center">
          <span className="leading-none">{mounted ? String(timeLeft.seconds).padStart(2, '0') : '--'}</span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.1em] text-muted mt-1 uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
}
