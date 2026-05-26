import { ImageResponse } from 'next/og';
import { toAppLocale } from '@/lib/seo';

export const alt = 'Velvet Neuron Optimize for AI Search';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

type ImageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const copy = {
  en: {
    eyebrow: 'Velvet Neuron',
    title: 'Optimize for AI Search',
    description:
      'Structured websites that answer engines can understand, quote, and cite.',
    factors: ['Extractability', 'Quotability', 'Authority', 'Freshness', 'Entity Clarity'],
    locale: 'EN',
  },
  pt: {
    eyebrow: 'Velvet Neuron',
    title: 'Otimização para Pesquisa com IA',
    description:
      'Websites estruturados para motores de resposta com IA compreenderem, citarem e recomendarem.',
    factors: ['Extração', 'Citabilidade', 'Autoridade', 'Atualidade', 'Clareza de entidade'],
    locale: 'PT-PT',
  },
} as const;

export default async function OpenGraphImage({ params }: ImageProps) {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = copy[activeLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f6f1e8',
          color: '#17211d',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(120deg, rgba(246,241,232,0.98) 0%, rgba(255,253,247,0.96) 48%, rgba(226,213,190,0.74) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -170,
            right: -140,
            width: 520,
            height: 520,
            borderRadius: 999,
            background:
              'radial-gradient(circle, rgba(18,78,70,0.28) 0%, rgba(18,78,70,0.08) 42%, rgba(18,78,70,0) 72%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -210,
            left: -160,
            width: 620,
            height: 620,
            borderRadius: 999,
            background:
              'radial-gradient(circle, rgba(155,90,50,0.22) 0%, rgba(155,90,50,0.08) 40%, rgba(155,90,50,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 44,
            border: '1px solid rgba(18,78,70,0.18)',
            borderRadius: 34,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            width: '100%',
            padding: '74px 82px',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  backgroundColor: '#124e46',
                  color: '#f8f3ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                V
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6 }}>
                  {t.eyebrow}
                </div>
                <div style={{ marginTop: 4, fontSize: 17, color: '#5f675f' }}>
                  {activeLocale === 'pt'
                    ? 'Arquitetura de visibilidade em IA'
                    : 'AI visibility architecture'}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(18,78,70,0.18)',
                borderRadius: 999,
                padding: '10px 16px',
                color: '#124e46',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {t.locale}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 840 }}>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                borderRadius: 999,
                backgroundColor: 'rgba(18,78,70,0.1)',
                color: '#124e46',
                padding: '10px 18px',
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 3,
              }}
            >
              GEO · LLM SEO · AI Overviews
            </div>
            <h1
              style={{
                margin: '26px 0 0',
                fontSize: 86,
                lineHeight: 0.95,
                letterSpacing: -3.5,
                fontWeight: 800,
                maxWidth: 850,
              }}
            >
              {t.title}
            </h1>
            <p
              style={{
                margin: '30px 0 0',
                fontSize: 31,
                lineHeight: 1.24,
                color: '#3f4a43',
                maxWidth: 840,
              }}
            >
              {t.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {t.factors.map((factor) => (
              <div
                key={factor}
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(18,78,70,0.2)',
                  backgroundColor: 'rgba(255,253,247,0.74)',
                  padding: '12px 17px',
                  fontSize: 18,
                  color: '#124e46',
                  fontWeight: 700,
                }}
              >
                {factor}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
