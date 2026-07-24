'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Building2,
  MapPin,
  Phone,
  Shield,
  Users,
  Star,
  ArrowRight,
  Search,
  ChevronRight,
  BedDouble,
  Bath,
  Square,
  LandPlot,
  Store,
  Castle,
  Handshake,
  BadgeCheck,
  Globe,
  CheckCircle,
} from 'lucide-react'
import { Services } from '@/components/Services'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { buttonVariants } from '@/components/ui/button'
import { hygraphClient } from '@/lib/hygraph'
import { GET_HOME_IMOVEIS, GET_FEATURED_BLOGS } from '@/lib/queries'
import { formatPrice } from '@/lib/formatting'
import {
  categories,
  fallbackFeaturedProperties,
  comfortProperties,
  cities,
  fallbackNews,
  FeaturedProperty,
} from '@/lib/home-data'

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [propertyTab, setPropertyTab] = useState<'comprar' | 'alugar'>('comprar')
  const [filterTab, setFilterTab] = useState<'todos' | 'venda' | 'aluguel'>('todos')
  const [searchLocation, setSearchLocation] = useState('')
  const [searchType, setSearchType] = useState('')
  const [featuredProperties, setFeaturedProperties] = useState<FeaturedProperty[]>(fallbackFeaturedProperties)

  const [featuredBlogs, setFeaturedBlogs] = useState<Array<{id: string; image: string; date: string; title: string; excerpt: string; slug: string;}>>(fallbackNews)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_URL
      if (!endpoint) {
        if (isMounted) setFeaturedBlogs(fallbackNews)
        return
      }

      try {
        const data = await hygraphClient.request(GET_FEATURED_BLOGS as any)
        if (!isMounted) return
        const mapped = (data.blogs || []).map((b: any) => ({
          id: b.id,
          image: b.imagemDeCapa?.url || '/Imagens/imovel5.png',
          date: b.dataDePublicacao ? new Date(b.dataDePublicacao).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
          title: b.titulo,
          excerpt: b.resumo,
          slug: `/blog/${b.slug}`,
        }))
        setFeaturedBlogs(mapped.length ? mapped : fallbackNews)
      } catch (e) {
        console.error('Erro ao carregar blogs em destaque da homepage:', e)
        if (isMounted) setFeaturedBlogs(fallbackNews)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadFeaturedProperties = async () => {
      const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_URL
      if (!endpoint) {
        if (isMounted) setFeaturedProperties(fallbackFeaturedProperties)
        return
      }

      try {
        const data = await hygraphClient.request<{
          imoveiss: Array<{
            id: string
            nomeDoImovel: string
            slug: string
            preco: number
            cidade: string
            quantidadeDeQuartos?: number | null
            vagasNaGaragem?: number | null
            area?: number | null
            imagens?: { url?: string | null } | null
            tipoDeOferta: string
          }>
        }>(GET_HOME_IMOVEIS)

        if (!isMounted) return

        const mappedProperties = (data.imoveiss || []).map((property, index) => ({
          id: property.id,
          image: property.imagens?.url || `/Imagens/imovel${(index % 5) + 1}.png`,
          tag: property.tipoDeOferta === 'aluguel' ? 'Aluguel' : 'Venda',
          title: property.nomeDoImovel,
          location: property.cidade,
          price: formatPrice(property.preco),
          beds: property.quantidadeDeQuartos ?? 0,
          baths: property.vagasNaGaragem ?? 0,
          area: property.area ?? 0,
          slug: property.slug,
        }))

        setFeaturedProperties(mappedProperties.length > 0 ? mappedProperties : fallbackFeaturedProperties)
      } catch (error) {
        console.error('Erro ao carregar imóveis em destaque da homepage:', error)
        if (isMounted) {
          setFeaturedProperties(fallbackFeaturedProperties)
        }
      }
    }

    loadFeaturedProperties()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredFeatured =
    filterTab === 'todos'
      ? featuredProperties
      : featuredProperties.filter(
          (p) =>
            p.tag.toLowerCase() === (filterTab === 'venda' ? 'venda' : 'aluguel'),
        )

  return (
    <main className="overflow-hidden">

      {/* ============================================================ */}
      {/*  1. HERO SECTION                                             */}
      {/* ============================================================ */}
      <HeroSection properties={featuredProperties} />

      {/* ============================================================ */}
      {/*  3. SERVICES — CATEGORIAS COM IMAGEM                         */}
      {/* ============================================================ */}
      <Services />

      {/* ============================================================ */}
      {/*  2. QUEM SOMOS — SOBRE A OKUKALA                             */}
      {/* ============================================================ */}
      <AboutSection />

      {/* ============================================================ */}
      {/*  6. FEATURED PROPERTIES                                       */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <span className="inline-block text-sm font-semibold text-[#0A43D8] tracking-[0.2em] uppercase mb-4">
                Nossos Imóveis
              </span>
              <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#021a5c]">
                Imóveis em Destaque
              </h2>
              <p className="mt-4 text-gray-500 text-lg">Selecionados especialmente para si.</p>
            </div>

            <Link
              href="/imoveis"
              className={buttonVariants({ className: 'bg-[#0A43D8] text-white hover:bg-[#042A8F]' })}
            >
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {filteredFeatured.map((p) => (
              <Link
                key={p.id}
                href={`/imoveis/${p.slug}`}
                className="group block rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                <article>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-4 py-1.5 text-xs font-bold rounded-lg bg-[#0A43D8] text-white">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-montserrat font-bold text-lg text-[#021a5c] group-hover:text-[#0A43D8] transition-colors">
                      {p.title}
                    </h3>
                    <p className="flex items-center gap-1.5 mt-2.5 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-[#0A43D8]" />
                      {p.location}
                    </p>
                    <div className="flex items-center gap-5 mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500">
                      {p.beds > 0 && (
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="w-4 h-4" /> {p.beds} Quartos
                        </span>
                      )}
                      {p.baths > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4" /> {p.baths} Banho(s)
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Square className="w-4 h-4" /> {p.area}m²
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <p className="font-montserrat font-extrabold text-[#0A43D8] text-xl">
                        {p.price}
                      </p>
                  <span className={buttonVariants({ className: 'bg-transparent text-[#0A43D8] hover:text-[#021a5c] flex items-center gap-1 transition-colors' })}>
                    Detalhes <ArrowRight className="w-4 h-4" />
                  </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. INVESTMENT OPPORTUNITIES                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#021a5c]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[#F5C400] tracking-[0.2em] uppercase mb-4">
              Investimento
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
              Investimentos Imobiliários de Alta Performance
            </h2>
            <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg">
              Análise profissional, transparência total e acesso exclusivo a oportunidades de alto padrão em Angola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="group rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-9 transition-all duration-300">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F5C400]/15 text-[#F5C400] mb-7">
                <Shield className="w-8 h-8" />
              </span>
              <h3 className="font-montserrat font-bold text-xl text-white mb-4">Transparência e Governança</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Projetos avaliados com indicadores claros de rentabilidade, risco e segurança jurídica. Nosso compromisso é com a clareza total.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-9 transition-all duration-300">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F5C400]/15 text-[#F5C400] mb-7">
                <BadgeCheck className="w-8 h-8" />
              </span>
              <h3 className="font-montserrat font-bold text-xl text-white mb-4">Gestão Profissional</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Selecionamos ativos com base em histórico de valorização, localização estratégica e solidez documental.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-9 transition-all duration-300">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F5C400]/15 text-[#F5C400] mb-7">
                <Star className="w-8 h-8" />
              </span>
              <h3 className="font-montserrat font-bold text-xl text-white mb-4">OKUKALA Premium</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Área exclusiva para investidores de elevado património. Foco em ativos de luxo: moradias, penthouses, resorts e hotéis.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contato#portal-investidor"
              className={buttonVariants({ className: 'bg-[#F5C400] text-[#021a5c] font-semibold shadow-md hover:bg-yellow-400 py-2.5 px-6 text-sm rounded-lg' })}
            >
              Conheça o Portal do Investidor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  10. LATEST NEWS                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <span className="inline-block text-sm font-semibold text-[#0A43D8] tracking-[0.2em] uppercase mb-4">
                Blog
              </span>
              <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#021a5c]">
                Últimas Notícias
              </h2>
              <p className="mt-4 text-gray-500 text-lg">Mantenha-se informado sobre o mercado imobiliário.</p>
            </div>
              <a
                href="/blog"
                className={buttonVariants({ className: 'bg-[#0A43D8] text-white hover:bg-[#042A8F]' })}
              >
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {featuredBlogs.map((n) => (
              <article
                key={n.id}
                className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7">
                  <span className="text-xs font-medium text-gray-400">{n.date}</span>
                  <h3 className="font-montserrat font-bold text-base text-[#021a5c] mt-2 group-hover:text-[#0A43D8] transition-colors leading-snug">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 line-clamp-2">{n.excerpt}</p>
                  <a
                    href={n.slug}
                    className={buttonVariants({ className: 'bg-transparent text-[#0A43D8] hover:bg-gray-100 mt-5' })}
                  >
                    Ler mais <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
