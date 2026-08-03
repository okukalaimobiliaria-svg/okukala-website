import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, Share2, Heart, Phone, CheckCircle2 } from 'lucide-react'
import { ImageGallery } from '@/components/ImageGallery'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyDetailClient } from '@/components/PropertyDetailClient'
import { CollapsibleDescription } from '@/components/CollapsibleDescription'
import { formatPrice } from '@/lib/formatting'
import { hygraphClient } from '@/lib/hygraph'
import { GET_IMOVEL_BY_SLUG, GET_RELATED_IMOVEIS } from '@/lib/queries'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

interface ImovelDetail {
  id: string
  nomeDoImovel: string
  slug: string
  descricao: {
    html: string
    text: string
  }
  preco: number
  tipoDeOferta: string
  cidade: string
  bairro?: string | null
  quantidadeDeQuartos?: number | null
  vagasNaGaragem?: number | null
  area?: number | null
  imagens?: Array<{ url?: string | null }> | { url?: string | null } | null
  estadoDoImovel: string
  caracteristicasPrincipais?: string[] | null
  oQueHaProximo?: string[] | null
  linkDoMapa?: string | null
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
  imagens?: Array<{ url?: string | null }> | { url?: string | null } | null
  tipoDeOferta: string
}

function getImagensArray(imagensData: unknown): Array<{ url: string }> {
  if (!imagensData) return []
  if (Array.isArray(imagensData)) {
    return imagensData
      .map((img) => {
        if (typeof img === 'string') return { url: img }
        if (img && typeof img === 'object' && 'url' in img && typeof img.url === 'string') {
          return { url: img.url }
        }
        return null
      })
      .filter((img): img is { url: string } => img !== null && !!img.url)
  }
  if (typeof imagensData === 'object' && 'url' in imagensData && typeof (imagensData as any).url === 'string') {
    return [{ url: (imagensData as any).url }]
  }
  if (typeof imagensData === 'string') {
    return [{ url: imagensData }]
  }
  return []
}

