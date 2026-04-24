import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { BLOG_SLUGS } from './lib/blog-routes';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const blogArticleMatch = request.nextUrl.pathname.match(/^\/blog\/([^/]+)\/?$/);

  if (blogArticleMatch) {
    const slug = decodeURIComponent(blogArticleMatch[1]);
    const localeMatch = Object.values(BLOG_SLUGS).find(
      (slugs) => slugs.en === slug || slugs.pt === slug
    );

    if (localeMatch) {
      const locale = localeMatch.en === slug ? 'en' : 'pt';
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/blog/${slug}`;

      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/blog/:path*'],
};
