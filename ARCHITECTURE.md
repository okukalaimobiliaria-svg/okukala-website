# Real Estate Platform - Architecture Guide

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout com metadata e fonts
│   ├── globals.css         # Estilos globais com design tokens
│   └── page.tsx            # Home page - importa HeroSection
├── components/
│   └── HeroSection.tsx     # Hero section completo e responsivo
├── public/
│   └── hero-property.png   # Imagem de fundo do hero
└── ARCHITECTURE.md         # Este arquivo
```

## Design System

### Cores
- **Primary**: Emerald Green (`emerald-500`, `emerald-600`)
- **Background**: Slate 900 (`slate-900`)
- **Text**: White e Slate 200
- **Accents**: Emerald com semi-transparência

### Tipografia
- **Heading**: Geist Sans (default)
- **Body**: Geist Sans
- **Peso**: Bold para H1, Medium para botões, Regular para corpo

### Componentes Tailwind
- Flexbox para layouts responsivos
- Grid para seções complexas
- Rounded-full para botões circulares
- Backdrop-blur para efeitos de vidro
- Gradientes para overlays de imagem

## Componentes Existentes

### HeroSection (components/HeroSection.tsx)
**Responsabilidades:**
- Display da headline e tagline
- Três botões de ação (Buy/Sell/Rent) com estado ativo
- Input de busca funcional
- Estatísticas lado direito (desktop only)
- Indicadores de confiança (logos dos parceiros)
- Scroll indicator animado

**Props:** Nenhuma (componente autossuficiente)

**Estado:**
- `activeTab`: 'buy' | 'sell' | 'rent'
- `searchQuery`: string

**Eventos:**
- Click em abas: alterna `activeTab`
- Submit do formulário: log da busca (pronto para integração)

## Padrões para Novas Páginas

### 1. Criar Novo Componente de Página
```tsx
// components/PropertiesGrid.tsx
'use client'

export function PropertiesGrid() {
  return (
    <section className="w-full py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Conteúdo */}
      </div>
    </section>
  )
}
```

### 2. Importar na Page
```tsx
// app/page.tsx
import { HeroSection } from '@/components/HeroSection'
import { PropertiesGrid } from '@/components/PropertiesGrid'

export default function Page() {
  return (
    <main className="w-full">
      <HeroSection />
      <PropertiesGrid />
      {/* Próximas seções */}
    </main>
  )
}
```

### 3. Manter Responsividade
- Mobile-first: `md:` e `lg:` para breakpoints
- Padding/margin: usar escala Tailwind (px-6, py-20)
- Layouts: preferir flexbox, usar grid só quando necessário

## Integração com Backend (Próximos Passos)

### Search Handler
O `handleSearch` em HeroSection está pronto para integração:
```tsx
const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  console.log(`[v0] Search for: ${searchQuery} in ${activeTab} mode`)
  // TODO: Chamar API de busca
  // router.push(`/search?q=${searchQuery}&type=${activeTab}`)
}
```

### Dados de Propriedades
Quando conectar com backend:
- Criar componente `PropertyCard` reutilizável
- Usar `SWR` ou `TanStack Query` para data fetching
- Implementar filtros e paginação

## Design Tokens Disponíveis

No `globals.css`:
- `--primary`: Cor primária (emerald)
- `--background`: Fundo
- `--foreground`: Texto principal
- `--card`: Cards e containers
- `--accent`: Destaques
- `--border`: Bordas
- `--radius`: Arredondamento padrão

Use via Tailwind: `bg-primary`, `text-foreground`, `border-border`, etc.

## Próximas Seções Sugeridas

1. **Properties Grid** - Listagem de propriedades em grid
2. **Filters Sidebar** - Filtros por preço, localização, tipo
3. **Featured Properties** - Destaques com carrossel
4. **CTA Section** - Call-to-action para listar propriedade
5. **Testimonials** - Depoimentos de clientes
6. **Newsletter** - Signup para notificações
7. **Footer** - Links e informações

## Dev Server

```bash
pnpm dev
# Acessa em http://localhost:3000
```

## Deploy

```bash
# Vercel (recomendado)
vercel deploy

# Ou via GitHub push
git push origin main
```

---

**Status:** Hero section completo e pronto para próximas seções!
