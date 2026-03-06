'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SectionDivider: React.FC = () => (
  <div className="relative py-4">
    <motion.div
      className="h-px w-full max-w-7xl mx-auto"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15), transparent)',
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    />
  </div>
);
