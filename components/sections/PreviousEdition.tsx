import { previousEdition } from '@/content/event';
import { gallery } from '@/content/assets';
import { Gallery } from '../gallery/Gallery';

export function PreviousEdition() {
  return (
    <section id="glimpses" className="w-full bg-background py-24 md:py-32 border-t border-border-subtle">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <h2 className="font-bebas text-[clamp(40px,5.5vw,80px)] leading-[0.95] tracking-tight text-foreground uppercase mb-4">
            Previously, at VIBETHON
          </h2>
          <p className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted uppercase mb-8">
            VIBETHON 2025 / 20-21 September / MACE
          </p>
          <p className="font-sans text-base md:text-lg leading-relaxed text-muted max-w-[64ch] mb-12">
            {previousEdition.description}
          </p>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-y border-border-subtle py-8 md:py-12">
            
            <div className="flex flex-col items-center">
              <span className="font-bebas text-6xl md:text-8xl text-foreground">
                {previousEdition.stats.registered}
              </span>
              <span className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-accent-red mt-2 uppercase">
                Registered Participants
              </span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-bebas text-6xl md:text-8xl text-foreground">
                {previousEdition.stats.shortlisted}
              </span>
              <span className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-accent-red mt-2 uppercase">
                Shortlisted Participants
              </span>
            </div>
            
          </div>

          <div className="mt-8 flex flex-col items-center">
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.12em] text-muted uppercase mb-2">
              2025 Prize Pool
            </span>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-sans font-semibold text-lg text-foreground">{previousEdition.prizes.total}</span>
            </div>
            <div className="flex gap-3 text-sm font-sans text-muted">
              <span>{previousEdition.prizes.first}</span>
              <span className="opacity-40">/</span>
              <span>{previousEdition.prizes.second}</span>
              <span className="opacity-40">/</span>
              <span>{previousEdition.prizes.third}</span>
            </div>
          </div>
        </div>

        <Gallery images={gallery} />
        
      </div>
    </section>
  );
}
