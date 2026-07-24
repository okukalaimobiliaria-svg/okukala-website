import Link from 'next/link'
import { categories } from '@/lib/home-data'

export function HomeCategories() {
  return (
    <section className="py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#0A43D8] tracking-[0.2em] uppercase mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#021a5c]">
            Busque por Tipo de Imóvel
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Explore as diferentes categorias e encontre a opção ideal para si.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.label}
                href={`/imoveis?tipo=${cat.label.toLowerCase()}`}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-60 lg:h-72"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/80 via-[#021a5c]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-center">
                  <span className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-3 group-hover:bg-[#F5C400] group-hover:text-[#021a5c] transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </span>
                  <h3 className="font-montserrat font-bold text-sm text-white">{cat.label}</h3>
                  <p className="text-xs text-gray-300 mt-1">{cat.count} imóveis</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
