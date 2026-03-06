'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const steps = [
  { key: 'step_1', number: '01' },
  { key: 'step_2', number: '02' },
  { key: 'step_3', number: '03' },
  { key: 'step_4', number: '04' },
  { key: 'step_5', number: '05' },
];

export const ProcessSection: React.FC = () => {
  const t = useTranslations('process');

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
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-purple-400/80 mb-4 block">
            How we work
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
            {t('description')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex gap-8 mb-12 last:mb-0"
            >
              {/* Number dot */}
              <div className="relative z-10 flex-shrink-0 w-16 flex justify-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-sm font-semibold text-purple-400"
                  whileHover={{ scale: 1.15, borderColor: 'rgba(139,92,246,0.5)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {step.number}
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                className="group flex-grow rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
                whileHover={{ x: 4 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`${step.key}.description`)}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
