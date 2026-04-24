'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, Images } from 'lucide-react';
import Image from 'next/image';
import { ImageGallery } from '@/components/image-gallery';

const projects = [
  {
    name: 'dominos_norway',
    slug: 'dominos',
    imageCount: 3,
    accent: 'from-[#c67c4e]/20 via-[#f3e5d2]/65 to-transparent',
  },
  {
    name: 'dominos_sweden',
    slug: 'dominos',
    imageCount: 3,
    accent: 'from-[#0f766e]/16 via-[#ecfaf7]/65 to-transparent',
  },
  {
    name: 'burberry',
    slug: 'burberry',
    imageCount: 0,
    accent: 'from-slate-300/35 via-white to-transparent',
  },
  {
    name: 'talho_halal',
    slug: 'talho-halal',
    imageCount: 2,
    accent: 'from-emerald-200/55 via-white to-transparent',
  },
  {
    name: 'scoreplay',
    slug: 'scoreplay',
    imageCount: 3,
    accent: 'from-sky-200/55 via-white to-transparent',
  },
  {
    name: 'quizflow',
    slug: 'quizflow',
    imageCount: 5,
    accent: 'from-amber-200/55 via-white to-transparent',
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

    if (images.length === 0) {
      return;
    }

    setActiveProject({
      name: t(`projects.${project.name}.name`),
      images,
    });
    setGalleryOpen(true);
  };

  return (
    <>
      <section id="portfolio" className="px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {t('description')}
            </p>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-slate-900/10 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.25)] sm:px-6">
            {t('note')}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {projects.map((project, idx) => {
              const hasImages = project.imageCount > 0;
              const firstImage = hasImages ? `/gallery/${project.slug}-1.png` : null;

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.28)] transition-all duration-300 ${
                    hasImages ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onClick={() => hasImages && openGallery(project)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {firstImage && (
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-5 top-5 z-20 h-20 w-28 overflow-hidden rounded-2xl border border-slate-900/10 shadow-lg"
                        >
                          <Image
                            src={firstImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  <div className="relative z-10">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {t(`projects.${project.name}.category`)}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                      {t(`projects.${project.name}.name`)}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                      {t(`projects.${project.name}.description`)}
                    </p>

                    <div className="mt-8 flex items-center justify-between gap-4">
                      {hasImages ? (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c5c]">
                          {t('view_project')}
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-slate-500">
                          {t('private_work')}
                        </span>
                      )}

                      {hasImages && (
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-600">
                          <Images className="h-3.5 w-3.5" />
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

      <ImageGallery
        images={activeProject?.images ?? []}
        projectName={activeProject?.name ?? ''}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
};
