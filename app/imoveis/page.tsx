import { Metadata } from 'next'
import { PropertyList } from '@/components/PropertyList'
import { hygraphClient } from '@/lib/hygraph'
import { GET_ALL_IMOVEIS } from '@/lib/queries'
import { Building2, TrendingUp, Home, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Imóveis à Venda e Aluguel - OKUKALA',
  description: 'Explore nosso catálogo completo de imóveis em Angola. Apartamentos, casas, terrenos e imóveis comerciais.',
}

interface ImovelListItem {
  id: string
  nomeDoImovel: string
  slug: string
  preco: number
  cidade: string
  quantidadeDeQuartos?: number | null
  vagasNaGaragem?: number | null
  area?: number | null
  imagemDeDestaque?: { url?: string | null } | null
  imagens: { url: string } | null
  tipoDeOferta: string
}

export default async function ImoveisPage() {
  let allProperties: ImovelListItem[] = []

  try {
    const data = await hygraphClient.request<{ imoveiss: ImovelListItem[] }>(GET_ALL_IMOVEIS, {
      skip: 0,
      first: 1000,
    })
    allProperties = data.imoveiss || []
  } catch (error) {
    console.error('Erro ao carregar imóveis do Hygraph:', error)
  }

  const stats = [
    { icon: Building2, value: allProperties.length, label: 'Imóveis Disponíveis' },
    { icon: Home, value: allProperties.filter((p) => p.tipoDeOferta === 'venda').length, label: 'Para Venda' },
    { icon: TrendingUp, value: allProperties.filter((p) => p.tipoDeOferta === 'aluguel').length, label: 'Para Aluguel' },
    { icon: ShieldCheck, value: '100%', label: 'Verificados' },
  ]

  return (
    <main className="w-full">

      {/* 1. HERO WITH CHEVRON DIVIDER */}
      <section className="relative h-auto lg:h-[600px] flex flex-col lg:flex-row overflow-hidden">
        {/* Image (Background) */}
        <div className="relative lg:absolute right-0 top-0 w-full lg:w-[64%] h-[300px] lg:h-full z-0 overflow-hidden">
          <img 
            src="/heros/tierra-mallorca-rgJ1J8SDEAY-unsplash (1).jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover object-left" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/50 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Camada 2 (Faixa Amarela Intermediária - z-10) */}
        <div className="hidden lg:block absolute left-0 top-0 w-full h-full bg-[#FFC800] z-10 lg:[clip-path:polygon(0_0,_52%_0,_39%_50%,_52%_100%,_0_100%)]" />

        {/* Camada 3 (Container Azul Principal - z-20) */}
        <div className="w-full h-3 bg-[#FFC800] lg:hidden" />
        <div className="relative w-full bg-[#042A8F] p-8 md:p-12 lg:p-20 z-20 flex items-center lg:[clip-path:polygon(0_0,_49%_0,_36%_50%,_49%_100%,_0_100%)]">
          <div className="max-w-2xl text-white">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFC800] backdrop-blur-sm">
              Catálogo Completo
            </span>
            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
              Encontre o Imóvel{' '}
              <span className="text-[#FFC800]">Perfeito</span>
            </h1>
            <p className="text-lg text-blue-200/80 font-light">
              Explore nossa seleção de imóveis em Angola. Casas, apartamentos, terrenos e imóveis comerciais.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Below Hero) */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-lg shadow-blue-900/10"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#021a5c]">
                  <stat.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-[#03113E]">{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTENT */}
      <section className="pb-16 md:pb-24 overflow-visible">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:pl-0 lg:pr-8 overflow-visible">
          <PropertyList properties={allProperties} />
        </div>
      </section>
    </main>
  )
}
