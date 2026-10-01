'use client';

import { Fragment, useState, useEffect } from 'react';
import { eventConfig } from '@/content/event';

const UNITS = [['days', 'Days'], ['hours', 'Hrs'], ['minutes', 'Min'], ['seconds', 'Sec']] as const;
type TimeLeft = Record<(typeof UNITS)[number][0], number>;

export function Countdown({ target, className = '' }: { target: 'eventStart' | 'eventEnd'; className?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [status, setStatus] = useState<'pending' | 'active' | 'ended'>('pending');

  const targetDate = target === 'eventStart' ? eventConfig.startsAt : eventConfig.endsAt;

  useEffect(() => {
    if (!targetDate) return;

    const end = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(end - now, 0);

      if (diff === 0) {
        const eventOver = target === 'eventEnd' || (eventConfig.endsAt && now > new Date(eventConfig.endsAt).getTime());
        setStatus(eventOver ? 'ended' : 'active');
      } else {
        setStatus('pending');
      }

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

  const statusLabel = !targetDate
    ? 'Dates to be announced'
    : status === 'pending' ? 'The heist begins in' : status === 'active' ? 'The heist has begun' : 'The heist has concluded';

  return (
    <div className={`countdown ${className}`}>
      <p className="countdown-label font-mono" aria-live="polite">{statusLabel}</p>
      <div className="countdown-digits font-display tabular-nums">
        {UNITS.map(([key, label], i) => (
          <Fragment key={key}>
            {i > 0 && <span className="countdown-sep" aria-hidden="true">:</span>}
            <div className="countdown-unit">
              <span className="countdown-value">{timeLeft ? String(timeLeft[key]).padStart(2, '0') : '--'}</span>
              <span className="countdown-unit-label font-mono">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
