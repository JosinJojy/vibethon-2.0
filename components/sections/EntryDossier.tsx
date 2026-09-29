import { eventConfig, selectionCriteria, deliverables, judgingCriteria } from '@/content/event';
import BorderGlow from '@/components/effects/BorderGlow';

function DossierDetails({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  return (
    <details 
      className="group border-b border-border-subtle" 
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between min-h-[56px] py-4 cursor-pointer list-none font-sans text-[17px] font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground">
        {title}
        <span className="text-muted group-open:hidden" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className="text-muted hidden group-open:block" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </span>
      </summary>
      <div className="pb-6 font-sans text-base leading-relaxed text-muted pr-8">
        {children}
      </div>
    </details>
  );
}

export function EntryDossier() {
  const teamSizeStr = eventConfig.teamSize || 'To be announced';
  const eligibilityStr = eventConfig.eligibility || 'To be announced';
  const feeStr = eventConfig.fee || 'To be announced';

  return (
    <section id="entry" className="w-full bg-[#141416] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          
          <div className="w-full md:w-5/12">
            <h2 className="font-bebas text-[clamp(40px,5.5vw,80px)] leading-[0.95] tracking-tight text-foreground uppercase mb-6 md:mb-8">
              Your entry dossier
            </h2>
            <p className="font-sans text-base md:text-[17px] leading-relaxed text-muted mb-10">
              {selectionCriteria}
            </p>

            <div className="entry-facts flex flex-col gap-6">
              <BorderGlow className="glass-panel fact-card">
                <h4 className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase mb-1">Team size</h4>
                <p className="font-sans text-[17px] font-semibold text-foreground">{teamSizeStr}</p>
              </BorderGlow>
              <BorderGlow className="glass-panel fact-card">
                <h4 className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase mb-1">Eligibility</h4>
                <p className="font-sans text-[17px] font-semibold text-foreground">{eligibilityStr}</p>
              </BorderGlow>
              <BorderGlow className="glass-panel fact-card">
                <h4 className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase mb-1">Registration fee</h4>
                <p className="font-sans text-[17px] font-semibold text-foreground">{feeStr}</p>
              </BorderGlow>
            </div>
          </div>

          <BorderGlow className="glass-panel dossier-disclosures w-full md:w-7/12 border-t border-border-subtle mt-4 md:mt-0">
            <DossierDetails title="Selection criteria">
              <p>{selectionCriteria}</p>
            </DossierDetails>
            
            <DossierDetails title="What to submit" defaultOpen>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {deliverables.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </DossierDetails>

            <DossierDetails title="How judging works">
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {judgingCriteria.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </DossierDetails>

            <DossierDetails title="AI usage and transparency">
              <div className="flex flex-col gap-4">
                {!eventConfig.aiRecordPolicyConfirmed && (
                  <p>Teams may be asked to keep a lightweight record of significant prompts, AI suggestions and their own decisions or modifications.</p>
                )}
                <p>The judging brief lists relevant AI chat/interaction records for transparency. Final recording and submission instructions will be confirmed.</p>
                {eventConfig.ibmBobConfirmed && (
                  <p>All teams will be provided equivalent IBM Bob access during the event.</p>
                )}
              </div>
            </DossierDetails>
          </BorderGlow>

        </div>

      </div>
    </section>
  );
}
