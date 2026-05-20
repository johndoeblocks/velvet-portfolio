# Velvet Neuron Lead Auto

MVP interno multi-utilizador para encontrar e gerir leads locais que possam precisar de website, landing page, automações ou melhoria de presença digital.

## Arquitetura

- `app/`: Next.js App Router e API routes.
- `components/`: dashboard, filtros, tabela e componentes UI.
- `lib/providers/`: camada abstrata de fontes de dados. O provider ativo é Google Places.
- `lib/auth.ts`: Better Auth com email/password e verificação obrigatória de email.
- `lib/scoring.ts`: scoring automático e prioridade.
- `lib/cold-message.ts`: mensagem fria em PT-PT.
- `lib/csv.ts`: exportação CSV.
- `prisma/`: schema PostgreSQL com auth, leads por utilizador e configurações por utilizador.
- `types/`: contratos TypeScript para leads e providers.

## Setup local

```bash
npm install
docker compose up -d postgres
npm run db:setup
npm run dev
```

A app fica disponível em `http://localhost:3000`.

## Variáveis

Cria ou ajusta `.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lead_auto?schema=public"
BETTER_AUTH_SECRET="gera-um-segredo-com-pelo-menos-32-caracteres"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_TRUSTED_ORIGINS="http://localhost:3000"
RESEND_API_KEY=""
AUTH_EMAIL_FROM="Velvet Neuron Lead Auto <onboarding@resend.dev>"
```

Cada utilizador guarda a sua própria Google Places API key no painel de configuração do dashboard. Se `RESEND_API_KEY` estiver vazio, os links de verificação de email são escritos na consola do servidor para desenvolvimento local.

## Scripts úteis

```bash
npm run build
npm run lint
npm run prisma:generate
npm run db:seed
npm run playwright:install
```

## Teste com Google Places

1. Ativa Places API no Google Cloud.
2. Corre a migração:

```bash
npm run prisma:migrate
```

3. Arranca a app:

```bash
npm run dev
```

4. Cria conta, abre o link de verificação enviado por email ou impresso na consola, entra e cola a tua Google Places API key na configuração.
5. No dashboard usa:

```text
location = Oeiras
businessType = psicólogo
provider = Google Places
limit = 20
```

## Providers

Para integrar Google Places, SerpAPI, Apify ou outra fonte legal, cria um provider que implemente:

```ts
type LeadProvider = {
  name: string;
  search(params: LeadSearchParams): Promise<RawLead[]>;
};
```

Depois normaliza os resultados para `LeadInput` e deixa o `scoreLead` calcular `score` e `priority`.

O Playwright é usado apenas como enriquecimento opcional de websites públicos do próprio negócio. Não deve ser usado para scraping de páginas Google Maps.

Para ativar enriquecimento instala Chromium com `npm run playwright:install` e liga a opção “Enriquecer websites” na configuração do teu utilizador.