function getMapEmbedUrl(linkDoMapa?: string | null) {
  if (!linkDoMapa) return null
  const value = linkDoMapa.trim()
  if (!value) return null

  try {
    const url = new URL(value)
    const hostname = url.hostname.toLowerCase()

    if (hostname.includes('google.com') && url.pathname.includes('/maps/embed')) {
      return value
    }

    if (hostname.includes('google.com') || hostname.includes('maps.google.com') || hostname.includes('maps.app.goo.gl')) {
      const query = url.searchParams.get('q') || url.searchParams.get('query') || url.searchParams.get('ll') || ''
      const fallbackQuery = query || value
      return `https://www.google.com/maps?q=${encodeURIComponent(fallbackQuery)}&output=embed`
    }
  } catch {
    return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`
  }

  return null
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Imóvel - ${slug} - OKUKALA`,
    description: 'Detalhes completos do imóvel. Visite para mais informações.',
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params

  let property: ImovelDetail | null = null
  let relatedProperties: ImovelListItem[] = []

  try {
    const data = await hygraphClient.request<{ imoveiss: ImovelDetail[] }>(GET_IMOVEL_BY_SLUG, { slug })
    property = data.imoveiss?.[0] || null
  } catch (error) {
    console.error('Erro ao carregar imóvel:', error)
  }

  if (!property) {
    notFound()
  }

  try {
    const relatedData = await hygraphClient.request<{ imoveiss: ImovelListItem[] }>(GET_RELATED_IMOVEIS, {
      slug: property.slug,
      first: 3,
    })
    relatedProperties = relatedData.imoveiss || []
  } catch (error) {
    console.error('Erro ao carregar imóveis relacionados:', error)
  }

  const mapEmbedUrl = getMapEmbedUrl(property.linkDoMapa)

  return (
    <main className="w-full bg-[#F8FAFC]">
      {/* Top Header / Breadcrumb */}
      <section className="border-b border-gray-200/60 bg-white py-4 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/90">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <Link
              href="/imoveis"
              className="group flex items-center gap-2 text-sm font-bold text-[#0A43D8] transition-colors hover:text-[#021a5c]"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Voltar para Imóveis
            </Link>
            <div className="flex gap-2.5">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#03113E] shadow-xs transition-all hover:border-[#0A43D8] hover:text-[#0A43D8] hover:shadow-md cursor-pointer">
                <Heart size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#03113E] shadow-xs transition-all hover:border-[#0A43D8] hover:text-[#0A43D8] hover:shadow-md cursor-pointer">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Title & Main Metadata Header */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-block rounded-full bg-[#0A43D8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
              {property.tipoDeOferta === 'venda' ? 'Venda' : 'Aluguel'}
            </span>
            {property.estadoDoImovel && (
              <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#03113E]">
                {property.estadoDoImovel}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-[#03113E] sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            {property.nomeDoImovel}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-500">
            <MapPin size={18} className="text-[#0A43D8] flex-shrink-0" />
            <span>{property.bairro ? `${property.bairro}, ` : ''}{property.cidade}, Angola</span>
          </div>
        </div>
      </section>

      {/* Gallery & Sidebar Details */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[1400px] lg:pl-0 lg:pr-12">
          <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
            {/* Gallery - extends to left edge */}
            <div className="lg:-ml-[max(0px,calc((100vw-1400px)/2))] lg:pl-[max(0px,calc((100vw-1400px)/2))] space-y-8">
              <ImageGallery
                imagens={getImagensArray(property.imagens)}
                titulo={property.nomeDoImovel}
              />

              {/* Description Box */}
              <div className="rounded-2xl border border-gray-100 bg-white px-6 sm:px-8 lg:px-10 py-8 shadow-sm">
                <h2 className="mb-5 text-2xl font-extrabold text-[#03113E] tracking-tight border-b border-gray-100 pb-4">
                  Sobre este Imóvel
                </h2>
                <CollapsibleDescription html={property.descricao.html} />

                {property.caracteristicasPrincipais && property.caracteristicasPrincipais.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="mb-5 text-lg font-bold text-[#03113E]">Características Principais</h3>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {property.caracteristicasPrincipais.map((item, i) => (
                        <li key={`${item}-${i}`} className="flex items-center gap-3 text-sm font-semibold text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#0A43D8]/10 text-[#0A43D8]">
                            <CheckCircle2 size={16} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Location Map Box */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-extrabold text-[#03113E] tracking-tight border-b border-gray-100 pb-4">
                  Localização
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md h-80">
                    {mapEmbedUrl ? (
                      <iframe
                        title={`Localização de ${property.nomeDoImovel}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={mapEmbedUrl}
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : property.linkDoMapa ? (
                      <div className="flex h-full flex-col items-center justify-center gap-3 bg-gray-50 px-6 text-center text-sm text-gray-600">
                        <p>Não foi possível carregar o mapa diretamente.</p>
                        <a
                          href={property.linkDoMapa}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-[#0A43D8] px-5 py-2.5 font-bold text-white transition-all hover:bg-[#021a5c] shadow-sm"
                        >
                          Abrir no Google Maps
                        </a>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-500">
                        Nenhum mapa disponível para este imóvel.
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 flex flex-col justify-between">
                    <div>
                      <h3 className="mb-2 text-base font-bold text-[#03113E]">Endereço Completo</h3>
                      <p className="text-sm font-medium text-gray-600 bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-2.5">
                        <MapPin size={18} className="text-[#0A43D8] flex-shrink-0 mt-0.5" />
                        <span>{property.bairro ? `${property.bairro}, ` : ''}{property.cidade}, Angola</span>
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
                      <h3 className="mb-3 text-base font-bold text-[#03113E]">Por que este imóvel destaca-se</h3>
                      <ul className="space-y-2.5 text-sm font-medium text-gray-600">
                        {[
                          'Localização privilegiada e excelente acessibilidade',
                          'Espaço bem distribuído e funcional',
                          'Ótima oportunidade para residência ou investimento',
                        ].map((item, i) => (
                          <li key={`${item}-${i}`} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="mt-0.5 text-[#0A43D8] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card - 1 col (Sticky Sidebar) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Main Price & Spec Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-blue-900/10">
                  {/* Price */}
                  <div className="mb-6 border-b border-gray-100 pb-6">
                    <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-gray-400">Preço</p>
                    <p className="text-3xl lg:text-4xl font-black text-[#E5A800] tracking-tight">{formatPrice(property.preco)}</p>
                  </div>

                  {/* Features Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A43D8] text-white flex-shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Local</p>
                        <p className="text-sm font-bold text-[#03113E] truncate">{property.bairro || property.cidade}</p>
                      </div>
                    </div>

                    {property.quantidadeDeQuartos !== undefined && property.quantidadeDeQuartos !== null && (
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A43D8] text-white flex-shrink-0">
                          <Bed size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Quartos</p>
                          <p className="text-sm font-bold text-[#03113E]">{property.quantidadeDeQuartos}</p>
                        </div>
                      </div>
                    )}

                    {property.vagasNaGaragem !== undefined && property.vagasNaGaragem !== null && (
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A43D8] text-white flex-shrink-0">
                          <Bath size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Vagas</p>
                          <p className="text-sm font-bold text-[#03113E]">{property.vagasNaGaragem}</p>
                        </div>
                      </div>
                    )}

                    {property.area !== undefined && property.area !== null && (
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A43D8] text-white flex-shrink-0">
                          <Maximize2 size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Área</p>
                          <p className="text-sm font-bold text-[#03113E]">{property.area} m²</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <PropertyDetailClient slug={property.slug} titulo={property.nomeDoImovel} />
                </div>

                {/* Contact Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A43D8]">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#03113E]">Dúvidas?</p>
                      <p className="text-xs font-medium text-gray-500">Fale connosco</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm font-medium text-gray-600">
                    Entre em contato conosco para mais informações sobre este imóvel.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://wa.me/244912345678"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#22c55e] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#16a34a]"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="h-5 w-5"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.199-.297.299-.496.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.92-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.095 3.2 5.076 4.487.709.306 1.263.49 1.694.626.712.227 1.36.195 1.872.118.572-.086 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                      Falar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <section className="border-t border-gray-200/60 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <h2 className="mb-8 text-2xl font-extrabold text-[#03113E] tracking-tight">Outros imóveis</h2>

          {relatedProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProperties.map((related) => (
                <PropertyCard
                  key={related.slug}
                  titulo={related.nomeDoImovel}
                  preco={related.preco}
                  slug={related.slug}
                  imagem={getImagensArray(related.imagens)[0]?.url || ''}
                  tipo={related.tipoDeOferta === 'venda' ? 'Venda' : 'Aluguel'}
                  cidade={related.cidade}
                  quartos={related.quantidadeDeQuartos ?? undefined}
                  vagas={related.vagasNaGaragem ?? undefined}
                  area={related.area ?? undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-12 text-center text-sm font-medium text-gray-500">
              Ainda não há outros imóveis disponíveis no momento.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
