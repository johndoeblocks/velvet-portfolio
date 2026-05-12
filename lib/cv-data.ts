export type CvExperience = {
  period: string[];
  periodDetails?: {
    date: string;
    label: string;
  }[];
  role: string;
  company: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type CvProject = {
  name: string;
  label: string;
  summary: string;
  stack: string[];
};

export const cvProfile = {
  name: 'Joao Manteigas',
  title: 'Full-Stack Engineer (FE Heavy)',
  subtitle: 'Product-minded engineer across frontend, backend, infrastructure, and growth',
  summary:
    'Frontend-heavy full-stack engineer building production web, mobile, automation, and Web3 systems across startup, enterprise, and consultancy environments. Strong at joining product teams quickly, owning architecture and delivery end-to-end, and translating business requirements into scalable React, Next.js, React Native, Node.js, Prisma, PostgreSQL, Redis, analytics, AWS, and cloud-backed systems.',
  signals: [
    'Product ownership from discovery to deployment',
    'Frontend architecture, UX quality, and production reliability',
    'Backend, database, automation, and infrastructure delivery',
    'Fast integration into client and cross-functional teams',
  ],
};

export const skillGroups = [
  {
    label: 'Frontend & Mobile',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'React Native',
      'Redux',
      'Styled Components',
      'Electron',
      'i18n',
      'Performance optimization',
      'Accessibility',
    ],
  },
  {
    label: 'Backend & Data',
    skills: [
      'Node.js',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'GraphQL',
      'Subgraphs',
      'REST APIs',
      'Event-driven systems',
      'SQL',
    ],
  },
  {
    label: 'Product, Growth & Infra',
    skills: [
      'Docker',
      'Azure DevOps',
      'CI/CD',
      'Vercel',
      'Railway',
      'Cloudflare',
      'AWS',
      'GTM',
      'PostHog',
      'Meta Ads',
      'Google Ads',
    ],
  },
  {
    label: 'Web3 & Automation',
    skills: [
      'Wallet authentication',
      'Smart contracts',
      'Base',
      'Solana',
      'Web3 auth',
      'Telegram bots',
      'WhatsApp automation',
      'CRM integrations',
      'AI workflows',
      'Lead qualification',
    ],
  },
];

export const featuredProjects: CvProject[] = [
  {
    name: 'ScorePlay',
    label: 'Web3 prediction market platform',
    summary:
      'Co-founded and own product, architecture, and delivery for a Web3 sports prediction platform with wallet authentication, smart contract integrations, Prisma/PostgreSQL data models, leaderboard systems, backend settlement flows, analytics instrumentation, and multi-chain architecture planning.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Web3', 'Smart contracts', 'Analytics'],
  },
  {
    name: 'Polymarket Telegram Bot',
    label: 'Trading infrastructure bot',
    summary:
      'Built event-driven Telegram automation for Web3 trading workflows, including whale alerts, copy-trading logic, Redis-backed processing, GraphQL/subgraph data access, backend orchestration, and Dockerized infrastructure ownership.',
    stack: ['Node.js', 'TypeScript', 'Redis', 'GraphQL', 'Subgraphs', 'Prisma', 'PostgreSQL', 'Docker'],
  },
  {
    name: 'Growth & Automation Systems',
    label: 'Operational tooling for Portuguese companies',
    summary:
      'Delivered engineering-led workflow automation and growth infrastructure for Portuguese businesses: WhatsApp automation, CRM integrations, AI conversational systems, lead qualification, internal tools, GTM event design, Meta/Google Ads tracking, and conversion funnel instrumentation.',
    stack: ['Next.js', 'AI workflows', 'WhatsApp', 'CRM integrations', 'GTM', 'Meta Ads', 'Google Ads', 'PostHog'],
  },
  {
    name: 'Web3 Gaming',
    label: 'Full-stack Web3 product architecture',
    summary:
      'Architected frontend, backend, wallet, database, and smart contract integrations for Web3 gaming and platform systems across Base and Solana, with production-minded data modeling, subgraph indexing, and scalable product surfaces.',
    stack: ['Base', 'Solana', 'Next.js', 'Prisma', 'PostgreSQL', 'Subgraphs', 'Wallet infrastructure'],
  },
];

