'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Zap, Brain, Gauge, TrendingUp, Cog } from 'lucide-react';

const services = [
  { icon: Cog, key: 'product_engineering' },
  { icon: Brain, key: 'ai_automation' },
  { icon: Gauge, key: 'web_platforms' },
  { icon: TrendingUp, key: 'trading_data' },
  { icon: Zap, key: 'performance' },
];

export const ServicesSection: React.FC = () => {
  const t = useTranslations('services');

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-purple-400/80 mb-4 block">
            What we do
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
            {t('description')}
          </p>
        </motion.div>

        {/* Cards – responsive grid: 1 col mobile, 2 col md, 3 on lg (first 3), then 2 centered */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 ${
                  idx >= 3 ? 'lg:col-span-1 lg:last:col-start-2' : ''
                }`}
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/[0.06] to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:border-purple-500/30 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {t(service.key)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`${service.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
