export const eventConfig = {
  brand: { name: 'VIBETHON', edition: '2.0', year: 2026 },
  organizer: {
    name: 'ENCIDE',
    institution: 'Mar Athanasius College of Engineering',
    shortName: 'MACE',
    city: 'Kothamangalam'
  },
  durationHours: 8,
  mode: 'On-site',
  timezone: 'Asia/Kolkata',
  motto: null as string | null,
  startsAt: null as string | null,
  endsAt: null as string | null,
  registrationOpensAt: null as string | null,
  registrationClosesAt: null as string | null,
  finalistsAt: null as string | null,
  countdownTarget: 'eventStart' as 'eventStart' | 'eventEnd',
  unstopUrl: null as string | null,
  whatsappUrl: null as string | null,
  teamSize: null as string | null,
  eligibility: null as string | null,
  fee: null as string | null,
  contactEmail: null as string | null,
  socialLinks: [] as { label: string; href: string }[],
  phase2AiPolicy: null as string | null,
  ibmBobConfirmed: false,
  aiRecordPolicyConfirmed: false,
  closingMilestoneLabel: 'Event concludes'
};

export const prizes = {
  total: '₹20,000',
  first: '₹10,000',
  second: '₹6,000',
  third: '₹4,000'
};

export const phaseCopy = [
  {
    number: '01',
    title: 'Ideation & Problem Solving',
    description: 'Begin without AI assistance. Understand the problem, identify users and challenges, and develop your solution idea. This phase assesses creativity, critical thinking and problem-solving.',
    aiBadge: 'NO AI ASSISTANCE'
  },
  {
    number: '02',
    title: 'Product & Solution Design',
    description: 'Turn your idea into a product and technical plan through user flows, feature prioritization, system architecture, interface planning and technology selection.',
    aiBadge: null
  },
  {
    number: '03',
    title: 'AI-Assisted Development',
    description: 'Use AI-assisted tools to build, test, debug and refine your solution.',
    aiBadge: 'AI-ASSISTED DEVELOPMENT'
  }
];

export const selectionCriteria = "Submit your project abstract through Unstop. The panel will assess problem relevance, originality, innovation, feasibility, solution approach, potential impact and clarity. Where available, GitHub repositories, LinkedIn profiles, previous projects and relevant technical work may also inform selection.";

export const deliverables = [
  "Project name and description",
  "Problem statement and proposed solution",
  "Technology stack and tools",
  "GitHub repository or source code",
  "Final presentation or demo"
];

export const judgingCriteria = [
  "Innovation and originality",
  "Functionality and implementation",
  "UI/UX and overall design",
  "Impact and potential",
  "Prompt quality and AI utilisation",
  "AI chat export",
  "Final presentation"
];

export const previousEdition = {
  description: "Held on 20-21 September 2025 at MACE, the first VIBETHON was an 8-hour overnight hackathon themed AI for Social Impact.",
  stats: {
    registered: 328,
    shortlisted: 70
  },
  prizes: {
    total: '₹15,000',
    first: '₹7,500',
    second: '₹5,000',
    third: '₹2,500'
  }
};
