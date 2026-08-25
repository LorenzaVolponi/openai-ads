# ChatGPT Ads Brasil 2026 — volponi.tech

Observatório editorial independente em português brasileiro sobre **ChatGPT Ads**, também pesquisado como **GPT Ads**, **Ads GPT** e **OpenAI Ads**: como anunciar, Ads Manager, preços, CPC/CPM/oCPC, métricas, privacidade e mudanças do produto.

**Autoria e curadoria:** Lorenza Volponi — https://volponi.tech  
**Observatório:** https://openai-ads.volponi.tech  
**Radar:** https://openai-ads.volponi.tech/radar

> Projeto independente. Não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI. OpenAI, ChatGPT, GPT e marcas relacionadas pertencem aos respectivos titulares.

## O que este projeto faz

O site combina explicação didática, fontes primárias, dados estruturados e memória temporal para responder perguntas como:

- Como anunciar no ChatGPT?
- ChatGPT Ads está disponível no Brasil?
- Quanto custa anunciar no ChatGPT?
- Como funcionam CPC, CPM e oCPC?
- Quais métricas o Ads Manager mostra?
- Como anúncios aparecem no ChatGPT?
- O que anunciantes recebem — e o que não recebem — sobre usuários e conversas?
- O que mudou recentemente no ChatGPT Ads?

Variantes amplas como `ChatGPT Ads`, `GPT Ads`, `Ads GPT` e `OpenAI Ads` são consolidadas na autoridade canônica do observatório em vez de gerar doorway pages duplicadas.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui / Radix UI
- Framer Motion
- Vercel
- Vercel Web Analytics
- GitHub Actions

## Desenvolvimento

Requer Node.js 24.

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run seo:health
npm run dev
```

## Qualidade, deploy e SEO health

A CI valida lint, TypeScript, sintaxe do watcher editorial, SEO health checker, SEO insights, auditoria de dependências e build de produção.

O deploy de produção é realizado por GitHub Actions via Vercel CLI, com serialização/cooldown, Web Analytics, alias do domínio, health check pós-deploy e notificação IndexNow.

Após uma publicação bem-sucedida, o workflow **SEO Authority Health** verifica produção de forma independente:

- status e canonical das páginas de autoridade;
- redirects permanentes de aliases;
- `Content-Language: pt-BR`;
- indexabilidade das páginas HTML;
- `noindex, follow` dos arquivos voltados a máquina;
- `robots.txt` e `sitemap.xml`;
- Open Graph;
- consistência de aliases no knowledge graph.

Uma regressão abre/atualiza uma issue operacional automaticamente e é encerrada quando produção volta ao estado esperado.

## Radar, freshness e proveniência

O observatório mantém uma camada editorial viva sem auto-publicação factual irresponsável:

- `/radar` — histórico auditado de mudanças;
- `/feed.xml` — RSS derivado do evento mais recente do Radar;
- `/feed.json` — JSON Feed para agentes e automações;
- `/provenance.json` — autoria, independência, fontes monitoradas e última revisão;
- `/data/chatgpt-ads-markets.json` e `.csv` — dados abertos do snapshot de disponibilidade;
- `Radar Source Watch` — checagem diária de fontes oficiais com sinal editorial quando uma mudança material é detectada.

Detecção automática não equivale a publicação automática: mudanças factuais continuam sujeitas a revisão editorial antes de alterar o Radar.

## SEO / GEO / AI discovery

O projeto mantém uma arquitetura canônica e de proveniência para busca tradicional e sistemas generativos:

- metadata canonical e Open Graph por intenção;
- redirects permanentes para variantes de busca sem duplicar conteúdo;
- `robots.txt` e `sitemap.xml` restrito às páginas canônicas indexáveis;
- dados estruturados Schema.org para site, autoria, artigos técnicos, conteúdo didático, HowTo e aplicação web;
- `public/llms.txt` e `public/llms-full.txt`;
- `public/knowledge.json`;
- `public/citation.json`;
- `public/humans.txt`;
- `/provenance.json`;
- autoria Lorenza Volponi / volponi.tech, independência, revisão e fontes explícitas;
- arquivos machine-readable crawláveis, mas fora do índice tradicional para não competir com páginas HTML.

A estratégia evita keyword stuffing, doorway pages, datas artificiais e sinais falsos de autoridade. O objetivo é concentrar relevância em conteúdo original, verificável, atualizado e citável.

## Analytics e decisões editoriais

O projeto utiliza **Vercel Web Analytics** para leitura agregada de audiência. Não há formulário próprio de lead, pixel publicitário ou remarketing.

O workflow **SEO Authority Insights** produz um relatório operacional agregado com pageviews, visitantes, páginas, referrers, países e dispositivos. Ele não lê nem armazena texto digitado na Raposa IA ou no Volponi Ad Quality Review.

Analytics de audiência não substitui ranking: consultas, posição e CTR orgânico dependem de dados do Google Search Console quando a propriedade estiver verificada.

## Identidade visual

A identidade utiliza ativos próprios de volponi.tech. Screenshots de produto usados para ensino são identificados como material oficial de terceiro e vinculados às fontes correspondentes; não são apresentados como criação ou parceria da volponi.tech com a OpenAI.

## Privacidade e LGPD

- Política: https://openai-ads.volponi.tech/privacidade
- Termos e independência: https://openai-ads.volponi.tech/termos
- Metodologia e fontes: https://openai-ads.volponi.tech/metodologia

A Raposa IA e o Volponi Ad Quality Review processam o conteúdo localmente no navegador. O projeto não envia o texto dessas ferramentas para o backend de analytics. Dados agregados de audiência seguem a política publicada no site.

## Regra editorial

Afirmações sensíveis ao tempo devem priorizar fontes oficiais e ser datadas. Recursos em beta, acesso restrito, benchmarks e integrações não devem ser descritos como universais sem evidência adequada.
