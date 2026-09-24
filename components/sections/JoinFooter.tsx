import { eventConfig } from '@/content/event';
import { assets } from '@/content/assets';
import { EventActions } from './EventActions';

export function JoinFooter() {
  return (
    <section id="join" className="w-full bg-[#141416] flex flex-col pt-24 md:pt-32">
      <div className="w-full h-[1px] bg-accent-red" />
      
      <div className="max-w-[1280px] w-full mx-auto px-5 md:px-8 lg:px-16 flex flex-col items-center flex-1 py-24 md:py-32">
        <h2 className="font-bebas text-[clamp(40px,6vw,96px)] leading-[0.9] tracking-tight text-foreground uppercase mb-6 text-center max-w-[15ch]">
          The next move is yours.
        </h2>
        <p className="font-sans text-lg md:text-xl text-muted text-center max-w-[40ch] mb-12">
          Join {eventConfig.brand.name} {eventConfig.brand.edition} at {eventConfig.organizer.shortName}, {eventConfig.organizer.city}.
        </p>
        
        <EventActions />
      </div>

      <footer className="w-full border-t border-border-subtle bg-background py-12 md:py-16">
        <div className="max-w-[1280px] w-full mx-auto px-5 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            {assets.brandLogo.available && assets.brandLogo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={assets.brandLogo.src} alt={`${eventConfig.organizer.name} Logo`} className="h-8 mb-2" />
            ) : (
              <span className="font-bebas text-2xl tracking-wide text-foreground mb-2">{eventConfig.organizer.name}</span>
            )}
            <p className="font-sans text-sm text-muted text-center md:text-left max-w-[30ch]">
              Organized by {eventConfig.organizer.name}, the coding club at {eventConfig.organizer.institution}.
            </p>
            <p className="font-sans text-xs text-muted/60">
              © {eventConfig.brand.year} {eventConfig.organizer.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-6">
              {eventConfig.contactEmail && (
                <a href={`mailto:${eventConfig.contactEmail}`} className="font-sans text-sm text-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground rounded">
                  Contact
                </a>
              )}
              {eventConfig.socialLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground rounded">
                  {link.label}
                </a>
              ))}
            </div>
            
            <a href="#hero" className="font-mono text-xs tracking-widest text-muted hover:text-foreground uppercase flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground rounded p-1">
              Back to top
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>
          
        </div>
      </footer>
    </section>
  );
}
