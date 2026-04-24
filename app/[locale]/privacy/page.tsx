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
    ? 'Política de Privacidade | Velvet Neuron'
    : 'Privacy Policy | Velvet Neuron';
  const description = isPortuguese
    ? 'Resumo da forma como a Velvet Neuron recolhe e usa dados enviados através do formulário de contacto.'
    : 'Short explanation of how Velvet Neuron collects and uses data submitted through the contact form.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: isPortuguese ? 'pt_PT' : 'en_US',
      type: 'article',
      url: buildLocalizedUrl(activeLocale, '/privacy'),
      siteName: 'Velvet Neuron',
    },
    alternates: buildLocaleAlternates('/privacy', activeLocale),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const isPortuguese = toAppLocale(locale) === 'pt';

  if (isPortuguese) {
    return (
      <LegalPage
        badge="Legal"
        backLabel="Voltar ao início"
        title="Política de Privacidade"
        intro="Explicação curta e clara sobre os dados que recolhemos quando entra em contacto com a Velvet Neuron."
        sections={[
          {
            title: 'Que dados recolhemos',
            body: (
              <>
                <p>
                  Recolhemos apenas a informação que decide enviar no formulário de contacto,
                  como nome, email, empresa, telefone opcional e descrição do projeto.
                </p>
                <p>
                  Também podemos receber dados técnicos básicos ligados ao funcionamento do site,
                  como analytics agregados e preferências de consentimento de cookies.
                </p>
              </>
            ),
          },
          {
            title: 'Como usamos esses dados',
            body: (
              <>
                <p>
                  Usamos os dados para responder ao pedido de contacto, perceber o contexto do
                  projeto e preparar os próximos passos com mais clareza.
                </p>
                <p>
                  Não vendemos nem alugamos os seus dados a terceiros.
                </p>
              </>
            ),
          },
          {
            title: 'Armazenamento e partilha',
            body: (
              <>
                <p>
                  Os pedidos podem ser processados através de fornecedores de infraestrutura e
                  email usados para operar o website e responder ao contacto.
                </p>
                <p>
                  Mantemos os dados apenas durante o tempo necessário para comunicação comercial,
                  apoio ao projeto ou cumprimento de obrigações legais.
                </p>
              </>
            ),
          },
          {
            title: 'Os seus direitos',
            body: (
              <>
                <p>
                  Pode pedir acesso, correção ou eliminação dos seus dados a qualquer momento
                  através de <a className="text-[#0f4c5c] underline" href="mailto:hello@velvetneuron.com">hello@velvetneuron.com</a>.
                </p>
                <p>
                  Se tiver dúvidas sobre privacidade ou consentimento, esse é também o contacto
                  certo para falar connosco.
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
      title="Privacy Policy"
      intro="A short and clear explanation of the data we collect when you contact Velvet Neuron."
      sections={[
        {
          title: 'What we collect',
          body: (
            <>
              <p>
                We only collect the information you choose to submit through the contact form,
                such as your name, email, company, optional phone number, and project details.
              </p>
              <p>
                We may also receive basic technical information related to site operation, such
                as aggregated analytics and cookie consent preferences.
              </p>
            </>
          ),
        },
        {
          title: 'How we use it',
          body: (
            <>
              <p>
                We use this information to reply to your enquiry, understand the project context,
                and suggest the most relevant next steps.
              </p>
              <p>We do not sell or rent your data to third parties.</p>
            </>
          ),
        },
        {
          title: 'Storage and sharing',
          body: (
            <>
              <p>
                Enquiries may be processed through infrastructure and email providers used to run
                the website and handle communication.
              </p>
              <p>
                We keep data only for as long as necessary to manage communication, support a
                project, or comply with legal obligations.
              </p>
            </>
          ),
        },
        {
          title: 'Your rights',
          body: (
            <>
              <p>
                You can request access, correction, or deletion of your data at any time by
                contacting <a className="text-[#0f4c5c] underline" href="mailto:hello@velvetneuron.com">hello@velvetneuron.com</a>.
              </p>
              <p>
                The same address can be used for any privacy or consent-related questions.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
