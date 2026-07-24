'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'

interface FiltrosImovelProps {
  onFiltroChange: (filtros: {
    tipo: string
    precoMin: number
    precoMax: number
  }) => void
}

export function FiltrosImovel({ onFiltroChange }: FiltrosImovelProps) {
  const [tipo, setTipo] = useState('')
  const [precoMin, setPrecoMin] = useState('0')
  const [precoMax, setPrecoMax] = useState('10000000')
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (newTipo: string, newMin: string, newMax: string) => {
    setTipo(newTipo)
    setPrecoMin(newMin)
    setPrecoMax(newMax)

    onFiltroChange({
      tipo: newTipo,
      precoMin: parseFloat(newMin),
      precoMax: parseFloat(newMax),
    })
  }

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {/* Tipo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => handleChange(e.target.value, precoMin, precoMax)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-green-500 focus:outline-none"
          >
            <option value="">Todos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Comercial">Comercial</option>
            <option value="Terreno">Terreno</option>
          </select>
        </div>

        {/* Preço Mínimo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Preço Mínimo
          </label>
          <input
            type="number"
            value={precoMin}
            onChange={(e) => handleChange(tipo, e.target.value, precoMax)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-green-500 focus:outline-none"
            placeholder="0"
          />
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Preço Máximo
          </label>
          <input
            type="number"
            value={precoMax}
            onChange={(e) => handleChange(tipo, precoMin, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-green-500 focus:outline-none"
            placeholder="10000000"
          />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            <Filter size={16} />
            Filtros
          </div>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="mt-2 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            {/* Tipo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => handleChange(e.target.value, precoMin, precoMax)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              >
                <option value="">Todos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Comercial">Comercial</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>

            {/* Preço Mínimo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Preço Mínimo
              </label>
              <input
                type="number"
                value={precoMin}
                onChange={(e) => handleChange(tipo, e.target.value, precoMax)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="0"
              />
            </div>

            {/* Preço Máximo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Preço Máximo
              </label>
              <input
                type="number"
                value={precoMax}
                onChange={(e) => handleChange(tipo, precoMin, e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="10000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
