import { services } from '@/lib/home-data'

export function Services() {
  return (
    <section className="py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#0A43D8] tracking-[0.2em] uppercase mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#021a5c]">
            O Que Fazemos
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Oferecemos soluções imobiliárias completas para si.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.label}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-80"
              >
                <img
                  src={service.image}
                  alt={service.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4 group-hover:bg-[#F5C400] group-hover:text-[#021a5c] transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-white">
                    {service.label}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
