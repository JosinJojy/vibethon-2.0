# VIBETHON 2.0 / Implementation Specification

## A/01 Non-negotiable decisions
- **Identity and Event**: Official spelling is VIBETHON. Display title: VIBETHON. Edition badge: 2.0. Supporting event name: VIBETHON 2026. Organizer: ENCIDE, the coding club at MACE. Event: 8-hour, on-site, AI-assisted software-building hackathon.
- **Theme**: Money Heist-inspired cinematic vault operation (website and poster).
- **Fixed Order**: Opening overlay -> (1) Hero -> (2) Prize reveal -> (3) About / briefing -> (4) Three phases -> (5) Event timeline -> (6) Entry and evaluation -> (7) Previous edition and photo gallery -> (8) Final invitation and footer.
- **Hero Restrictions**: No Professor, mascot, masked person, or character silhouette in hero/loader. Official motto is pending; reserve space below title. Show countdown below motto, two CTAs below countdown. Professor appears in section 3 only.
- **Scope**: Single public page, primarily static. No login, DB, admin panel, backend API, payment flow, chatbot, etc. Registration/community via external Unstop and WhatsApp links.
- **Visual Priorities**: Hero composition first; restrained motion second; factual readability throughout. One full-bleed hero, one oversized prize composition, one asymmetric portrait spread, ruled phase rows, a timeline, editorial panels, and a photography grid. No generic appearance (no glassmorphism, floating code, neon outlines, scroll hijacking, autoplay audio, 3D).
- **End State**: Working production build with responsive layouts, keyboard access, reduced-motion support, honest missing-content states, optimized real assets.

## A/02 Event facts and public copy
- **About Copy**: "VIBETHON 2.0 is an 8-hour, on-site vibe coding hackathon organized by ENCIDE at Mar Athanasius College of Engineering, Kothamangalam. Build with modern AI tools while demonstrating your own technical understanding, originality, problem-solving and product decisions."
- **AI Copy**: "AI can accelerate the work. Your team still owns the thinking, the decisions and the final product."
- **Club Copy**: "ENCIDE is the coding club at Mar Athanasius College of Engineering, Kothamangalam, and the organizer of VIBETHON 2.0."
- **Current Prizes**: Total ₹20,000. First ₹10,000. Second ₹6,000. Third ₹4,000.
- **Selection Copy**: "Submit your project abstract through Unstop. The panel will assess problem relevance, originality, innovation, feasibility, solution approach, potential impact and clarity. Where available, GitHub repositories, LinkedIn profiles, previous projects and relevant technical work may also inform selection."
- **Three Phases**:
  - 01 / Ideation & Problem Solving: "Begin without AI assistance. Understand the problem, identify users and challenges, and develop your solution idea. This phase assesses creativity, critical thinking and problem-solving."
  - 02 / Product & Solution Design: "Turn your idea into a product and technical plan through user flows, feature prioritization, system architecture, interface planning and technology selection."
  - 03 / AI-Assisted Development: "Use AI-assisted tools to build, test, debug and refine your solution."
- **Submission**: Project name/desc, problem statement/solution, tech stack, GitHub repo, final presentation.
- **Judging**: Innovation, functionality, UI/UX, impact, prompt quality, AI chat export, final presentation.
- **Previous Edition**: "Held on 20-21 September 2025 at MACE, the first VIBETHON was an 8-hour overnight hackathon themed AI for Social Impact." Registered: 328, Shortlisted: 70. Pool: ₹15,000 (First ₹7,500, Second ₹5,000, Third ₹2,500).

## A/03 Content model and safe defaults
- **File**: `src/content/event.ts` or matching root. Export `eventConfig`, `prizes`, `phaseCopy`, `selectionCriteria`, `deliverables`, `judgingCriteria`, `previousEdition`.
- **Defaults**: motto (null), startsAt (null), endsAt (null), registrationOpensAt/ClosesAt/finalistsAt (null), countdownTarget ('eventStart'), unstopUrl/whatsappUrl (null), teamSize/eligibility/fee (null), ibmBobConfirmed (false), aiRecordPolicyConfirmed (false).
- **Fallback Rules**:
  - Motto null: "Official motto coming soon"
  - Dates null: "Dates to be announced"; use four static '--' countdown values with visible DAYS/HOURS/MINUTES/SECONDS. Timeline entries visible with "To be announced".
  - Null links: Disabled "Registration opens soon" / "Community link coming soon".
  - Unknown team size/fee/eligibility: "To be announced"
  - Missing contact/social links: omit them.
  - Empty gallery: "Glimpses from 2025 will be added soon".

