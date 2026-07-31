'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Home,
  Building2,
  Users,
  Shield,
  Zap,
  Lock,
  BadgeCheck,
  TrendingUp,
  MapPin,
  Handshake,
  Star,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const services = [
  { title: 'Venda e arrendamento de residências', icon: Home, image: '/Serviços/pexels-rdne-8293778.jpg' },
  { title: 'Venda de terrenos e fazendas', icon: TrendingUp, image: '/Serviços/pexels-shootsaga-36946235.jpg' },
  { title: 'Consultoria imobiliária', icon: Users, image: '/Serviços/pexels-ninthgrid-2149521550-30677714.jpg' },
  { title: 'Avaliação de terrenos e imóveis', icon: Building2, image: '/Serviços/pexels-thirdman-8470774 (2).jpg' },
  { title: 'Gestão de propriedades', icon: Handshake, image: '/Serviços/pexels-aysegul-aytoren-46790226-18821289.jpg' },
  { title: 'Legalização de terrenos e imóveis', icon: Shield, image: '/Serviços/pexels-ron-lach-9870226.jpg' },
  { title: 'Elaboração de projectos de arquitectura', icon: Star, image: '/Serviços/pexels-gustavo-fring-6285150.jpg' },
  { title: 'Construção civil e acabamentos', icon: Building2, image: '/Serviços/pexels-thisvikto-10202865.jpg' },
  { title: 'Loteamento de terras', icon: MapPin, image: '/Serviços/pexels-kelly-3794790.jpg' },
]

const whyChooseUs = [
  { title: 'Expertise local', description: 'Profundo conhecimento do mercado imobiliário em Angola, com foco na Huíla.' },
  { title: 'Segurança jurídica', description: 'Transações imobiliárias protegidas e processos de legalização rigorosos.' },
  { title: 'Atendimento Personalizado', description: 'Foco total nas suas necessidades na Huíla e nas 20 províncias do país.' },
  { title: 'Transparência total', description: 'Informações claras e honestas em todas as etapas do negócio.' },
  { title: 'Resultados rápidos', description: 'Gestão ágil para concretizar a compra, venda ou arrendamento com eficiência.' },
  { title: 'Inovação constante', description: 'Utilizamos as melhores ferramentas para oferecer oportunidades exclusivas.' },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ServicosPage() {
  return (
    <main className="overflow-hidden">

      {/* 1. HERO WITH INWARD CHEVRON DIVIDER */}
      <section className="relative h-auto lg:h-[600px] flex flex-col lg:flex-row overflow-hidden">
        {/* Image (Background) */}
        <div className="relative lg:absolute right-0 top-0 w-full lg:w-[64%] h-[300px] lg:h-full z-0 overflow-hidden">
          <img 
            src="/heros/selective-focus-design-architecture.jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover object-left" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/50 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Camada 2 (Faixa Amarela Intermediária - z-10) */}
        <div className="hidden lg:block absolute left-0 top-0 w-full h-full bg-[#FFC800] z-10 lg:[clip-path:polygon(0_0,_58%_0,_48%_50%,_58%_100%,_0_100%)]" />

        {/* Camada 3 (Container Azul Principal - z-20) */}
        <div className="w-full h-3 bg-[#FFC800] lg:hidden" />
        <div className="relative w-full bg-[#042A8F] p-8 md:p-12 lg:p-20 z-20 flex items-center lg:[clip-path:polygon(0_0,_55%_0,_45%_50%,_55%_100%,_0_100%)]">
          <div className="max-w-2xl text-white pr-8">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFC800] backdrop-blur-sm">
              Nossos Serviços
            </span>
            <h1 className="mb-6 font-montserrat text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-white leading-[1.1]">
              Excelência em <span className="text-[#FFC800]">Soluções Imobiliárias</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-200/80 font-light max-w-2xl">
              Somos especialistas em transformar oportunidades imobiliárias em negócios seguros, oferecendo desde a consultoria estratégica até à construção e gestão do seu património em Angola.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR SERVICES (Grid 3) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
            <span className="text-[#0A43D8] font-bold tracking-widest uppercase text-xs">Áreas de Atuação</span>
            <h2 className="font-montserrat text-4xl font-extrabold text-[#021a5c] mt-4 mb-16">Nossos Serviços Completos</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {services.map((s, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-80">
                        <img 
                          src={s.image} 
                          alt={s.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/40 to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4 group-hover:bg-[#F5C400] group-hover:text-[#021a5c] transition-colors duration-300">
                            <s.icon className="w-7 h-7" />
                          </div>
                          <h3 className="font-montserrat font-bold text-lg text-white">
                            {s.title}
                          </h3>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-16">
                <Link href="/contato" className={buttonVariants({ className: 'bg-[#0A43D8] text-white hover:bg-[#FFC800] hover:text-[#03113E] px-8 py-2.5 text-lg rounded-xl' })}>
                    Solicitar Consultoria <ArrowRight className="w-5 h-5 ml-2"/>
                </Link>
            </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US (6 Grid) */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="font-montserrat text-center text-4xl font-extrabold text-[#021a5c] mb-16">Por que escolher a Okukala</h2>
            <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
                {whyChooseUs.map((item, i) => (
                    <div key={i} className="flex gap-4">
                        <span className="text-4xl font-extrabold text-[#0A43D8]/20">0{i+1}</span>
                        <div>
                            <h3 className="font-bold text-lg text-[#021a5c] mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </main>
  )
}
