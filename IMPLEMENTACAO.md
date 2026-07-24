# Plataforma Imobiliária Bari - Guia de Implementação

## Status: Construção Completa

Sua plataforma imobiliária foi totalmente construída com Next.js 16, Hygraph CMS e integração de EmailJS.

## 📋 O Que Foi Implementado

### 1. Hero Section (Home)
- Headline impactante com tagline descritiva
- 3 botões de ação interativos (Buy/Sell/Rent)
- Search bar funcional
- Stats card com indicadores
- Destaque de parceiros
- Design responsivo (mobile, tablet, desktop)

### 2. Seção de Imóveis em Destaque
- Grid de 3 imóveis destaque
- PropertyCard com imagem, preço e características
- Links para páginas de detalhe
- Design responsivo

### 3. Seção de Features
- 3 cards com benefícios principais
- Ícones representativos
- Texto descritivo

### 4. CTA Final
- Chamada para ação com dois botões
- Fundo verde destacado
- Links para explorar imóveis e contato

### 5. Componentes Reutilizáveis

#### Header
- Logo da marca
- Navegação principal
- Links para todas as páginas
- Menu mobile responsivo
- Destaque para botão "Anuncie"

#### Footer
- 4 colunas de informação
- Links de navegação
- Recursos importantes
- Contato (telefone, email, endereço)
- Copyright dinâmico

#### PropertyCard
- Imagem do imóvel
- Título truncado (2 linhas)
- Preço formatado em BRL
- Badge com tipo
- Características: quartos, banheiros, área

#### FormularioBase
- Sistema genérico de formulários
- Campos dinâmicos (text, email, tel, textarea, number)
- Estados: idle, carregando, sucesso, erro
- Integração com EmailJS
- Reset automático após sucesso

#### FiltrosImovel
- Dropdown de tipo (Apartamento, Casa, Comercial, Terreno)
- Input de preço mínimo
- Input de preço máximo
- Design responsivo (desktop e mobile com dropdown)

#### Pagination
- Navegação entre páginas
- Exibição inteligente de números (máx 5 por vez)
- Botões anterior/próximo
- Indicador de página ativa

#### ImageGallery
- Navegação entre imagens
- Thumbnails clicáveis
- Contador de imagens
- Setas para avançar/voltar

### 6. Páginas Implementadas

#### / (Home)
- Hero section completo
- Imóveis em destaque
- Features da plataforma
- CTA final

#### /imoveis (Propriedades)
- Filtros avançados (tipo, preço min/max)
- Grid de propriedades
- Paginação
- Estados de carregamento

#### /imoveis/[slug] (Detalhe do Imóvel)
- Galeria de imagens com thumbnails
- Informações completas
- Características (quartos, banheiros, área)
- Endereço e localização
- Card do agente imobiliário
- Formulário de solicitação de informações
- Toggle para mostrar/esconder formulário

#### /blog (Blog)
- Grid de posts
- Thumbnail das postagens
- Meta informações (data, autor)
- Paginação
- Links para posts individuais

#### /blog/[slug] (Detalhe do Post)
- Imagem em destaque
- Título e meta informações
- Conteúdo com formatação (h2, listas, parágrafos)
- Card do autor
- Posts relacionados sugeridos

#### /sobre (Sobre)
- Missão, visão, valores
- Estatísticas (imóveis, clientes, agentes, anos)
- Seção com time
- Design informativo e profissional

#### /contato (Contato)
- Informações de contato (email, telefone, endereço, horários)
- Formulário de contato
- Ícones representativos
- Placeholder para mapa

#### /anuncie (Anuncie seu Imóvel)
- Benefits cards (6 benefícios)
- Tabela de preços com 3 planos
- Formulário de anúncio
- CTA clara

## 🔧 Integrações

### Hygraph (CMS)
Todas as queries estão definidas em `lib/hygraph.ts`:

- **FEATURED_PROPERTIES_QUERY**: Busca 3 imóveis em destaque
- **ALL_PROPERTIES_QUERY**: Lista paginada com filtros
- **PROPERTY_DETAIL_QUERY**: Detalhe completo de um imóvel
- **BLOG_POSTS_QUERY**: Lista paginada de posts
- **BLOG_POST_DETAIL_QUERY**: Detalhe de um post
- **ALL_PROPERTY_SLUGS_QUERY**: Todos os slugs para sitemap
- **ALL_POST_SLUGS_QUERY**: Todos os slugs de posts para sitemap

**Para usar:** Configure `NEXT_PUBLIC_HYGRAPH_ENDPOINT` nas variáveis de ambiente

