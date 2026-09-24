import { assets } from '@/content/assets';
import { eventConfig } from '@/content/event';
import { Countdown } from './Countdown';
import { EventActions } from './EventActions';

export function Hero() {
  const mottoText = eventConfig.motto || 'Official motto coming soon';

  return (
    <section 
      id="hero" 
      className="relative flex flex-col items-center justify-center min-h-[100svh] pt-[96px] pb-12 overflow-hidden bg-background"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0 select-none">
        <picture>
          <source 
            media="(min-width: 768px)" 
            srcSet={assets.heroDesktop.src || ''} 
          />
          <img 
            src={assets.heroMobile.src || ''} 
            alt="" 
            className="w-full h-full object-cover object-center opacity-40" 
            decoding="sync"
            fetchPriority="high"
          />
        </picture>
        {/* Dark overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {/* Subtle radial red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-red)_0%,_transparent_70%)] opacity-10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[1280px] px-5 md:px-8 mx-auto mt-auto mb-auto">
        <p className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-accent-red mb-4">
          ENCIDE PRESENTS
        </p>
        
        <h1 className="font-bebas text-[clamp(50px,16vw,112px)] md:text-[clamp(96px,14vw,208px)] leading-[0.85] tracking-[-0.02em] text-foreground text-shadow-hero uppercase select-none">
          {eventConfig.brand.name}
        </h1>
        
        <p className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-foreground mt-4 mb-6 md:mb-8">
          {eventConfig.brand.edition} / {eventConfig.brand.year}
        </p>
        
        <div className="max-w-[34ch] w-full min-h-[3rem] mb-8 md:mb-10 text-muted font-sans text-base md:text-lg text-balance">
          {mottoText}
        </div>
        
        <Countdown target={eventConfig.countdownTarget} />
        
        <EventActions className="mt-10 mb-12 md:mt-12 md:mb-16" />
        
        <div className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted flex flex-wrap justify-center gap-2 md:gap-4 uppercase">
          <span>{eventConfig.durationHours} HOURS</span>
          <span className="opacity-50">/</span>
          <span>{eventConfig.mode}</span>
          <span className="opacity-50">/</span>
          <span>{eventConfig.organizer.shortName}, {eventConfig.organizer.city}</span>
        </div>
      </div>
    </section>
  );
}
