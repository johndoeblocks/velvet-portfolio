import type { Metadata } from 'next';

export const SITE_URL = 'https://www.velvetneuron.com';
export const SITE_NAME = 'Velvet Neuron';
export const LOCALES = ['en', 'pt'] as const;

export type AppLocale = (typeof LOCALES)[number];

export function toAppLocale(locale: string): AppLocale {
  return locale === 'pt' ? 'pt' : 'en';
}

export function normalizeContentPath(pathname: string = '/') {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withoutLocale = withLeadingSlash.replace(/^\/(en|pt)(?=\/|$)/, '') || '/';

  if (withoutLocale === '/') {
    return '/';
  }

  return withoutLocale.replace(/\/+$/, '') || '/';
}

export function buildLocalizedPath(locale: AppLocale, pathname: string = '/') {
  const normalizedPath = normalizeContentPath(pathname);

  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function buildLocalizedUrl(locale: AppLocale, pathname: string = '/') {
  return buildAbsoluteUrl(buildLocalizedPath(locale, pathname));
}

export function buildLocaleAlternates(
  pathname: string = '/',
  locale?: AppLocale
): NonNullable<Metadata['alternates']> {
  const enPath = buildLocalizedPath('en', pathname);
  const ptPath = buildLocalizedPath('pt', pathname);

  return {
    ...(locale ? { canonical: buildAbsoluteUrl(buildLocalizedPath(locale, pathname)) } : {}),
    languages: {
      en: buildAbsoluteUrl(enPath),
      pt: buildAbsoluteUrl(ptPath),
      'x-default': buildAbsoluteUrl(enPath),
    },
  };
}
