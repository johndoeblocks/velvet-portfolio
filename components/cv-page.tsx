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
  Mail,
  Phone,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from '@/components/language-switcher';
import {
  cvProfile,
  education,
  experiences,
  featuredProjects,
  skillGroups,
} from '@/lib/cv-data';

export function CvPage() {
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
        className="absolute left-[-10%] top-[-12%] h-[520px] w-[520px] rounded-full bg-brand-secondary/14 blur-[120px]"
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
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.08] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="self-start sm:self-auto"
            >
              <LanguageSwitcher />
            </motion.div>
          </div>

          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl md:p-12"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-tertiary animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-gray-400">
                Curriculum Vitae
              </span>
            </div>

            <h1 className="mb-3 text-5xl font-bold leading-[0.95] tracking-tight text-glow sm:text-7xl">
              <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
                João Manteigas
              </span>
            </h1>

            <p className="mb-8 text-lg font-light uppercase tracking-[0.24em] text-gray-400 md:text-xl">
              {cvProfile.title}
            </p>

            <p className="max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
              {cvProfile.summary}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {cvProfile.signals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm leading-relaxed text-gray-300"
                >
                  {signal}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              <ContactPill href="tel:969370801" icon={<Phone className="h-3.5 w-3.5" />}>
                969 370 801
              </ContactPill>
              <ContactPill
                href="mailto:joaooliveiramanteigas@gmail.com"
                icon={<Mail className="h-3.5 w-3.5" />}
              >
                Email
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
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
                      {group.label}
                    </h3>
                    <SkillChipList items={group.skills} />
                  </div>
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
                    <div className="space-y-2">
                      {(experience.periodDetails ??
                        experience.period.map((period) => ({ date: period, label: null }))).map((period) => (
                        <div
                          key={period.date}
                          className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2"
                        >
                          <span className="block font-mono text-sm tracking-tight text-gray-400">
                            {period.date}
                          </span>
                          {period.label && (
                            <span className="mt-1 block text-xs leading-snug text-gray-600">
                              {period.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {experience.role}
                      </h3>
                      <p className="mb-2 text-sm text-brand-tertiary">{experience.company}</p>
                      <p className="mb-3 text-sm leading-relaxed text-gray-300 md:text-base">
                        {experience.summary}
                      </p>
                      <ul className="space-y-2 text-sm leading-relaxed text-gray-400">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-tertiary/80" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <SkillChipList
                        items={experience.stack}
                        outerClassName="mt-4"
                        chipClassName="border-white/[0.07] bg-transparent px-2.5 py-1 text-xs text-gray-500 hover:border-white/[0.07] hover:bg-transparent hover:text-gray-500"
                      />
                      {experience.company === 'Velvet Neuron' && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
                            Selected systems delivered through Velvet Neuron
                          </h4>
                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {featuredProjects.map((project) => (
                              <article
                                key={project.name}
                                className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"
                              >
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-tertiary">
                                  {project.label}
                                </p>
                                <h5 className="mt-2 text-base font-semibold text-white">
                                  {project.name}
                                </h5>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                                  {project.summary}
                                </p>
                                <SkillChipList
                                  items={project.stack}
                                  outerClassName="mt-3"
                                  chipClassName="bg-transparent px-2.5 py-1 text-xs text-gray-500 hover:border-white/[0.08] hover:bg-transparent hover:text-gray-500"
                                />
                              </article>
                            ))}
                          </div>
                        </div>
                      )}
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
                      <p className="text-sm text-brand-tertiary md:text-base">{item.degree}</p>
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
}

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

const SkillChipList = ({
  items,
  outerClassName,
  chipClassName,
}: {
  items: string[];
  outerClassName?: string;
  chipClassName?: string;
}) => (
  <div className={cx('flex w-full justify-center', outerClassName)} style={{ width: '100%' }}>
    <div
      className="flex w-full flex-wrap content-center items-center justify-center gap-2.5"
      style={{
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {items.map((item) => (
        <span
          key={item}
          className={cx(
            'inline-flex max-w-full shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-center text-sm text-gray-300 transition-all duration-300 hover:border-brand-tertiary/40 hover:bg-white/[0.07] hover:text-white',
            chipClassName,
          )}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const SectionTitle = ({ icon, title }: { icon: ReactNode; title: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-brand-tertiary">{icon}</span>
    <h2 className="text-2xl tracking-tight text-white">{title}</h2>
  </div>
);

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');
