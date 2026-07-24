import { Metadata } from 'next'
import { PropertyList } from '@/components/PropertyList'
import { hygraphClient } from '@/lib/hygraph'
import { GET_ALL_IMOVEIS } from '@/lib/queries'
import { Building2, TrendingUp, Home, ShieldCheck } from 'lucide-react'

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
  imagens: { url: string } | null
  tipoDeOferta: string
}

export default async function ImoveisPage() {
  let allProperties: ImovelListItem[] = []

  try {
    const data = await hygraphClient.request<{ imoveiss: ImovelListItem[] }>(GET_ALL_IMOVEIS, {
      skip: 0,
      first: 100,
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#021a5c] py-16 md:py-20">
        <div className="absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0A43D8]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#FFC800]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:pl-0 lg:pr-8">
          <div className="lg:-ml-[max(0px,calc((100vw-1400px)/2))] lg:pl-16 xl:pl-20">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFC800] backdrop-blur-sm">
                Catálogo Completo
              </span>
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
                Encontre o Imóvel{' '}
                <span className="text-[#FFC800]">Perfeito</span>
              </h1>
              <p className="text-lg text-blue-200/80">
                Explore nossa seleção de imóveis premium em Angola. Casas, apartamentos, terrenos e imóveis comerciais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8 z-10 pb-10">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-lg shadow-blue-900/10"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A43D8]">
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

      {/* Content */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:pl-0 lg:pr-8">
          <PropertyList properties={allProperties} />
        </div>
      </section>
    </main>
  )
}