### EmailJS
Três tipos de formulários integrados em `lib/emailjs.ts`:

1. **Contato Geral** - /contato
2. **Solicitação de Propriedade** - /imoveis/[slug]
3. **Anúncio de Imóvel** - /anuncie

**Para usar:** Configure as seguintes variáveis de ambiente:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 📦 Dependências Instaladas

```json
{
  "graphql-request": "^5.x",
  "embla-carousel-react": "^7.x",
  "embla-carousel-autoplay": "^7.x",
  "@emailjs/browser": "^4.x",
  "lucide-react": "^0.x",
  "next": "^16.x",
  "react": "^19.x"
}
```

## 🎨 Paleta de Cores

- **Primary**: Green-500 (`bg-green-500`, `text-green-600`)
- **Neutrals**: White, Gray-50, Gray-100, Gray-200, Gray-300, Gray-600, Gray-900
- **Accent**: Emerald-500 (hero section)

Todas as cores usam design tokens Tailwind CSS v4.

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- **Mobile**: 375px - Design mobile-first com menu hamburguês
- **Tablet**: 768px+ - Layout otimizado
- **Desktop**: 1024px+ - Layout completo com todas as features

## 🔍 SEO

- **Metadata dinâmica** para cada página
- **Sitemap.ts** que gera dinamicamente a partir do Hygraph
- **Robots.txt** configurado
- **next/image** com otimização automática
- **Semantic HTML** com elementos `<main>`, `<header>`, `<footer>`
- **ARIA attributes** para acessibilidade

## 🚀 Como Começar

### 1. Setup das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://api-us-east-1-shared-usea-prod.hygraph.com/graphql/YOUR_TOKEN
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_XXXXXX
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_XXXXXX
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

### 2. Configurar Hygraph

1. Crie as seguintes collections no Hygraph:
   - **Imovel** (titulo, descricao, preco, slug, imagens[], tipo, quarto, banheiro, area, endereco, cidade, estado, destaque, dataPublicacao, agente{nome, email, telefone})
   - **Post** (titulo, slug, conteudo, thumbnail, dataPublicacao, autor)

2. Publique os dados

3. Gere e copie o token GraphQL

### 3. Configurar EmailJS

1. Crie uma conta em emailjs.com
2. Configure um serviço (ex: Gmail)
3. Crie um template com as variáveis necesárias
4. Copie Service ID, Template ID e Public Key

### 4. Executar Localmente

```bash
pnpm dev
```

Abra http://localhost:3000

## 📝 Dados Mock

Atualmente, todas as páginas usam dados mock definidos localmente. Para usar dados reais do Hygraph, substitua as queries mock pelos comentários de Query GraphQL em cada arquivo de página.

Exemplo (`app/imoveis/page.tsx`):
```typescript
// Mudar de:
const mockImoveis = [...]

// Para:
const { imoveis } = await hygraphClient.request(ALL_PROPERTIES_QUERY, {
  skip: (pagina - 1) * itensPorPagina,
  first: itensPorPagina,
  ...filtros
})
```

## 🔄 Próximas Melhorias

1. **Integração Real com Hygraph** - Conectar queries reais
2. **Autenticação de Usuários** - Login/registro de agentes
3. **Dashboard de Agentes** - Gerenciar próprios imóveis
4. **Sistema de Avaliações** - Reviews de propriedades
5. **Favorites/Wishlist** - Salvar imóveis favoritos
6. **Notificações em Tempo Real** - Para novas propriedades
7. **Mapas Integrados** - Google Maps ou Mapbox
8. **Tours Virtuais** - 360° ou VR
9. **Blog Dinâmico** - CMS integrado para posts
10. **Analytics** - Rastrear comportamento de usuários

## 📞 Suporte

Para dúvidas sobre a implementação:

1. Consulte os comentários no código
2. Verifique a documentação das dependências
3. Teste as queries Hygraph no GraphQL Playground
4. Valide as templates EmailJS

## ✅ Checklist de Deploy

- [ ] Configurar variáveis de ambiente em produção
- [ ] Testar todas as páginas em produção
- [ ] Validar formulários EmailJS
- [ ] Configurar Hygraph com dados reais
- [ ] Setup de monitoramento (Vercel Analytics)
- [ ] Testar performance (Lighthouse)
- [ ] Implementar rate limiting para formulários
- [ ] Setup de backup de dados
- [ ] Documentar processo de manutenção
- [ ] Criar manual para time de conteúdo (Hygraph)

---

**Projeto pronto para desenvolvimento!** 🚀
