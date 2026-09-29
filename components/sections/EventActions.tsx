'use client';

import { useState, useEffect } from 'react';
import { eventConfig } from '@/content/event';
import { getValidatedUrl } from '@/lib/url';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export function EventActions({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  
  const validUnstopUrl = getValidatedUrl(eventConfig.unstopUrl);
  const validWhatsappUrl = getValidatedUrl(eventConfig.whatsappUrl);

  const [registerStatus, setRegisterStatus] = useState<'open' | 'before' | 'closed'>('open');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    if (eventConfig.registrationOpensAt && eventConfig.registrationClosesAt) {
      const now = Date.now();
      const openTime = new Date(eventConfig.registrationOpensAt).getTime();
      const closeTime = new Date(eventConfig.registrationClosesAt).getTime();

      if (now < openTime) setRegisterStatus('before');
      else if (now > closeTime) setRegisterStatus('closed');
    }
  }, []);

  // Keep the first client render aligned with the server before checking registration dates.
  const isRegisterEnabled = validUnstopUrl && registerStatus === 'open';

  return (
    <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-5 sm:px-0 ${className}`}>
      <div className="flex flex-col gap-1 items-center">
        {mounted && isRegisterEnabled ? (
          <LiquidButton asChild tone="red" size="lg" className="w-full sm:w-auto">
            <a href={validUnstopUrl} target="_blank" rel="noopener noreferrer">Register on Unstop</a>
          </LiquidButton>
        ) : (
          <LiquidButton disabled tone="neutral" size="lg" className="w-full sm:w-auto">
            {mounted && registerStatus === 'closed' ? 'Registration closed' : 'Registration opens soon'}
          </LiquidButton>
        )}
        {!isRegisterEnabled && mounted && registerStatus !== 'closed' && (
          <span className="text-[10px] text-muted font-sans mt-1">Pending official dates</span>
        )}
      </div>

      <div className="flex flex-col gap-1 items-center">
        {validWhatsappUrl ? (
          <LiquidButton asChild tone="neutral" size="lg" className="w-full sm:w-auto">
            <a href={validWhatsappUrl} target="_blank" rel="noopener noreferrer">Join WhatsApp Community</a>
          </LiquidButton>
        ) : (
          <LiquidButton disabled tone="neutral" size="lg" className="w-full sm:w-auto">
            Community link coming soon
          </LiquidButton>
        )}
        {!validWhatsappUrl && (
          <span className="text-[10px] text-muted font-sans mt-1">Check back later</span>
        )}
      </div>
    </div>
  );
}
