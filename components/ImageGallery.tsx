'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  imagens: Array<{ url: string }>
  titulo: string
}

export function ImageGallery({ imagens, titulo }: ImageGalleryProps) {
  const [indiceAtual, setIndiceAtual] = useState(0)

  if (!imagens || imagens.length === 0) {
    return (
      <div className="aspect-[16/10] w-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Sem imagens disponíveis
      </div>
    )
  }

  const imagemAtual = imagens[indiceAtual]
  const total = imagens.length

  const avancar = () => setIndiceAtual((prev) => (prev + 1) % total)
  const voltar = () => setIndiceAtual((prev) => (prev - 1 + total) % total)

  const prevIndex = (indiceAtual - 1 + total) % total
  const nextIndex = (indiceAtual + 1) % total
  const visibleCards = [
    { index: prevIndex, role: 'prev' as const },
    { index: indiceAtual, role: 'active' as const },
    { index: nextIndex, role: 'next' as const },
  ]

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-xl shadow-blue-900/10 group">
      <Image
        src={imagemAtual.url}
        alt={`${titulo} - Foto ${indiceAtual + 1}`}
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

      {/* Navigation Buttons */}
      {total > 1 && (
        <>
          <button
            onClick={voltar}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/50 backdrop-blur-md p-3 text-white border border-white/15 transition-all hover:bg-slate-900 hover:scale-110 cursor-pointer shadow-lg z-20"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={avancar}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/50 backdrop-blur-md p-3 text-white border border-white/15 transition-all hover:bg-slate-900 hover:scale-110 cursor-pointer shadow-lg z-20"
            aria-label="Próxima foto"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-white/15 z-20">
            {indiceAtual + 1} / {total}
          </div>
        </>
      )}

      {/* Thumbnail navigator - overlaid on the image, hero-style */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 lg:gap-4">
        {total > 1 && (
          <button
            onClick={voltar}
            className="flex-shrink-0 bg-slate-950/60 backdrop-blur-md text-white p-2 rounded-full border border-white/15 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2">
          {total > 1 ? (
            visibleCards.map(({ index, role }) => {
              const img = imagens[index]
              const isActive = role === 'active'

              return (
                <button
                  key={`${role}-${index}`}
                  type="button"
                  onClick={() => setIndiceAtual(index)}
                  className={
                    isActive
                      ? 'relative z-30 w-20 h-14 lg:w-24 lg:h-16 rounded-xl overflow-hidden ring-2 ring-blue-500 shadow-xl shadow-blue-500/30 scale-105 transition-all duration-300 cursor-pointer'
                      : 'relative z-10 w-16 h-12 lg:w-20 lg:h-14 rounded-lg overflow-hidden opacity-50 hover:opacity-80 scale-90 transition-all duration-300 cursor-pointer border border-white/15'
                  }
                >
                  <Image src={img.url} alt={`Thumbnail ${index + 1}`} fill className="object-cover w-full h-full" />
                  {!isActive && <div className="absolute inset-0 bg-slate-950/30" />}
                </button>
              )
            })
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative z-30 w-20 h-14 lg:w-24 lg:h-16 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-white/30 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">1 foto</span>
              </div>
              <div className="relative z-10 w-16 h-12 lg:w-20 lg:h-14 flex-shrink-0 rounded-lg overflow-hidden opacity-50 border border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                <span className="text-xs text-white/30">+</span>
              </div>
              <div className="relative z-10 w-16 h-12 lg:w-20 lg:h-14 flex-shrink-0 rounded-lg overflow-hidden opacity-50 border border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                <span className="text-xs text-white/30">+</span>
              </div>
            </div>
          )}
        </div>

        {total > 1 && (
          <button
            onClick={avancar}
            className="flex-shrink-0 bg-slate-950/60 backdrop-blur-md text-white p-2 rounded-full border border-white/15 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
