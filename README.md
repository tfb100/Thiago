# Site — Thiago Freitas Barcelos

Site pessoal e portfólio em single-page, construído com **Vue 3**, **Vite** e **Tailwind CSS**.

## Layouts

O site possui dois layouts (o conteúdo é o mesmo):

- **Layout padrão** — `http://localhost:5173/` — visual atual com partículas, cursor customizado e seções em gradiente.
- **Layout Executive** — `http://localhost:5173/?v=exec` — versão “premium” para apresentação de empresário de tecnologia: tipografia em destaque, gradientes sutis, revelação ao scroll e efeitos de foco. Use quando quiser um impacto visual “Uau”.

No rodapé do layout Executive há um link para voltar ao layout clássico.

## Conteúdo

- **Início** — Apresentação, animação de cargos e destaques (experiência, nomeações, ferramentas)
- **Experiência** — Carreira em TI e nomeações em órgãos públicos
- **IA & Automação** — Foco em inteligência artificial e automação
- **Open Source** — Projetos e ferramentas de software livre
- **Contato** — Email, LinkedIn e GitHub

## Pré-requisitos

- Node.js 18+
- npm (ou pnpm/yarn)

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Subir servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` (ou a URL exibida no terminal).

## Build

```bash
npm run build
```

Artefatos ficam em `dist/`.

## Preview do build

```bash
npm run preview
```

## Testes

```bash
npm run test
```

Testes com Vitest e Vue Test Utils. Para rodar em modo watch: `npm run test -- --watch`.

## Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/)

## Estrutura principal

- `src/App.vue` — Raiz da aplicação e ordem das seções
- `src/components/` — Componentes por seção (Hero, Experiência, Contato, etc.) e UI (NavigationBar, ScrollToTop, CustomCursor, ParticleBackground)
- `src/composables/` — Lógica reutilizável (`useScrollToSection`, `useScrollReveal`, `use3DCard`)
- `src/style.css` — Estilos globais e utilitários Tailwind

## Licença

Projeto privado. © Thiago Freitas Barcelos.
