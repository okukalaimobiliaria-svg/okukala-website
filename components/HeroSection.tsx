'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Star,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Square,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────────── */
/*  TYPES & DATA                                                         */
/* ──────────────────────────────────────────────────────────────────── */

export interface PropertySlide {
  id: string
  image: string
  tag: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  area: number
  slug?: string
}

/* Fallback: em produção, os dados vêm do Hygraph via props */
const FEATURED_PROPERTIES: PropertySlide[] = [
  {
    id: '1',
    image: '/Imagens/imovel1.png',
    tag: 'Venda',
    title: 'Penthouse T3 Luxo — Talatona',
    location: 'Talatona, Luanda',
    price: '45.000.000 Kz',
    beds: 3,
    baths: 2,
    area: 180,
    slug: 'penthouse-t3-luxo-talatona',
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
    slug: 'moradia-t4-miramar',
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
    slug: 'terreno-500m2-viana',
  },
]

interface HeroSectionProps {
  properties?: PropertySlide[]
}

/* ──────────────────────────────────────────────────────────────────── */
/*  HELPERS                                                              */
/* ──────────────────────────────────────────────────────────────────── */

const wrap = (index: number, length: number) => ((index % length) + length) % length

/* ──────────────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                                       */
/* ──────────────────────────────────────────────────────────────────── */

