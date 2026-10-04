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
  startsAt: '2026-10-16T17:30:00+05:30',
  endsAt: '2026-10-17T10:00:00+05:30',
  registrationOpensAt: '2026-09-21T00:00:00+05:30',
  registrationClosesAt: '2026-10-02T23:59:59+05:30',
  finalistsAt: '2026-10-09T18:00:00+05:30',
  countdownTarget: 'eventStart' as 'eventStart' | 'eventEnd',
  unstopUrl: 'https://unstop.com/p/vibethon-20-mar-athanasius-college-of-engineering-mace-kerala-1757605' as string | null,
  whatsappUrl: 'https://chat.whatsapp.com/L2o1fkENmu3JFYkNfaa4uZ?s=cl&p=a&mlu=4&ilr=4' as string | null,
  teamSize: "1-3" as string | null,
  eligibility: "open to all" as string | null,
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
    description: 'Teams will begin by understanding the challenge, identifying target users and their needs, and developing their solution concept.\n\nAI assistance during this phase will be **strictly limited to basic clarification and understanding**. Teams must independently develop their problem interpretation, solution ideas, and initial approach without using AI to generate or shape their solutions.\n\nThis phase focuses on **creativity, critical thinking, problem understanding, and independent problem-solving**.',
    aiBadge: null
  },
  {
    number: '02',
    title: 'Product Planning & Solution Design',
    description: 'Teams will translate their idea into a clear product and technical plan. This includes defining user flows, prioritizing features, planning the system architecture, designing the interface, selecting suitable technologies, and outlining the development approach.',
    aiBadge: null
  },
  {
    number: '03',
    title: 'AI-Assisted Development',
    description: 'Teams can use AI-assisted tools to **build, test, debug, refine, and improve** their solutions.\n\nTeams are encouraged to embrace **vibe coding** through effective prompting, rapid iteration, and continuous evaluation, while maintaining ownership of their **product decisions, technical direction, and final implementation**.',
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
  { title: "Innovation & Originality", description: "How creative and unique is your idea?" },
  { title: "Problem Relevance & Impact", description: "How meaningful is the problem and how useful is your solution?" },
  { title: "Functionality & Implementation", description: "How well does the product work, and how effectively are the technology, code, and features implemented?" },
  { title: "UI/UX & Design", description: "How intuitive, engaging, and well-designed is the overall experience?" },
  { title: "AI Utilisation & Prompt Quality", description: "How effectively do you use AI through clear and purposeful prompts to enhance your development process? Relevant chat exports will be reviewed to ensure transparency." },
  { title: "Final Product & Presentation", description: "The quality of the final product, demonstration, explanation, and overall delivery." }
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
    second: '₹6,000',
    third: '₹2,500'
  }
};
