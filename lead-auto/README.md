# Velvet Neuron Lead Auto

MVP interno para encontrar e gerir leads locais em Oeiras que possam precisar de website, landing page, automações ou melhoria de presença digital.

## Arquitetura

- `app/`: Next.js App Router e API routes.
- `components/`: dashboard, filtros, tabela e componentes UI.
- `lib/providers/`: camada abstrata de fontes de dados. O provider ativo é Google Places.
- `lib/scoring.ts`: scoring automático e prioridade.
- `lib/cold-message.ts`: mensagem fria em PT-PT.
- `lib/csv.ts`: exportação CSV.
- `prisma/`: schema PostgreSQL. O seed limpa a tabela e não cria dados falsos.
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
GOOGLE_PLACES_API_KEY=""
LEAD_PROVIDER="google-places"
LEAD_ENRICH_WITH_PLAYWRIGHT="false"
```

`google-places` é o provider real por defeito. Sem `GOOGLE_PLACES_API_KEY`, a geração de leads falha explicitamente.

## Scripts úteis

```bash
npm run build
npm run lint
npm run prisma:generate
npm run db:seed
npm run playwright:install
```

## Teste com Google Places

1. Ativa Places API no Google Cloud e adiciona `GOOGLE_PLACES_API_KEY` ao `.env`.
2. Corre a migração:

```bash
npm run prisma:migrate
```

3. Arranca a app:

```bash
npm run dev
```

4. No dashboard usa:

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

Para ativar enriquecimento:

```bash
npm run playwright:install
LEAD_ENRICH_WITH_PLAYWRIGHT="true"
```
