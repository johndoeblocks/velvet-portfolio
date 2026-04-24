import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: activeLocale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      url: buildLocalizedUrl(activeLocale, '/'),
      siteName: 'Velvet Neuron',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'Velvet Neuron',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/logo.png'],
    },
    alternates: buildLocaleAlternates('/', activeLocale),
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'pt')) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const enableVercelInsights = process.env.VERCEL_ENV === 'production';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {enableVercelInsights ? <SpeedInsights /> : null}
      {children}
    </NextIntlClientProvider>
  );
}
