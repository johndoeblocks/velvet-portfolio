'use client';

import { motion } from 'framer-motion';

export const PromoVideoSection: React.FC = () => {
  return (
    <section className="relative z-10 py-20 px-6" id="promo-video">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white">Vídeo Promocional</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 md:p-4"
        >
          <video
            className="w-full aspect-video rounded-xl bg-black/40"
            src="/videos/VSL.mp4"
            controls
            preload="metadata"
            playsInline
          />
        </motion.div>
      </div>
    </section>
  );
};
