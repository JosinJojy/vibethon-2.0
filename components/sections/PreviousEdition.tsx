import { previousEdition } from '@/content/event';
import { gallery } from '@/content/assets';
import { Gallery } from '../gallery/Gallery';

export function PreviousEdition() {
  const stats = [
    { value: previousEdition.stats.registered, label: 'Registered' },
    { value: previousEdition.stats.shortlisted, label: 'Shortlisted' },
    { value: previousEdition.prizes.total, label: 'Prize pool' },
  ];

  return (
    <section id="glimpses" className="w-full py-28 md:py-40">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        
        <div className="mb-14 md:mb-20 flex flex-col items-center text-center">
          <h2 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[0.95] text-foreground uppercase mb-4">
            Previously, at VIBETHON
          </h2>
          <p className="font-mono text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-muted uppercase mb-8">
            VIBETHON 2025 / 20-21 September / MACE
          </p>
          <p className="font-sans text-base md:text-lg leading-relaxed text-muted max-w-[60ch] mb-14">
            {previousEdition.description}
          </p>

          <dl className="w-full max-w-3xl grid grid-cols-3">
            {stats.map(stat => (
              <div key={stat.label} className="legacy-stat flex flex-col-reverse items-center">
                <dt className="font-mono text-[10px] md:text-[12px] font-bold tracking-[0.18em] text-accent-red mt-3 uppercase">{stat.label}</dt>
                <dd className="font-display text-[34px] md:text-7xl leading-none text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Gallery images={gallery} />
        
      </div>
    </section>
  );
}
