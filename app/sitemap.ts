import type { MetadataRoute } from 'next';
import { landingPagesData } from '@/lib/landing-pages-data';
import { LOCALES, buildLocalizedUrl } from '@/lib/seo';

// Force static generation at build time — no server-side re-evaluation
export const dynamic = 'force-static';

// ─── STATIC ROUTES ───────────────────────────────────────────────────────────
// Add every locale-prefixed static page here.
// Priority guide: homepage 1.0 → main sections 0.9 → support pages 0.7

const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'];
}[] = [
  { path: '',          priority: 1.0, changeFrequency: 'weekly'  }, // homepage /pt & /en
  { path: '/contact',  priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sobre',    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/servicos', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/cv',       priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString();

  // 1. Static pages for every locale
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(
    ({ path, priority, changeFrequency }) =>
      LOCALES.map((locale) => ({
        url: buildLocalizedUrl(locale, path || '/'),
        lastModified: today,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: buildLocalizedUrl('en', path || '/'),
            pt: buildLocalizedUrl('pt', path || '/'),
          },
        },
      }))
  );

  // 2. Landing pages — all 95 dynamic service × location combinations
  //    These are the highest-value SEO pages; give them strong signals.
  const landingEntries: MetadataRoute.Sitemap = landingPagesData.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: buildLocalizedUrl(locale, `/${page.slug}`),
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: buildLocalizedUrl('en', `/${page.slug}`),
          pt: buildLocalizedUrl('pt', `/${page.slug}`),
        },
      },
    }))
  );

  return [...staticEntries, ...landingEntries];
}
