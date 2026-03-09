# oalexallan

Site pessoal de Alex Allan — desenvolvido com Vue 3, Pinia e Vue Router.

## Stack

- **Frontend**: Vue 3 (Composition API) + Vite 7
- **State**: Pinia
- **Router**: Vue Router 5
- **i18n**: vue-i18n (pt / en)
- **Animações**: animate.css
- **Runtime local**: Bun.js

## Funcionalidades

- Hero com foto de fundo e degradê
- Menu de navegação com animação em cascata
- Tela de boas-vindas (aparece apenas na primeira visita)
- Skills e Projetos carregados via API
- Formulário de contato autenticado (Google OAuth)
- Suporte a dois idiomas: Português e Inglês
- Login com Google

## Pré-requisitos

- [Bun](https://bun.sh) instalado
- API `oalexallan-api` rodando em `http://localhost:3000`

## Configuração

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3000
```

## Desenvolvimento

```bash
bun install
bun run dev
```

O servidor sobe em `http://localhost:5175`.

## Build para produção

```bash
bun run build
```

A pasta `dist/` pode ser publicada em qualquer CDN estático (Cloudflare Pages, Netlify, Vercel, etc.).

## Estrutura

```
src/
  assets/          imagens e fontes
  components/      PageShell, LoginModal
  i18n/            pt.json, en.json
  router/          index.js
  stores/          auth.js, api.js
  views/           HomeView, SkillsView, ProjectsView, ContactView, ...
```

## API

O repositório da API está em [`oalexallan-api`](../APIs/oalexallan-api).
