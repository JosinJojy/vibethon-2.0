'use client';

import { useState, useEffect } from 'react';
import { eventConfig } from '@/content/event';
import { getValidatedUrl } from '@/lib/url';

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

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (now < openTime) setRegisterStatus('before');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      else if (now > closeTime) setRegisterStatus('closed');
    }
  }, []);

  // Hydration mismatch prevention: show default disabled state before mount if date based logic might differ
  // But wait, the prompt says "first client render matches SSR". Date.now in SSR might differ.
  // We can just use the mounted state to render the date-dependent logic.
  
  const isRegisterEnabled = validUnstopUrl && registerStatus === 'open';

  return (
    <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-5 sm:px-0 ${className}`}>
      <div className="flex flex-col gap-1 items-center">
        {mounted && isRegisterEnabled ? (
          <a 
            href={validUnstopUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center h-12 px-8 font-sans font-semibold text-sm bg-accent-red text-white w-full sm:w-auto min-w-[180px] rounded focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2 focus:ring-offset-background transition-colors hover:bg-[#b01c28]"
          >
            Register on Unstop
          </a>
        ) : (
          <button 
            disabled
            className="flex items-center justify-center h-12 px-8 font-sans font-semibold text-sm bg-[#353337] text-muted w-full sm:w-auto min-w-[180px] rounded cursor-not-allowed"
          >
            {mounted && registerStatus === 'closed' ? 'Registration closed' : 'Registration opens soon'}
          </button>
        )}
        {!isRegisterEnabled && mounted && registerStatus !== 'closed' && (
          <span className="text-[10px] text-muted font-sans mt-1">Pending official dates</span>
        )}
      </div>

      <div className="flex flex-col gap-1 items-center">
        {validWhatsappUrl ? (
          <a 
            href={validWhatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 px-8 font-sans font-semibold text-sm bg-surface border border-border-subtle text-foreground w-full sm:w-auto min-w-[180px] rounded focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background transition-colors hover:bg-[#1f1f22]"
          >
            Join WhatsApp Community
          </a>
        ) : (
          <button 
            disabled
            className="flex items-center justify-center h-12 px-8 font-sans font-semibold text-sm bg-surface border border-border-subtle text-muted w-full sm:w-auto min-w-[180px] rounded cursor-not-allowed"
          >
            Community link coming soon
          </button>
        )}
        {!validWhatsappUrl && (
          <span className="text-[10px] text-muted font-sans mt-1">Check back later</span>
        )}
      </div>
    </div>
  );
}
