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

A CI valida lint, TypeScript, auditoria de dependências e build de produção. O deploy de produção é realizado por GitHub Actions via Vercel CLI, com serialização/cooldown e health check pós-deploy.

## SEO / GEO / AI discovery

O projeto mantém:

- metadata canonical e Open Graph;
- `robots.txt` gerado pelo Next.js;
- `sitemap.xml` com rotas editoriais e legais;
- dados estruturados Schema.org para site e autoria;
- `public/llms.txt`;
- `public/llms-full.txt`;
- `public/knowledge.json`;
- `public/humans.txt`;
- autoria e independência explícitas em HTML e arquivos machine-readable.

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
