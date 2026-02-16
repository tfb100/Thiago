# Plano de Otimização SEO & GEO - Thiago Barcelos

Este plano detalha as melhorias técnicas e de conteúdo para elevar o ranking nos motores de busca (SEO) e a visibilidade em assistentes de IA (GEO).

## 🎯 Objetivos

- Alcançar pontuação 100/100 no SEO do Lighthouse.
- Implementar metadados de Open Graph e Twitter Cards.
- Estabelecer autoridade (E-E-A-T) via JSON-LD.
- Garantir visibilidade internacional.

## 🛠️ Fases de Implementação

### Fase 1: Metadados Técnicos (`index.html`)

- [x] Atualizar `<title>` e `<meta description>` com foco internacional e palavras-chave.
- [x] Implementar tags Open Graph para redes sociais.
- [x] Implementar Twitter Cards para o X.
- [x] Adicionar tags de canonicidade (`canonical`).
- [x] Configurar imagem de preview (og-image.jpg).
- [ ] Configurar Favicon e Manifest para PWA básico.

### Fase 2: Estrutura de Dados (JSON-LD)

- [x] Criar Script `Schema.org/Person` para Thiago Barcelos.
- [x] Vincular perfis oficiais (LinkedIn, GitHub, X).
- [x] Definir imagem oficial no Schema.
- [ ] Listar habilidades e especialidades para indexação de IA.

### Fase 3: Arquivos de Crawler

- [ ] Gerar `robots.txt` otimizado.
- [ ] Gerar `sitemap.xml` baseado nas seções da Single Page.
- [ ] Adicionar diretiva de idioma `hreflang` (se aplicável).

### Fase 4: Otimização GEO (Generative Engine Optimization)

- [ ] Refinar textos no `HeroSection.vue` e `ExperienceSection.vue` para serem facilmente extraídos por IAs.
- [ ] Garantir que fatos (como "8 nomeações") estejam em formatos de lista bem estruturados.

---

## 🔍 Verificação (Lighthouse)

1. Rodar auditoria de SEO.
2. Validar Rich Results no Google Search Console.
3. Testar preview em `opengraph.xyz`.
