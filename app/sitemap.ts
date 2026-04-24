import type { MetadataRoute } from 'next';
import { landingPagesData } from '@/lib/landing-pages-data';
import { LOCALES, buildLocalizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'];
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/cv', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString();

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
