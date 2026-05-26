import type { Metadata } from 'next';
import { JsonLd } from '@/components/json-ld';
import { CvPage } from '@/components/cv-page';
import { flatSkills } from '@/lib/cv-data';
import {
  SITE_NAME,
  SITE_URL,
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
    ? 'João Manteigas | Cofundador da Velvet Neuron'
    : 'João Manteigas | Velvet Neuron Founder Profile';
  const description = isPortuguese
    ? 'Perfil de João Manteigas, cofundador da Velvet Neuron e engenheiro de produto full-stack especializado em Next.js, automação, IA aplicada, SEO técnico e produtos Web2/Web3.'
    : 'Profile of João Manteigas, Velvet Neuron co-founder and full-stack product engineer focused on Next.js, automation, applied AI, technical SEO, and Web2/Web3 products.';

  return {
    title,
    description,
    keywords: [
      'Joao Manteigas',
      'Velvet Neuron',
      'Full-Stack Engineer',
      'FE Heavy Engineer',
      'Product Engineer',
      'Next.js developer',
      'React developer',
      'React Native developer',
      'TypeScript developer',
      'Web3 engineer',
      'Frontend architect',
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

export default async function LocalizedCvPage({ params }: PageProps) {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const isPortuguese = activeLocale === 'pt';
  const pageUrl = buildLocalizedUrl(activeLocale, '/cv');
  const profileDescription = isPortuguese
    ? 'João Manteigas é cofundador da Velvet Neuron e engenheiro de produto full-stack focado em websites preparados para IA, automação, ferramentas internas, SEO técnico e produtos Web2/Web3.'
    : 'João Manteigas is the co-founder of Velvet Neuron and a full-stack product engineer focused on AI-search ready websites, automation, internal tools, technical SEO, and Web2/Web3 products.';
  const jobTitle = isPortuguese
    ? 'Cofundador e engenheiro de produto full-stack'
    : 'Co-founder and full-stack product engineer';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profile`,
        url: pageUrl,
        name: isPortuguese
          ? 'Perfil de João Manteigas'
          : 'João Manteigas Founder Profile',
        description: profileDescription,
        inLanguage: activeLocale === 'pt' ? 'pt-PT' : 'en',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        mainEntity: {
          '@id': `${SITE_URL}/#founder`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: 'João Manteigas',
        alternateName: 'Joao Manteigas',
        jobTitle,
        description: profileDescription,
        url: pageUrl,
        worksFor: {
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
        knowsAbout: flatSkills,
      },
    ],
  };

  return (
    <>
      <CvPage locale={activeLocale} />
      <JsonLd data={jsonLd} />
    </>
  );
}
