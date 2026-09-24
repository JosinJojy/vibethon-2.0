'use client';

import { eventConfig } from '@/content/event';

export function EventActions({ className = '' }: { className?: string }) {
  const registerEnabled = !!eventConfig.unstopUrl;
  const whatsappEnabled = !!eventConfig.whatsappUrl;

  return (
    <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-5 sm:px-0 ${className}`}>
      {registerEnabled ? (
        <a 
          href={eventConfig.unstopUrl!} 
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
          Registration opens soon
        </button>
      )}

      {whatsappEnabled ? (
        <a 
          href={eventConfig.whatsappUrl!} 
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
    </div>
  );
}