export function HeroSection({ properties = FEATURED_PROPERTIES }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInitialState, setIsInitialState] = useState(true)

  const activeProperties = properties && properties.length > 0 ? properties : FEATURED_PROPERTIES
  const total = activeProperties.length

  /* Alterna do estado institucional para o imóvel após 3.5 segundos no load inicial */
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIsInitialState(false)
    }, 3500)
    return () => clearTimeout(introTimer)
  }, [])

  /* Rotação automática das imagens de fundo a cada 6s */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => wrap(prev + 1, total))
    }, 6000)
    return () => clearInterval(timer)
  }, [total])

  /* Imóvel activo */
  const currentProperty = useMemo(
    () => activeProperties[currentIndex] || activeProperties[0],
    [activeProperties, currentIndex],
  )

  /* Navegação com setas/miniaturas altera o estado para ver detalhes imediatamente */
  const handleSelectProperty = (index: number) => {
    setIsInitialState(false)
    setCurrentIndex(index)
  }

  const handlePrev = () => {
    setIsInitialState(false)
    setCurrentIndex((prev) => wrap(prev - 1, total))
  }

  const handleNext = () => {
    setIsInitialState(false)
    setCurrentIndex((prev) => wrap(prev + 1, total))
  }

  /* Índices das miniaturas visíveis */
  const prevIndex = wrap(currentIndex - 1, total)
  const nextIndex = wrap(currentIndex + 1, total)
  const visibleCards = [
    { index: prevIndex, role: 'prev' as const },
    { index: currentIndex, role: 'active' as const },
    { index: nextIndex, role: 'next' as const },
  ]

  return (
    <section className="relative w-full h-[calc(100vh-120px)] min-h-[750px] lg:min-h-[850px] bg-slate-950 overflow-hidden">

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. IMAGEM DE FUNDO COM TRANSIÇÃO SUAVE                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={currentProperty.image}
            alt={currentProperty.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 1.4, ease: 'easeOut' } }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </AnimatePresence>

        {/* Gradiente de leitura */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/50 to-[#021a5c]/30 z-10 pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. BLOCO ESQUERDO — CONTEÚDO DINÂMICO INTERCAMBIÁVEL         */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="absolute top-40 lg:top-64 left-8 lg:left-16 z-20 max-w-xl transition-all duration-500">
        <AnimatePresence mode="wait">
          {isInitialState ? (
            /* Visual A: Mensagem Principal Institucional */
            <motion.div
              key="institutional"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="flex flex-col items-start"
            >
              <span className="text-xs font-bold text-yellow-400 tracking-widest uppercase mb-2 block font-poppins">
                IMOBILIÁRIA EM ANGOLA
              </span>

              <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-4 font-montserrat">
                Encontre o Imóvel <span className="text-blue-500">Perfeito</span> Para Si
              </h1>

              <p className="text-slate-200 text-sm lg:text-base mb-6 max-w-md font-roboto">
                A plataforma imobiliária de referência em Angola. Compre, alugue ou invista com confiança e segurança.
              </p>

                <Link
                  href="/imoveis"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-[#FFC800] hover:text-[#03113E] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 border border-blue-500/30 text-sm md:text-base gap-2 font-poppins"
                >
                  Buscar Imóvel
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
            </motion.div>
          ) : (
            /* Visual B: Dados do Imóvel Ativo na mesma posição */
            <motion.div
              key={`property-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="flex flex-col items-start"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-3 backdrop-blur-sm font-poppins">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400" />
                </span>
                EM DESTAQUE • {currentProperty.tag.toUpperCase()} • {currentProperty.location.toUpperCase()}
              </span>

              {/* Título: Nome do imóvel selecionado */}
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-3 font-montserrat">
                {currentProperty.title}
              </h2>

              {/* Preço e Especificações */}
              <div className="flex items-center gap-4 flex-wrap mb-6">
                <span className="text-xl lg:text-2xl font-extrabold text-yellow-400 font-poppins">
                  {currentProperty.price}
                </span>

                {(currentProperty.beds > 0 || currentProperty.baths > 0 || currentProperty.area > 0) && (
                  <>
                    <span className="text-white/20">|</span>
                    <div className="flex items-center gap-3 text-sm text-slate-200 font-roboto">
                      {currentProperty.beds > 0 && (
                        <span className="flex items-center gap-1.5" title="Quartos">
                          <BedDouble className="w-4 h-4 text-blue-400" />
                          {currentProperty.beds}Q
                        </span>
                      )}
                      {currentProperty.baths > 0 && (
                        <span className="flex items-center gap-1.5" title="Casas de banho">
                          <Bath className="w-4 h-4 text-blue-400" />
                          {currentProperty.baths}WC
                        </span>
                      )}
                      {currentProperty.area > 0 && (
                        <span className="flex items-center gap-1.5" title="Área">
                          <Square className="w-4 h-4 text-blue-400" />
                          {currentProperty.area}m²
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Botão Ver Detalhes */}
              <Link
                href={currentProperty.slug ? `/imoveis/${currentProperty.slug}` : '/imoveis'}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-[#FFC800] hover:text-[#03113E] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 border border-blue-500/30 text-sm md:text-base gap-2 font-poppins"
              >
                Ver Imóvel
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. BLOCO DIREITO/BASE: INFORMAÇÕES DE AUTORIDADE (STATISTICS) */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-8 left-8 right-8 lg:bottom-12 lg:right-16 lg:left-auto z-20 flex flex-col gap-6 lg:items-end">
        
        {/* A. LINHA SUPERIOR — Métricas */}
        <div className="grid grid-cols-3 gap-4 lg:flex lg:items-start lg:gap-12">
          {[
            { val: '150+', label: 'Imóveis Listados' },
            { val: '10+', label: 'Anos de Experiência' },
            { val: '98%', label: 'Clientes Satisfeitos' },
          ].map((item, i) => (
            <div key={i}>
              <span className="text-2xl lg:text-4xl font-extrabold text-white">{item.val}</span>
              <span className="text-[10px] lg:text-xs text-slate-300 block font-medium mt-0.5 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* B. LINHA INFERIOR — Botão + Avaliações */}
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 pt-4 border-t border-white/10 lg:border-none">
          <Link
            href="/contato"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-white font-semibold px-6 py-3 rounded-xl border border-white/30 hover:bg-[#FFC800] hover:text-[#03113E] transition-all duration-300 text-sm gap-2 font-poppins"
          >
            Solicitar Consulta
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-white font-bold text-sm lg:text-base">4.9</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-[#F5C400] fill-[#F5C400] stroke-[1.5]" />
                  ))}
                </div>
              </div>
            <span className="text-[10px] lg:text-xs text-slate-300 block font-medium mt-1">Avaliação dos Nossos Clientes</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. CARROSSEL DE CARDS EMPILHADOS COM SETAS (BASE CENTRAL)    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 lg:gap-4">

        {/* Seta Esquerda */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Imóvel anterior"
          className="bg-slate-950/60 backdrop-blur-md text-white p-2 rounded-full border border-white/15 hover:bg-slate-800 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 3 Cards: anterior | activo | posterior */}
        <div className="flex items-center gap-2">
          {visibleCards.map(({ index, role }) => {
            const property = activeProperties[index]
            const isActive = role === 'active'

            return (
              <button
                key={`${role}-${property.id}`}
                type="button"
                onClick={() => handleSelectProperty(index)}
                aria-label={`Ver ${property.title}`}
                className={
                  isActive
                    ? 'relative z-30 w-20 h-14 lg:w-24 lg:h-16 rounded-xl overflow-hidden ring-2 ring-blue-500 shadow-xl shadow-blue-500/30 scale-105 transition-all duration-300 cursor-pointer'
                    : 'relative z-10 w-16 h-12 lg:w-20 lg:h-14 rounded-lg overflow-hidden opacity-50 hover:opacity-80 scale-90 transition-all duration-300 cursor-pointer border border-white/15'
                }
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay subtil nas laterais */}
                {!isActive && (
                  <div className="absolute inset-0 bg-slate-950/30" />
                )}
              </button>
            )
          })}
        </div>

        {/* Seta Direita */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Próximo imóvel"
          className="bg-slate-950/60 backdrop-blur-md text-white p-2 rounded-full border border-white/15 hover:bg-slate-800 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  )
}
