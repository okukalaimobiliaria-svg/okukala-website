'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  pagina: number
  totalPaginas: number
  onMudaPagina: (pagina: number) => void
}

export function Pagination({ pagina, totalPaginas, onMudaPagina }: PaginationProps) {
  const paginas = []

  let inicio = Math.max(1, pagina - 2)
  let fim = Math.min(totalPaginas, pagina + 2)

  if (fim - inicio < 4) {
    if (inicio === 1) fim = Math.min(5, totalPaginas)
    else inicio = Math.max(1, fim - 4)
  }

  for (let i = inicio; i <= fim; i++) {
    paginas.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onMudaPagina(pagina - 1)}
        disabled={pagina === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition-all hover:border-[#0A43D8] hover:bg-[#0A43D8] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-inherit cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex gap-1.5">
        {inicio > 1 && (
          <>
            <button
              onClick={() => onMudaPagina(1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-sm font-medium transition-all hover:border-[#0A43D8] hover:bg-[#0A43D8] hover:text-white cursor-pointer"
            >
              1
            </button>
            {inicio > 2 && <span className="flex items-center px-1 text-gray-400">...</span>}
          </>
        )}

        {paginas.map((p) => (
          <button
            key={p}
            onClick={() => onMudaPagina(p)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
              p === pagina
                ? 'border-[#0A43D8] bg-[#0A43D8] text-white shadow-lg shadow-[#0A43D8]/25'
                : 'border-gray-200 hover:border-[#0A43D8] hover:bg-[#0A43D8]/5'
            }`}
          >
            {p}
          </button>
        ))}

        {fim < totalPaginas && (
          <>
            {fim < totalPaginas - 1 && <span className="flex items-center px-1 text-gray-400">...</span>}
            <button
              onClick={() => onMudaPagina(totalPaginas)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-sm font-medium transition-all hover:border-[#0A43D8] hover:bg-[#0A43D8] hover:text-white cursor-pointer"
            >
              {totalPaginas}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onMudaPagina(pagina + 1)}
        disabled={pagina === totalPaginas}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition-all hover:border-[#0A43D8] hover:bg-[#0A43D8] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-inherit cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
