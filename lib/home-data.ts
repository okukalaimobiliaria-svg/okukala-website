import {
  Home,
  Building2,
  LandPlot,
  Store,
  Castle,
  BadgeCheck,
} from 'lucide-react'

export interface FeaturedProperty {
  id: string
  image: string
  tag: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  area: number
  slug: string
}

export const services = [
  { icon: Home, label: 'Venda e arrendamento de residências', image: '/Imagens/imovel1.png' },
  { icon: LandPlot, label: 'Venda de terrenos e fazendas', image: '/Imagens/imovel3.png' },
  { icon: BadgeCheck, label: 'Avaliação de terrenos e imóveis', image: '/Imagens/imovel2.png' },
  { icon: Building2, label: 'Gestão de propriedades', image: '/Imagens/imovel5.png' },
]

export const categories = [
  { icon: Building2, label: 'Apartamento', count: 320, image: '/Imagens/imovel1.png' },
  { icon: Store, label: 'Comercial', count: 145, image: '/Imagens/imovel2.png' },
  { icon: LandPlot, label: 'Terreno', count: 210, image: '/Imagens/imovel3.png' },
  { icon: Home, label: 'Casa', count: 480, image: '/Imagens/imovel4.png' },
  { icon: Castle, label: 'Quinta', count: 65, image: '/Imagens/imovel5.png' },
]

export const fallbackFeaturedProperties: FeaturedProperty[] = [
  {
    id: '1',
    image: '/Imagens/imovel1.png',
    tag: 'Venda',
    title: 'Apartamento T3 — Talatona',
    location: 'Talatona, Luanda',
    price: '45.000.000 Kz',
    beds: 3,
    baths: 2,
    area: 180,
    slug: '/imoveis/apartamento-t3-luanda',
  },
  {
    id: '2',
    image: '/Imagens/imovel2.png',
    tag: 'Aluguel',
    title: 'Moradia T4 — Miramar',
    location: 'Miramar, Luanda',
    price: '350.000 Kz/mês',
    beds: 4,
    baths: 3,
    area: 320,
    slug: '/imoveis/moradia-t4-miramar',
  },
  {
    id: '3',
    image: '/Imagens/imovel3.png',
    tag: 'Venda',
    title: 'Terreno 500m² — Viana',
    location: 'Viana, Luanda',
    price: '12.000.000 Kz',
    beds: 0,
    baths: 0,
    area: 500,
    slug: '/imoveis/terreno-500m-viana',
  },
]

export const comfortProperties = [
  {
    id: 4,
    image: '/Imagens/imovel4.png',
    title: 'Apartamento T2 — Ingombota',
    location: 'Ingombota, Luanda',
    price: '28.000.000 Kz',
    beds: 2,
    baths: 1,
    area: 120,
  },
  {
    id: 5,
    image: '/Imagens/imovel5.png',
    title: 'Moradia T3 — Cacuaco',
    location: 'Cacuaco, Luanda',
    price: '35.000.000 Kz',
    beds: 3,
    baths: 2,
    area: 250,
  },
  {
    id: 6,
    image: '/Imagens/imovel1.png',
    title: 'Penthouse — Kilamba',
    location: 'Kilamba, Luanda',
    price: '52.000.000 Kz',
    beds: 3,
    baths: 3,
    area: 280,
  },
]

export const cities = [
  { name: 'Luanda', image: '/Imagens/imovel1.png', count: 680 },
  { name: 'Bengo', image: '/Imagens/imovel2.png', count: 120 },
  { name: 'Cabinda', image: '/Imagens/imovel3.png', count: 95 },
  { name: 'Huambo', image: '/Imagens/imovel4.png', count: 145 },
]

export const fallbackNews = [
  {
    id: '1',
    image: '/Imagens/imovel5.png',
    date: '12 Jul 2026',
    title: 'Novas Regulamentações Imobiliárias em Angola',
    excerpt: 'Conheça as principais mudanças na legislação que afectam o mercado imobiliário angolano.',
    slug: '/blog',
  },
  {
    id: '2',
    image: '/Imagens/imovel3.png',
    date: '05 Jul 2026',
    title: 'Dicas para Primeiros Compradores',
    excerpt: 'Guia completo com tudo o que precisa saber antes de adquirir o seu primeiro imóvel.',
    slug: '/blog',
  },
  {
    id: '3',
    image: '/Imagens/imovel2.png',
    date: '28 Jun 2026',
    title: 'Tendências do Mercado em 2026',
    excerpt: 'Análise das tendências que vão moldar o sector imobiliário nos próximos meses.',
    slug: '/blog',
  },
]
