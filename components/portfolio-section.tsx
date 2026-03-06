'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Images, ArrowUpRight } from 'lucide-react';
import { ImageGallery } from '@/components/image-gallery';
import Image from 'next/image';

const projects = [
  {
    name: 'dominos_norway',
    slug: 'dominos',
    imageCount: 3,
    accent: 'from-red-500/20 to-orange-500/10',
  },
  {
    name: 'dominos_sweden',
    slug: 'dominos',
    imageCount: 3,
    accent: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    name: 'burberry',
    slug: 'burberry',
    imageCount: 0,
    accent: 'from-neutral-400/20 to-stone-500/10',
  },
  {
    name: 'talho_halal',
    slug: 'talho-halal',
    imageCount: 2,
    accent: 'from-emerald-500/20 to-green-500/10',
  },
  {
    name: 'scoreplay',
    slug: 'scoreplay',
    imageCount: 3,
    accent: 'from-blue-500/20 to-sky-500/10',
  },
  {
    name: 'quizflow',
    slug: 'quizflow',
    imageCount: 5,
    accent: 'from-purple-500/20 to-violet-500/10',
  },
];

function getProjectImages(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/gallery/${slug}-${i + 1}.png`);
}

export const PortfolioSection: React.FC = () => {
  const t = useTranslations('portfolio');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<{
    name: string;
    images: string[];
  } | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const openGallery = (project: (typeof projects)[number]) => {
    const images = getProjectImages(project.slug, project.imageCount);
    if (images.length === 0) return;
    setActiveProject({
      name: t(`projects.${project.name}.name`),
      images,
    });
    setGalleryOpen(true);
  };

  return (
    <>
      <section id="portfolio" className="relative py-32 px-6 overflow-hidden">
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
              Selected Work
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
              {t('description')}
            </p>
          </motion.div>

          {/* Project cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, idx) => {
              const hasImages = project.imageCount > 0;
              const firstImage = hasImages
                ? `/gallery/${project.slug}-1.png`
                : null;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 ${
                    hasImages ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onClick={() => hasImages && openGallery(project)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Accent gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Thumbnail preview on hover */}
                  {firstImage && (
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-4 right-4 w-24 h-16 rounded-lg overflow-hidden border border-white/10 z-20"
                        >
                          <Image
                            src={firstImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  <div className="relative z-10 p-8">
                    {/* Category */}
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-500 mb-4 block">
                      {t(`projects.${project.name}.category`)}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {t(`projects.${project.name}.name`)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {t(`projects.${project.name}.description`)}
                    </p>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      {hasImages ? (
                        <span className="text-sm font-medium text-purple-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                          {t('view_project')}
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600">Coming soon</span>
                      )}
                      {hasImages && (
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                          <Images className="w-3.5 h-3.5" />
                          <span>{project.imageCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery modal */}
      <ImageGallery
        images={activeProject?.images ?? []}
        projectName={activeProject?.name ?? ''}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
};
