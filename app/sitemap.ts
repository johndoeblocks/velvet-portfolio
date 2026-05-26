import type { MetadataRoute } from 'next';
import { AI_OPTIMIZATION_LAST_REVIEWED, AI_OPTIMIZATION_PATH } from '@/lib/ai-optimization';
import { BLOG_POSTS, getBlogUrl } from '@/lib/blog-data';
import { landingPagesData } from '@/lib/landing-pages-data';
import { LOCALES, buildLocalizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC_PATHS: {
  path: string;
  lastModified: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'];
}[] = [
  { path: '', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 1.0, changeFrequency: 'weekly' },
  { path: AI_OPTIMIZATION_PATH, lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.92, changeFrequency: 'monthly' },
  { path: '/blog', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.8, changeFrequency: 'weekly' },
  { path: '/agentes-ia', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.85, changeFrequency: 'monthly' },
  { path: '/automacao-processos', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.85, changeFrequency: 'monthly' },
  { path: '/aplicacoes-web', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.85, changeFrequency: 'monthly' },
  { path: '/sites-ecommerce', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.85, changeFrequency: 'monthly' },
  { path: '/cv', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms', lastModified: AI_OPTIMIZATION_LAST_REVIEWED, priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(
    ({ path, lastModified, priority, changeFrequency }) =>
      LOCALES.map((locale) => ({
        url: buildLocalizedUrl(locale, path || '/'),
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: buildLocalizedUrl('en', path || '/'),
            pt: buildLocalizedUrl('pt', path || '/'),
            'x-default': buildLocalizedUrl('en', path || '/'),
          },
        },
      }))
  );

  const landingEntries: MetadataRoute.Sitemap = landingPagesData.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: buildLocalizedUrl(locale, `/${page.slug}`),
      lastModified: AI_OPTIMIZATION_LAST_REVIEWED,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: buildLocalizedUrl('en', `/${page.slug}`),
          pt: buildLocalizedUrl('pt', `/${page.slug}`),
          'x-default': buildLocalizedUrl('en', `/${page.slug}`),
        },
      },
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
    LOCALES.map((locale) => ({
      url: getBlogUrl(locale, post),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.82 : 0.76,
      alternates: {
        languages: {
          en: getBlogUrl('en', post),
          pt: getBlogUrl('pt', post),
          'x-default': getBlogUrl('en', post),
        },
      },
    }))
  );

  return [...staticEntries, ...landingEntries, ...blogEntries];
}
