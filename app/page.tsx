import { Header } from '@/components/site/Header';
import { IntroSequence } from '@/components/site/IntroSequence';
import { Hero } from '@/components/sections/Hero';
import { PrizeReveal } from '@/components/sections/PrizeReveal';
import { AboutBriefing } from '@/components/sections/AboutBriefing';
import { EventPhases } from '@/components/sections/EventPhases';
import { EventTimeline } from '@/components/sections/EventTimeline';
import { EntryDossier } from '@/components/sections/EntryDossier';
import { PreviousEdition } from '@/components/sections/PreviousEdition';
import { JoinFooter } from '@/components/sections/JoinFooter';

export default function Home() {
  return (
    <>
      {/* <IntroSequence /> */}
      <Header />
      <main className="flex flex-col w-full">
        <Hero />
        <PrizeReveal />
        <AboutBriefing />
        <EventPhases />
        <EventTimeline />
        <EntryDossier />
        <PreviousEdition />
        <JoinFooter />
      </main>
    </>
  );
}
