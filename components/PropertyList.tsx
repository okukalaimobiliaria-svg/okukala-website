'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { Pagination } from '@/components/Pagination'
import { Building2 } from 'lucide-react'

interface ImovelItem {
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

interface PropertyListProps {
  properties: ImovelItem[]
}

export function PropertyList({ properties }: PropertyListProps) {
  const [filters, setFilters] = useState({
    tipoOferta: '',
    cidade: '',
    precoMin: '',
    precoMax: '',
    categoria: '',
    quartos: '',
  })
  const [page, setPage] = useState(1)
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerFilterFeedback = useCallback(() => {
    setIsFiltering(true)
    if (filterTimer.current) clearTimeout(filterTimer.current)
    filterTimer.current = setTimeout(() => setIsFiltering(false), 450)
  }, [])

  const cities = useMemo(() => {
    return Array.from(new Set(properties.map((p) => p.cidade))).sort()
  }, [properties])

  const filtered = useMemo(() => {
    let result = properties
    if (filters.tipoOferta) {
      result = result.filter((p) => p.tipoDeOferta === filters.tipoOferta)
    }
    if (filters.cidade) {
      result = result.filter((p) => p.cidade === filters.cidade)
    }
    if (filters.precoMin) {
      result = result.filter((p) => p.preco >= parseFloat(filters.precoMin))
    }
    if (filters.precoMax) {
      result = result.filter((p) => p.preco <= parseFloat(filters.precoMax))
    }
    if (filters.quartos) {
      const n = parseInt(filters.quartos, 10)
      result = result.filter((p) => (p.quantidadeDeQuartos ?? 0) >= n)
    }
    return result
  }, [properties, filters])

  const itemsPerPage = 16
  const total = filtered.length
  const totalPages = Math.ceil(total / itemsPerPage)
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginated = filtered.slice(start, end)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
    triggerFilterFeedback()
  }

  const handleClearFilters = () => {
    setFilters({ tipoOferta: '', cidade: '', precoMin: '', precoMax: '', categoria: '', quartos: '' })
    setPage(1)
    triggerFilterFeedback()
  }

  const hasFilters = Object.values(filters).some((v) => v !== '')

  function SkeletonCards() {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="mb-3 h-52 w-full rounded-xl bg-gray-200" />
            <div className="space-y-2.5 p-1">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
              <div className="h-5 w-1/3 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-9 w-full rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="lg:flex lg:items-start lg:gap-16 lg:overflow-visible">
      {/* Sidebar */}
      <aside className="lg:w-96 flex-shrink-0 lg:sticky lg:top-32 lg:self-start lg:-ml-[max(0px,calc((100vw-1400px)/2))] lg:pl-16 xl:pl-20">
        <PropertyFilters
          tipoOferta={filters.tipoOferta}
          cidade={filters.cidade}
          precoMin={filters.precoMin}
          precoMax={filters.precoMax}
          categoria={filters.categoria}
          quartos={filters.quartos}
          cities={cities}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          hasFilters={hasFilters}
        />
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 mt-6 lg:mt-0">
        {paginated.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Mostrando <span className="font-bold text-[#03113E]">{start + 1}</span>-<span className="font-bold text-[#03113E]">{Math.min(end, total)}</span> de <span className="font-bold text-[#03113E]">{total}</span> imóveis
              </p>
              <p className="text-sm text-gray-400">{filtered.length} resultado(s)</p>
            </div>

            {isFiltering ? (
              <SkeletonCards />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {paginated.map((property) => (
                <PropertyCard
                  key={property.slug ?? property.id}
                  titulo={property.nomeDoImovel}
                  preco={property.preco}
                  slug={property.slug ?? property.id}
                  imagem={
                    property.imagemDeDestaque?.url ||
                    (Array.isArray(property.imagens)
                      ? (property.imagens as any)[0]?.url
                      : (property.imagens as any)?.url) || ''
                  }
                  tipo={property.tipoDeOferta === 'venda' ? 'Venda' : 'Aluguel'}
                  cidade={property.cidade}
                  quartos={property.quantidadeDeQuartos ?? undefined}
                  vagas={property.vagasNaGaragem ?? undefined}
                  area={property.area ?? undefined}
                />
              ))}
            </div>)}

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  pagina={page}
                  totalPaginas={totalPages}
                  onMudaPagina={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </>
        ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Building2 size={28} className="text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-[#03113E]">Nenhum imóvel encontrado</h3>
            <p className="text-sm text-gray-500 mb-6">Tente ajustar os filtros para ver mais resultados.</p>
            <button 
              onClick={handleClearFilters}
              className="inline-flex items-center justify-center bg-[#0A43D8] hover:bg-[#FFC800] hover:text-[#03113E] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
