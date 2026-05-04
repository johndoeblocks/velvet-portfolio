'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const categories = [
  {
    label: 'Frontend',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    techs: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'Infrastructure',
    techs: ['Docker', 'AWS', 'GraphQL'],
  },
];

export const TechnologySection: React.FC = () => {
  const t = useTranslations('technology');

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-brand-tertiary">
            Tech Stack
          </span>
          <h2 className="mb-6 bg-gradient-to-b from-brand-inverse to-brand-tertiary bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-brand-inverse/68">
            {t('description')}
          </p>
        </motion.div>

        {/* Categorized tech badges */}
        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            >
              <h3 className="mb-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-brand-inverse/42">
                {cat.label}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {cat.techs.map((tech, techIdx) => (
                  <motion.span
                    key={techIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: catIdx * 0.1 + techIdx * 0.05,
                    }}
                    whileHover={{ y: -3, borderColor: 'rgba(166,242,77,0.36)' }}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-brand-inverse/76 transition-all duration-300 hover:bg-white/[0.06]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
