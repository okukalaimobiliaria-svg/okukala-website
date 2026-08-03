import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/formatting'

interface PropertyCardProps {
  titulo: string
  preco: number
  slug: string
  imagem?: string
  tipo: string
  cidade: string
  quartos?: number
  vagas?: number
  area?: number
}

export function PropertyCard({
  titulo,
  preco,
  slug,
  imagem,
  tipo,
  cidade,
  quartos,
  vagas,
  area,
}: PropertyCardProps) {
  const imagemUrl = imagem || '/placeholder.jpg'

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50">
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-4 top-4">
          <span className="inline-block rounded-full bg-[#0A43D8] px-3 py-1 text-xs font-bold text-white shadow-lg">
            {tipo}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-[#03113E] transition-colors group-hover:text-[#0A43D8]">
          {titulo}
        </h3>

        {/* Price */}
        <p className="mb-2 text-2xl font-extrabold text-[#E5A800]">{formatPrice(preco)}</p>

        {/* Location */}
        <div className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={14} className="text-[#0A43D8]" />
          <span>{cidade}</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          {quartos !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                <Bed size={14} className="text-[#0A43D8]" />
              </div>
              <span className="font-semibold">{quartos} qts</span>
            </div>
          )}
          {vagas !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                <Bath size={14} className="text-[#0A43D8]" />
              </div>
              <span className="font-semibold">{vagas} vgs</span>
            </div>
          )}
          {area !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                <Maximize2 size={14} className="text-[#0A43D8]" />
              </div>
              <span className="font-semibold">{area} m²</span>
            </div>
          )}
        </div>

        {/* Botão Ver Detalhes */}
        <Link
          href={`/imoveis/${slug}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A43D8] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#042A8F] hover:shadow-lg hover:shadow-blue-600/20"
        >
          Ver Detalhes
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
