'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { eventConfig } from '@/content/event';
import { formatEventDate } from '@/lib/dates';
import BorderGlow from '@/components/effects/BorderGlow';

const milestones = [
  {
    label: 'Registration opens',
    date: eventConfig.registrationOpensAt,
    desc: "Submit your team's abstract through Unstop."
  },
  {
    label: 'Registration closes',
    date: eventConfig.registrationClosesAt,
    desc: "Abstract submissions close."
  },
  {
    label: 'Finalists announced',
    date: eventConfig.finalistsAt,
    desc: "Shortlisted teams are announced."
  },
  {
    label: 'Hackathon begins',
    date: eventConfig.startsAt,
    desc: "The 8-hour on-site build begins at MACE."
  },
  {
    label: eventConfig.closingMilestoneLabel,
    date: eventConfig.endsAt,
    desc: "The event concludes; final timing will be confirmed."
  }
];

function TimelineNode({ 
  milestone, 
  index 
}: { 
  milestone: typeof milestones[0], 
  index: number 
}) {
  const nodeRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(nodeRef, { amount: 'all', margin: "-20% 0px -20% 0px", once: true });

  const isEven = index % 2 === 0;

  return (
    <li 
      ref={nodeRef}
      className={`relative flex flex-col md:flex-row w-full mb-12 md:mb-24 last:mb-0 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
    >
      {/* Mobile Dot */}
      <div className="absolute left-[8px] top-1 md:hidden -translate-x-[4.5px] w-[11px] h-[11px] rounded-full bg-surface border-2 border-border-subtle z-10 transition-colors duration-200" style={{ borderColor: isInView ? 'var(--color-accent-red)' : 'var(--color-border-subtle)' }} />
      
      {/* Desktop Dot */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface border-[3px] border-border-subtle z-10 transition-colors duration-200" style={{ borderColor: isInView ? 'var(--color-accent-red)' : 'var(--color-border-subtle)' }} />

      {/* Content Block */}
      <BorderGlow className="timeline-card glass-panel pl-8 md:pl-0 w-full md:w-[calc(50%-48px)]" contentClassName={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
        <span className="font-mono text-[11px] tracking-[0.12em] text-muted mb-2 uppercase">
          {formatEventDate(milestone.date)}
        </span>
        <h4 className="font-sans text-xl font-semibold text-foreground mb-2">
          {milestone.label}
        </h4>
        <p className="font-sans text-[15px] text-muted max-w-[380px]">
          {milestone.desc}
        </p>
      </BorderGlow>
    </li>
  );
}

export function EventTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} id="timeline" className="w-full bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 flex flex-col items-center">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-bebas text-[clamp(40px,5.5vw,80px)] leading-[0.95] tracking-tight text-foreground uppercase mb-4">
            The operation timeline
          </h2>
        </div>

        <div className="relative w-full max-w-[1000px] mx-auto">
          {/* Neutral background line */}
          <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border-subtle md:-translate-x-[1px]" />
          
          {/* Active red line */}
          <motion.div 
            className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-[2px] bg-accent-red md:-translate-x-[1px] origin-top"
            style={{ scaleY }}
          />

          <ol className="relative z-10 flex flex-col w-full m-0 p-0 list-none">
            {milestones.map((milestone, i) => (
              <TimelineNode key={milestone.label} milestone={milestone} index={i} />
            ))}
          </ol>
        </div>
        
      </div>
    </section>
  );
}
