import type { MetadataRoute } from "next";
import { SITE_URL } from '@/lib/seo';

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep internal Next.js infrastructure and API routes private
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

// ─── NOTE ON llms.txt ────────────────────────────────────────────────────────
// Next.js MetadataRoute.Robots doesn't have a built-in llms field yet.
// The llms.txt reference is served directly at /llms.txt via the route handler
// at app/llms.txt/route.ts. Major LLM crawlers (GPTBot, ClaudeBot, PerplexityBot)
// will discover it automatically by convention at that path, just like robots.txt.
//
// If you need a raw robots.txt with the LLMs line, add this manually via
// a public/robots.txt override (which takes precedence over this file):
//
//   User-agent: *
//   Allow: /
//   Disallow: /api/
//   Disallow: /_next/
//   Sitemap: https://www.velvetneuron.com/sitemap.xml
//   LLMs: https://www.velvetneuron.com/llms.txt