export const experiences: CvExperience[] = [
  {
    period: ['Jul 2025 - Present'],
    role: 'Co-Founder & Full-Stack Product Engineer',
    company: 'Velvet Neuron',
    summary:
      'Co-founded a product engineering studio delivering full-stack applications, Web3 platforms, automation systems, and growth infrastructure for client and product-led initiatives.',
    highlights: [
      'Own architecture, frontend, backend, database, deployment, analytics, and iteration across production systems in consultancy-style engagements.',
      'Collaborate directly with founders, operators, and business stakeholders to turn product requirements into maintainable technical systems.',
      'Ship modern applications across Next.js, TypeScript, Prisma, PostgreSQL, Redis, Web3 auth, smart contracts, GTM, PostHog, Vercel, Railway, and Cloudflare.',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Web3', 'GTM', 'PostHog', 'AWS'],
  },
  {
    period: ['Dec 2024 - Jul 2025'],
    role: 'Frontend Engineer, Identity & Authorization',
    company: 'Human IT · Burberry',
    summary:
      'Integrated into Burberry engineering teams to improve secure identity, profile, and authorization experiences across enterprise-scale customer and internal platforms.',
    highlights: [
      'Contributed to authentication flows, profile surfaces, permissions management, and policy-driven access-control UI.',
      'Improved frontend architecture, shared internal libraries, validation, mobile responsiveness, error handling, and maintainability across critical user flows.',
      'Used New Relic for production monitoring and observability across customer-facing platform surfaces.',
      'Collaborated with product, backend, and microservices teams in a client environment with strong requirements for reliability, security, and platform consistency.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Microservices', 'Access control', 'New Relic'],
  },
  {
    period: ['Jul 2025 - Oct 2025', 'Feb 2024 - Nov 2024'],
    periodDetails: [
      {
        date: 'Jul 2025 - Oct 2025',
        label: 'BeJobs product engagement',
      },
      {
        date: 'Feb 2024 - Nov 2024',
        label: 'IoT desktop platform engagement',
      },
    ],
    role: 'Frontend & Full-Stack Product Engineer',
    company: 'Boost IT · Made',
    summary:
      'Delivered production web, mobile, API, and desktop product work across embedded engineering engagements.',
    highlights: [
      'Built BeJobs product surfaces across Next.js, React Native, and NestJS, including REST APIs, authentication flows, application forms, and push-notification integration.',
      'Developed a cross-platform Electron application for IoT device configuration, including React interfaces, Node.js logic, and network device interaction.',
      'Worked inside cross-functional teams to deliver production-ready product features with TypeScript, testing, and Azure-backed delivery pipelines.',
    ],
    stack: ['Next.js', 'React Native', 'NestJS', 'Electron', 'Node.js', 'TypeScript', 'Vitest', 'Azure DevOps'],
  },
  {
    period: ['Oct 2025', 'Oct 2020 - Feb 2024'],
    periodDetails: [
      {
        date: 'Oct 2025',
        label: 'Targeted stabilization engagement',
      },
      {
        date: 'Oct 2020 - Feb 2024',
        label: 'Primary multi-region platform ownership',
      },
    ],
    role: 'Frontend & React Native Engineer',
    company: 'Syone · Domino’s Norway & Sweden',
    summary:
      'Owned key frontend and mobile surfaces for Domino’s Norway and Sweden across large-scale consumer e-commerce, back-office, and React Native ecosystems.',
    highlights: [
      'Led production work across back-office, customer-facing mobile apps, and web frontend repositories using React, React Native, Next.js, TypeScript, and Material UI.',
      'Implemented GTM analytics, Sanity.io content workflows, Adyen/native payment flows, internationalization, customer-facing UX improvements, and the frontend migration from Norway to Sweden.',
      'Used Azure Application Insights for production monitoring and diagnostics across country-specific platform surfaces.',
      'Managed Azure DevOps CI/CD workflows across QA and production environments for multiple country-specific apps, coordinating releases for different platform surfaces.',
      'Collaborated with marketing, product, backend, and stakeholder teams on analytics requirements, platform continuity, and multi-region release needs.',
      'Returned for a focused contract to revive an untouched React Native app and restore it to a stable, maintainable version.',
    ],
    stack: ['React', 'React Native', 'Next.js', 'TypeScript', 'Material UI', 'Sanity.io', 'Adyen', 'GTM', 'Azure Application Insights', 'i18n', 'Payments', 'Azure DevOps', 'CI/CD'],
  },
  {
    period: ['Apr 2019 - Oct 2020'],
    role: 'Frontend Engineer',
    company: 'Upbeater',
    summary:
      'Sole frontend engineer for an e-learning platform, translating Figma designs and product requirements into a mobile-first React application.',
    highlights: [
      'Implemented course catalog, video player, quiz system, progress tracking, user dashboard, and admin dashboard flows.',
      'Partnered closely with backend engineering to align product behavior, delivery scope, and implementation details across the full application.',
    ],
    stack: ['React', 'Bootstrap', 'Figma', 'Responsive UI'],
  },
];

export const education = [
  {
    period: 'Sep 2017 - Jun 2021',
    institution: 'ISCTE - Instituto Universitario de Lisboa',
    degree: 'Computer Science and Business Management',
    note: 'GPA 4',
  },
  {
    period: 'Feb 2020 - Jun 2020',
    institution: 'Silesian University of Technology, Gliwice',
    degree: 'Erasmus Exchange',
    note: null,
  },
];

export const certificates = [
  {
    title: "Merit Diploma (Bachelor's Degree Finalist) - ISCTE",
    period: 'March 2026',
  },
  {
    title: 'Microsoft Azure Administrator Associate',
    period: 'June 2021 - June 2022',
  },
  {
    title: 'Microsoft Certified Azure Fundamentals',
    period: 'December 2020',
  },
  {
    title: 'Introduction to Cybersecurity, Cisco',
    period: 'November 2019',
  },
];

export const flatSkills = skillGroups.flatMap((group) => group.skills);
