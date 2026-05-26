import type { MetadataRoute } from 'next';
import { AI_SEARCH_CRAWLERS } from '@/lib/ai-optimization';
import { SITE_URL } from '@/lib/seo';

const BASE_URL = SITE_URL.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      ...AI_SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
