import type { Metadata } from 'next';
import { CvPage } from '@/components/cv-page';
import {
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const isPortuguese = activeLocale === 'pt';
  const title = isPortuguese
    ? 'CV de João Manteigas | Velvet Neuron'
    : 'Joao Manteigas CV | Velvet Neuron';
  const description = isPortuguese
    ? 'Curriculum Vitae de João Manteigas, cofundador da Velvet Neuron e Full Stack Web Developer especializado em Next.js, React, TypeScript e produtos digitais de alta performance.'
    : 'Curriculum Vitae of Joao Manteigas, Velvet Neuron co-founder and Full Stack Web Developer specialised in Next.js, React, TypeScript, and high-performance digital products.';

  return {
    title,
    description,
    keywords: [
      'Joao Manteigas',
      'Velvet Neuron',
      'Full Stack Web Developer',
      'Next.js developer',
      'React developer',
      'TypeScript developer',
      'Curriculum Vitae',
      'CV',
    ],
    openGraph: {
      title,
      description,
      locale: isPortuguese ? 'pt_PT' : 'en_US',
      type: 'profile',
      url: buildLocalizedUrl(activeLocale, '/cv'),
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
      title,
      description,
      images: ['/logo.png'],
    },
    alternates: buildLocaleAlternates('/cv', activeLocale),
  };
}

export default function LocalizedCvPage() {
  return <CvPage />;
}