## A/04 Art direction and layout system
- **Tokens**: Background #0B0B0D; alternate surface #141416; foreground #F3EFE7; muted text #B6B2AD; accent red #D92332; border #353337. Corners: 2-4px.
- **Typography**: Brand VIBETHON in Bebas Neue; Body in Inter. Mobile body 16px/1.6, desktop 17px/1.65. Labels 11-12px, 0.12em tracking. H2 clamp(40px, 5.5vw, 80px), 0.95 lh. Max 62ch for columns.
- **Grid**: Mobile <768px, Tablet 768-1023px, Desktop 1024px+. Max width 1280px, gutters 20/32/64px. 12 columns desktop. Vertical padding 72/96/128px.
- **Header**: Fixed 72px desktop / 64px mobile. Transparent over hero, charcoal after 24px scroll. Menu opens accessible dialog/drawer.
- **Responsive Hero Typography**: Desktop title clamp(96px, 14vw, 208px). Mobile clamp(50px, 16vw, 112px). Negative tracking -0.02em.

## A/05 Opening and hero choreography
- **Hero**: Dark symmetric vault corridor. Red light source. Dark CSS overlays. Reveal animation. Min-height calc(100svh - 0px). Top padding header+32px, bottom 48px.
- **Intro State Machine**: idle -> arming -> unlocking -> reveal -> complete. Overlay only < 10 scrollY, no reduced-motion preference.
  - 0-350ms: arming (red indicator fades in, INITIALIZING)
  - 350-900ms: access sequence (horizontal scan)
  - 900-1400ms: unlocking (two CSS shutter outlines separate by 18px, VAULT UNLOCKED)
  - 1400-1900ms: reveal (overlay fades out)
- **Countdown**: Date.now after mount, floor units. At start: "The heist has begun". After endsAt: "The heist has concluded".

## A/06 The vault and the briefing
- **Prizes**: Charcoal section, faint vault chamber image. Heading center, ₹20,000 oversized. Ruled three-column strip. Door panels translation reveal at 25% visibility.
- **About**: Desktop portrait 560px tall left 5 cols, red glow/schematic. Mobile portrait max 360px. Text right 6 cols. Money heist professor.

## A/07 Phases and timeline
- **Phases**: Three full-width ruled rows. Badges for AI ASSISTANCE. Rows reveal once opacity/y 12px over 450ms.
- **Timeline**: 5 milestones. Desktop centered vertical route. Mobile route x=8px. Progress line driven by viewport. Highlight dots on entry.

## A/08 Details, gallery and closing
- **Entry Dossier**: Three facts (team size, eligibility, fee), four native details/summary disclosures. Submission disclosure open by default.
- **Glimpses**: 2025 stats. Desktop CSS grid (first photo 8 cols + 2 rows). Mobile CSS scroll-snap horizontal gallery. Tap opens accessible lightbox.
- **Footer**: Large heading, repeat event actions. ENCIDE logo/name, links. Red line. Footer year 2026.

## A/09 Architecture and responsibilities
- **Stack**: Next.js App Router (if present), React, Tailwind/CSS Modules. `motion/react` for animation.
- **Client Boundaries**: Keep text, facts, structure server-rendered. Only loader, menu, countdown, gallery, animations use 'use client'.

## A/10 Motion and quality contract
- **Motion**: Default ease [0.22, 1, 0.36, 1]. Observe visibility. Reduced motion respected. Focus and hover states configured. Trap focus in menus/lightbox.
- **Performance**: Mobile Lighthouse targets >=90 perf, >=95 access. LCP <=2.5s. Asset budgets strictly controlled.

## A/11 Asset production manifest
- G1 `hero-vault-desktop.avif/.webp` (2560x1440)
- G2 `hero-vault-mobile.avif/.webp` (1440x2560)
- G3 `professor-cutout.webp` (transparent PNG master, 1600x2000)
- G4 `vault-chamber.avif/.webp` (2400x1350)
- Supplied: `encide-logo.svg`, event photos (6-10).

## A/12 Verification and acceptance
- No "VIBEATHON". 8 sections. Totals match exactly.
- Test viewport responsiveness. Test intro skip, escape, storage denial. Test countdown boundaries. Keyboard testing. Build passing.
