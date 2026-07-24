'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface PropertyFiltersProps {
  tipoOferta: string
  cidade: string
  precoMin: string
  precoMax: string
  categoria: string
  quartos: string
  cities: string[]
  onChange: (key: string, value: string) => void
  onClear: () => void
  hasFilters: boolean
}

const labelClass = "mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400"

const selectClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-11 text-sm font-medium text-[#03113E] transition-all duration-200 hover:border-[#0A43D8]/40 hover:shadow-sm focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-[#0A43D8]/10 appearance-none cursor-pointer"

const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-[#03113E] transition-all duration-200 placeholder:text-gray-400 hover:border-[#0A43D8]/40 hover:shadow-sm focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-[#0A43D8]/10"

function SelectArrow() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export function PropertyFilters({
  tipoOferta,
  cidade,
  precoMin,
  precoMax,
  categoria,
  quartos,
  cities,
  onChange,
  onClear,
  hasFilters,
}: PropertyFiltersProps) {
  const [inputPrecoMin, setInputPrecoMin] = useState(precoMin)
  const [inputPrecoMax, setInputPrecoMax] = useState(precoMax)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const debouncedPrecoMin = useDebounce(inputPrecoMin, 3000)
  const debouncedPrecoMax = useDebounce(inputPrecoMax, 3000)

  useEffect(() => { setInputPrecoMin(precoMin) }, [precoMin])
  useEffect(() => { setInputPrecoMax(precoMax) }, [precoMax])

  useEffect(() => {
    if (debouncedPrecoMin !== precoMin) onChange('precoMin', debouncedPrecoMin)
  }, [debouncedPrecoMin])

  useEffect(() => {
    if (debouncedPrecoMax !== precoMax) onChange('precoMax', debouncedPrecoMax)
  }, [debouncedPrecoMax])

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#03113E] shadow-sm lg:hidden"
      >
        Filtros
        <svg className={`h-5 w-5 text-gray-400 transition-transform ${isMobileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`mt-4 lg:mt-0 ${isMobileOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-blue-900/5 space-y-5">
          {/* Tipo de Oferta */}
          <div>
            <label className={labelClass}>Tipo de Oferta</label>
            <div className="relative">
              <select value={tipoOferta} onChange={(e) => onChange('tipoOferta', e.target.value)} className={selectClass}>
                <option value="">Todos</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
              <SelectArrow />
            </div>
          </div>

          {/* Cidade */}
          <div className="pt-1 border-t border-gray-100">
            <label className={labelClass}>Cidade</label>
            <div className="relative">
              <select value={cidade} onChange={(e) => onChange('cidade', e.target.value)} className={selectClass}>
                <option value="">Todas</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <SelectArrow />
            </div>
          </div>

          {/* Tipologia */}
          <div className="pt-1 border-t border-gray-100">
            <label className={labelClass}>Tipologia</label>
            <div className="relative">
              <select value={categoria} onChange={(e) => onChange('categoria', e.target.value)} className={selectClass}>
                <option value="">Todas</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
                <option value="Quinta">Quinta</option>
              </select>
              <SelectArrow />
            </div>
          </div>

          {/* Nº de Quartos */}
          <div className="pt-1 border-t border-gray-100">
            <label className={labelClass}>Nº de Quartos (mín.)</label>
            <div className="relative">
              <select value={quartos} onChange={(e) => onChange('quartos', e.target.value)} className={selectClass}>
                <option value="">Qualquer</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
              <SelectArrow />
            </div>
          </div>

          {/* Preços */}
          <div className="pt-1 border-t border-gray-100 space-y-4">
            <div>
              <label className={labelClass}>Preço Mínimo (AOA)</label>
              <input
                type="text"
                inputMode="numeric"
                value={inputPrecoMin}
                onChange={(e) => setInputPrecoMin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Ex: 10.000.000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Preço Máximo (AOA)</label>
              <input
                type="text"
                inputMode="numeric"
                value={inputPrecoMax}
                onChange={(e) => setInputPrecoMax(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Sem limite"
                className={inputClass}
              />
            </div>
          </div>

          {hasFilters && (
            <div className="pt-1 border-t border-gray-100">
              <button
                onClick={onClear}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FFC800] bg-[#FFC800] py-3 text-sm font-bold text-[#03113E] shadow-sm transition-all hover:bg-[#e6b400] hover:border-[#e6b400] cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
