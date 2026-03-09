'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  Code,
  Github,
  Globe,
  GraduationCap,
  Languages,
  Linkedin,
  Phone,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

const skills = [
  'React',
  'NextJS',
  'JavaScript',
  'TypeScript',
  'NodeJS',
  'Java',
  'SQL',
  'Microsoft Azure',
  'Electron',
  'React Native',
  'Redux',
  'Styled Components',
  'Vitest',
  'CI/CD',
];

const experiences = [
  {
    period: 'Jul 2025 – Present',
    role: 'Freelance Developer',
    company: 'Velvet Neuron',
    description:
      'Co-founded a development company building digital products for Web2 and Web3 clients. Designing and developing full-stack applications, dApps, and modern web platforms — from architecture to deployment.',
  },
  {
    period: 'Dec 2024 – Jul 2025',
    role: 'Freelance Full Stack Developer',
    company: 'Human IT · Burberry',
    description:
      'Contributed to the Identity and Authorization team at Burberry, building authentication, access control, and user management systems across internal and customer-facing platforms.',
  },
  {
    period: 'Feb 2024 – Nov 2024',
    role: 'Freelancer',
    company: 'Boost IT',
    description:
      'Developed frontend device configuration application using Electron for cross-platform desktop. Daily use of React, Redux, Styled Components, and Vitest. Azure CI/CD.',
  },
  {
    period: 'Oct 2020 – Feb 2024',
    role: 'Consultant',
    company: 'Syone',
    description:
      'Developed & maintained frontend e-commerce applications, CMS & backoffice systems. Daily use of React, React Native and NextJS with Azure CI/CD.',
  },
  {
    period: 'Apr 2019 – Oct 2020',
    role: 'Full Stack Developer',
    company: 'Upbeater',
    description:
      'UI implementation and improving client-developer communication. Worked with React across multiple projects.',
  },
];

const education = [
  {
    period: 'Sep 2017 – Jun 2021',
    institution: 'ISCTE - Instituto Universitário de Lisboa',
    degree: 'Computer Science and Business Management',
    note: 'GPA 4',
  },
  {
    period: 'Feb 2020 – Jun 2020',
    institution: 'Silesian University of Technology, Gliwice',
    degree: 'Erasmus Exchange',
    note: null,
  },
];

const CvPage = () => {
  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-black text-white noise"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <motion.div
        className="absolute left-[-10%] top-[-12%] h-[520px] w-[520px] rounded-full bg-purple-600/12 blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-12%] right-[-8%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{ x: [0, -25, 0], y: [0, 18, 0], scale: [1.08, 1, 1.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 px-6 py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl md:p-12"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-gray-400">
                Curriculum Vitae
              </span>
            </div>

            <h1 className="mb-3 text-5xl font-black leading-[0.95] tracking-tight text-glow sm:text-7xl">
              <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
                João Manteigas
              </span>
            </h1>

            <p className="mb-8 text-lg font-light uppercase tracking-[0.24em] text-gray-400 md:text-xl">
              Full Stack Web Developer
            </p>

            <p className="max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
              Curious and passionate about technology, graduated in Computer Science and Business Management at ISCTE-IUL. Focused on full stack web development and applying knowledge to reach and fulfill clients&apos; needs.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              <ContactPill href="tel:969370801" icon={<Phone className="h-3.5 w-3.5" />}>
                969 370 801
              </ContactPill>
              <ContactPill
                href="https://velvetneuron.com"
                icon={<Globe className="h-3.5 w-3.5" />}
                external
              >
                velvetneuron.com
              </ContactPill>
              <ContactPill
                href="https://github.com/johndoeblocks"
                icon={<Github className="h-3.5 w-3.5" />}
                external
              >
                GitHub
              </ContactPill>
              <ContactPill
                href="https://www.linkedin.com/in/jo%C3%A3o-manteigas/"
                icon={<Linkedin className="h-3.5 w-3.5" />}
                external
              >
                LinkedIn
              </ContactPill>
            </div>
          </motion.header>

          <div className="mt-8 grid gap-8">
            <SectionCard>
              <SectionTitle icon={<Code className="h-5 w-5" />} title="Skills" />
              <div className="mt-5 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-purple-400/40 hover:bg-white/[0.07] hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle icon={<Briefcase className="h-5 w-5" />} title="Experience" />
              <div className="mt-6 space-y-8">
                {experiences.map((experience) => (
                  <div
                    key={`${experience.period}-${experience.company}`}
                    className="grid grid-cols-1 gap-2 border-b border-white/[0.06] pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[190px_1fr] sm:gap-8"
                  >
                    <span className="font-mono text-sm tracking-tight text-gray-500">
                      {experience.period}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {experience.role}
                      </h3>
                      <p className="mb-2 text-sm text-purple-300">{experience.company}</p>
                      <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle icon={<GraduationCap className="h-5 w-5" />} title="Education" />
              <div className="mt-6 space-y-6">
                {education.map((item) => (
                  <div
                    key={`${item.period}-${item.institution}`}
                    className="grid grid-cols-1 gap-2 border-b border-white/[0.06] pb-6 last:border-b-0 last:pb-0 sm:grid-cols-[190px_1fr] sm:gap-8"
                  >
                    <span className="font-mono text-sm tracking-tight text-gray-500">
                      {item.period}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{item.institution}</h3>
                      <p className="text-sm text-purple-300 md:text-base">{item.degree}</p>
                      {item.note && <p className="mt-1 text-sm text-gray-400">{item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle icon={<Languages className="h-5 w-5" />} title="Languages" />
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                  Portuguese <span className="text-gray-500">· Native</span>
                </span>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                  English <span className="text-gray-500">· Fluent</span>
                </span>
              </div>
            </SectionCard>
          </div>

          <footer className="pt-10 text-center text-sm text-gray-500">
            João Manteigas © {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </motion.main>
  );
};

const SectionCard = ({ children }: { children: ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.55 }}
    className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl md:p-8"
  >
    {children}
  </motion.section>
);

const ContactPill = ({
  children,
  href,
  icon,
  external = false,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
  external?: boolean;
}) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.08] hover:text-white"
  >
    {icon}
    <span>{children}</span>
  </a>
);

const SectionTitle = ({ icon, title }: { icon: ReactNode; title: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-purple-300">{icon}</span>
    <h2 className="text-2xl tracking-tight text-white">{title}</h2>
  </div>
);

export default CvPage;