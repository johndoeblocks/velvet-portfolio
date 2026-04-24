import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
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
    ? 'Termos de Serviço | Velvet Neuron'
    : 'Terms of Service | Velvet Neuron';
  const description = isPortuguese
    ? 'Termos resumidos sobre propostas, âmbito, propriedade intelectual e suporte nos projetos da Velvet Neuron.'
    : 'Short terms covering proposals, scope, intellectual property, and support for Velvet Neuron projects.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: isPortuguese ? 'pt_PT' : 'en_US',
      type: 'article',
      url: buildLocalizedUrl(activeLocale, '/terms'),
      siteName: 'Velvet Neuron',
    },
    alternates: buildLocaleAlternates('/terms', activeLocale),
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const isPortuguese = toAppLocale(locale) === 'pt';

  if (isPortuguese) {
    return (
      <LegalPage
        badge="Legal"
        backLabel="Voltar ao início"
        title="Termos de Serviço"
        intro="Resumo simples das condições gerais aplicáveis a propostas e projetos desenvolvidos pela Velvet Neuron."
        sections={[
          {
            title: 'Âmbito do trabalho',
            body: (
              <>
                <p>
                  O âmbito específico de cada projeto é definido em proposta, orçamento ou acordo
                  escrito entre as partes.
                </p>
                <p>
                  Qualquer pedido adicional fora desse âmbito pode implicar nova estimativa,
                  revisão de prazo ou fase adicional de trabalho.
                </p>
              </>
            ),
          },
          {
            title: 'Propostas e pagamentos',
            body: (
              <>
                <p>
                  Valores, calendário de pagamento e marcos de entrega são definidos caso a caso
                  antes do início do projeto.
                </p>
                <p>
                  O trabalho começa após alinhamento comercial e confirmação do arranque.
                </p>
              </>
            ),
          },
          {
            title: 'Conteúdos e aprovações do cliente',
            body: (
              <>
                <p>
                  O cliente continua responsável por aprovar conteúdos, textos, ativos de marca e
                  decisões relevantes dentro de prazos razoáveis.
                </p>
                <p>
                  Atrasos de feedback ou de material podem afetar o calendário acordado.
                </p>
              </>
            ),
          },
          {
            title: 'Propriedade intelectual e suporte',
            body: (
              <>
                <p>
                  Após pagamento dos valores acordados, a propriedade do trabalho final entregue é
                  transferida conforme definido na proposta ou contrato.
                </p>
                <p>
                  Manutenção contínua, novas funcionalidades ou suporte pós-lançamento são
                  combinados em separado quando necessário.
                </p>
              </>
            ),
          },
        ]}
      />
    );
  }

  return (
    <LegalPage
      badge="Legal"
      backLabel="Back to home"
      title="Terms of Service"
      intro="A simple summary of the general terms that apply to proposals and project work delivered by Velvet Neuron."
      sections={[
        {
          title: 'Scope of work',
          body: (
            <>
              <p>
                The specific scope of each project is defined in a written proposal, estimate, or
                agreement between both parties.
              </p>
              <p>
                Requests outside that agreed scope may require a new estimate, timeline revision,
                or additional phase of work.
              </p>
            </>
          ),
        },
        {
          title: 'Proposals and payments',
          body: (
            <>
              <p>
                Pricing, payment schedule, and delivery milestones are agreed case by case before
                the project starts.
              </p>
              <p>Work begins once commercial alignment and project start are confirmed.</p>
            </>
          ),
        },
        {
          title: 'Client content and approvals',
          body: (
            <>
              <p>
                The client remains responsible for approving content, brand assets, and key
                decisions within a reasonable timeframe.
              </p>
              <p>Delays in feedback or missing materials can affect the agreed schedule.</p>
            </>
          ),
        },
        {
          title: 'Intellectual property and support',
          body: (
            <>
              <p>
                Once agreed payments are complete, ownership of the final delivered work transfers
                according to the proposal or contract.
              </p>
              <p>
                Ongoing maintenance, new features, or post-launch support are scoped separately
                when needed.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
