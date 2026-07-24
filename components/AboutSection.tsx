import Link from 'next/link'
import { CheckCircle, ArrowRight, Building2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado Esquerdo — Imagem + Badge */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/Imagens/imovel2.png"
                alt="Okukala Imobiliária"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/40 via-transparent to-transparent" />
            </div>

            {/* Badge flutuante de autoridade */}
            <div className="absolute -bottom-6 -right-2 md:bottom-8 md:-right-6 bg-white rounded-2xl shadow-xl p-5 md:p-6 flex items-center gap-4 border border-gray-100">
              <span className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#F5C400] flex items-center justify-center text-[#021a5c]">
                <Building2 className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <div>
                <p className="font-montserrat font-extrabold text-[#021a5c] text-xl md:text-2xl">10+ Anos</p>
                <p className="text-xs md:text-sm text-gray-500 font-medium">De Experiência em Angola</p>
              </div>
            </div>
          </div>

          {/* Lado Direito — Texto e Destaques */}
          <div>
            <span className="inline-block text-sm font-semibold text-[#0A43D8] tracking-[0.2em] uppercase mb-4 font-poppins">
              Quem Somos
            </span>

            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#021a5c] leading-tight">
              Conectando Pessoas aos <span className="text-[#0A43D8]">Seus Imóveis</span> Ideais
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg font-roboto">
              A Okukala Imobiliária nasceu da visão de oferecer soluções imobiliárias seguras, transparentes e eficientes em Angola. Atuamos com excelência na compra, venda, arrendamento, avaliação e gestão de propriedades, proporcionando um atendimento profissional e personalizado a cada cliente.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg font-roboto">
              Comprometida com a ética e a credibilidade, trabalhamos diariamente para transformar oportunidades imobiliárias em negócios seguros e vantajosos para proprietários, compradores e investidores.
            </p>

            {/* PONTOS DE DESTAQUE */}
            <div className="mt-8 space-y-3">
              {[
                'Soluções imobiliárias seguras, transparentes e eficientes',
                'Atendimento personalizado focado na satisfação do cliente',
                'Experiência consolidada em todo o ciclo imobiliário angolano',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-gray-100">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#0A43D8]/10 flex items-center justify-center text-[#0A43D8]">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium text-gray-700 font-poppins">{item}</span>
                </div>
              ))}
            </div>

            {/* BOTÃO PARA A PÁGINA SOBRE */}
            <div className="mt-10">
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center bg-[#0A43D8] hover:bg-[#042A8F] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-300 text-sm md:text-base gap-2 font-poppins"
              >
                Conhecer a Nossa História
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
