# oalexallan

Site pessoal de Alex Allan — desenvolvido com Vue 3, Pinia e Vue Router.

### Pra mais conteúdo, me segue nas redes abaixo!

<div>
  <a href="https://www.frontendmentor.io/profile/oalexallan" target="_blank"><img src="https://img.shields.io/badge/Frontend%20Mentor-3F54A3?logo=frontendmentor&logoColor=fff&style=plastic"></a>
  <a href="https://www.instagram.com/oalexallan/?hl=pt-br" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=fff&style=plastic"></a>
  <a href="https://www.linkedin.com/in/alex-allan-silveira-a1b327264/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=plastic"></a>
</div>

---

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

## Configuração local

```bash
# .env
VITE_API_URL=http://localhost:3000

bun install
bun run dev   # http://localhost:5175
```

## Build

```bash
bun run build   # gera dist/
```
