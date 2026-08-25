# volponi.tech — Publicidade no ChatGPT em 2026

Guia editorial independente em português brasileiro sobre publicidade no ChatGPT, privacidade, governança, mensuração e publicidade com IA.

**Autoria:** Lorenza Volponi — https://volponi.tech  
**Produção:** https://openai-ads.volponi.tech

> Este projeto não é afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI. OpenAI, ChatGPT, GPT e marcas relacionadas pertencem aos seus respectivos titulares.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui / Radix UI
- Framer Motion
- Vercel
- GitHub Actions

## Desenvolvimento

Requer Node.js 24.

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev
```

## Qualidade e deploy

A CI valida lint, TypeScript, sintaxe do watcher editorial, auditoria de dependências e build de produção. O deploy de produção é realizado por GitHub Actions via Vercel CLI, com serialização/cooldown, alias do domínio, health check pós-deploy e notificação IndexNow.

## Radar, freshness e proveniência

O observatório mantém uma camada editorial viva sem auto-publicação irresponsável:

- `/radar` — histórico auditado de mudanças;
- `/feed.xml` — RSS derivado do evento mais recente do Radar;
- `/feed.json` — JSON Feed para agentes e automações;
- `/provenance.json` — autoria, independência, fontes monitoradas e última revisão;
- `/data/chatgpt-ads-markets.json` e `.csv` — dados abertos do snapshot de disponibilidade;
- `Radar Source Watch` — checagem diária de fontes oficiais com abertura de pendência editorial quando um sinal material muda.

Detecção automática não equivale a publicação automática: qualquer mudança factual continua sujeita a revisão humana antes de alterar o Radar.

## SEO / GEO / AI discovery

O projeto mantém:

- metadata canonical e Open Graph;
- `robots.txt` gerado pelo Next.js;
- `sitemap.xml` com rotas editoriais e legais;
- dados estruturados Schema.org para site, autoria, conteúdo didático, HowTo e aplicação web;
- `public/llms.txt`;
- `public/llms-full.txt`;
- `public/knowledge.json`;
- `public/citation.json`;
- `public/humans.txt`;
- autoria, independência, data e proveniência explícitas em HTML e arquivos machine-readable.

A estratégia evita keyword stuffing e sinais artificiais de autoridade. O objetivo é facilitar rastreabilidade, contexto, autoria, fonte e citação por mecanismos de busca e sistemas de IA.

## Identidade visual

A marca d'água global utiliza o ativo próprio `public/fox-mark.png`. A interface utiliza os ativos volponi.tech existentes no repositório e não utiliza o logotipo da OpenAI como identidade do projeto.

## Privacidade e LGPD

- Política: https://openai-ads.volponi.tech/privacidade
- Termos e independência: https://openai-ads.volponi.tech/termos
- Metodologia e fontes: https://openai-ads.volponi.tech/metodologia

Na auditoria de 25/08/2026, o assistente Raposa IA funciona localmente no navegador com conteúdo embarcado no projeto; não foi identificada chamada remota a modelo externo no fluxo do assistente, formulário próprio de cadastro, pixel publicitário ou plataforma própria de analytics.

## Regra editorial

Afirmações sensíveis ao tempo devem priorizar fontes oficiais e ser datadas. Recursos em beta, acesso restrito, benchmarks e integrações não devem ser descritos como universais sem evidência adequada.
