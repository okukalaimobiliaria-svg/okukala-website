'use client'

import Link from 'next/link'
import {
  Shield,
  Users,
  Star,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle,
  Globe,
  Megaphone,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const team = [
  { nome: 'Francisco Kukala', cargo: 'Director Geral', image: '/Fotografias%20Corporativas/Francisco%20Okukala.jpg' },
  { nome: 'Isaac Simão', cargo: 'Director Operacional', image: '/Fotografias%20Corporativas/ISAAC%20SIM%C3%83O.jpg' },
  { nome: 'Pedro Tchivia', cargo: 'Director de Marketing', image: '/Fotografias%20Corporativas/Pedro%20Tchivia.jpeg' },
  { nome: 'Arone Chimbassi', cargo: 'Gestor de RH & Finanças', image: '/Fotografias%20Corporativas/ARONE%20CHIMBASSI.jpg' },
  { nome: 'Viriato Chipenda', cargo: 'Consultor Imobiliário', image: '/Fotografias%20Corporativas/VIRIATO%20CHIPENDA.jpg' },
  { nome: 'José Rafael', cargo: 'Consultor Imobiliário', image: '/Fotografias%20Corporativas/JOS%C3%89%20RAFAEL.jpg' },
  { nome: 'Lucimila Lucas', cargo: 'Consultora Imobiliária', image: '/Fotografias%20Corporativas/LUCIMILA%20LUCAS.jpg' },
]

const partners = [
  { nome: 'Banco de Investimento', tipo: 'Financiamento', descricao: 'Soluções de crédito para imóveis' },
  { nome: 'Consultoria Legal', tipo: 'Jurídico', descricao: 'Assessoria legal em transações' },
  { nome: 'Avaliação Profissional', tipo: 'Avaliação', descricao: 'Avaliação técnica de propriedades' },
  { nome: 'Seguros Premium', tipo: 'Seguros', descricao: 'Coberturas para imóveis e clientes' },
  { nome: 'Construtora Líder', tipo: 'Construção', descricao: 'Projetos de desenvolvimento imobiliário' },
  { nome: 'Gestor Patrimonial', tipo: 'Gestão', descricao: 'Gestão profissional de propriedades' },
  { nome: 'Plataforma Digital', tipo: 'Tecnologia', descricao: 'Ferramentas de marketing digital' },
  { nome: 'Rede Internacional', tipo: 'Networking', descricao: 'Conexões com imobiliárias internacionais' },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function SobrePage() {
  const partnersCarousel = [...partners, ...partners]

  return (
    <main className="overflow-hidden">

      {/* 1. HERO WITH CHEVRON DIVIDER */}
      <section className="relative h-auto lg:h-[600px] flex flex-col lg:flex-row overflow-hidden">
        {/* Image (Background) */}
        <div className="relative lg:absolute right-0 top-0 w-full lg:w-[64%] h-[300px] lg:h-full z-0 overflow-hidden">
          <img 
            src="/fotografias institucionais da Empresa/IMG_9070 .jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021a5c]/90 via-[#021a5c]/50 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Camada 2 (Faixa Amarela Intermediária - z-10) */}
        <div className="hidden lg:block absolute left-0 top-0 w-full h-full bg-[#FFC800] z-10 lg:[clip-path:polygon(0_0,_52%_0,_39%_50%,_52%_100%,_0_100%)]" />

        {/* Camada 3 (Container Azul Principal - z-20) */}
        <div className="w-full h-3 bg-[#FFC800] lg:hidden" />
        <div className="relative w-full bg-[#042A8F] p-8 md:p-12 lg:p-20 z-20 flex items-center lg:[clip-path:polygon(0_0,_49%_0,_36%_50%,_49%_100%,_0_100%)]">
          <div className="max-w-2xl text-white">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFC800] backdrop-blur-sm">
              Experiência Imobiliária
            </span>
            <h1 className="mb-6 font-montserrat text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-white leading-[1.1]">
              Onde a Segurança Encontra a <span className="text-[#FFC800]">Oportunidade Imobiliária</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-200/80 font-light max-w-2xl">
              Sua parceira imobiliária de confiança em Angola. Conectamos pessoas aos seus sonhos imobiliários com excelência operacional e jurídica.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. QUEM SOMOS — COLLAGE & STORY                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* Left Collage */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-tl-[60px] sm:rounded-tl-[80px] rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/fotografias%20institucionais%20da%20Empresa/IMG_8942%20-%20okukala%20imobili%C3%A1ria.jpg" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/fotografias%20institucionais%20da%20Empresa/IMG_8957%20-%20okukala%20imobili%C3%A1ria.jpg" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/fotografias%20institucionais%20da%20Empresa/IMG_8975%20-%20okukala%20imobili%C3%A1ria.jpg" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative rounded-br-[60px] sm:rounded-br-[80px] rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/fotografias%20institucionais%20da%20Empresa/IMG_8991%20-%20okukala%20imobili%C3%A1ria.jpg" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Static logo badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white p-2 shadow-2xl sm:h-28 sm:w-28">
                  <img src="/logo.png" alt="Logo OKUKALA" className="h-full w-full object-contain" />
                </div>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
                Quem Somos
              </span>
              <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-[var(--color-okukala-primary)] leading-[1.15] mb-6">
                Transformando Ideias em <span className="text-[var(--color-okukala-electric)]">Realidade Concreta</span>
              </h2>
              <div className="space-y-4 text-gray-500 font-poppins text-sm md:text-base leading-relaxed">
                <p>
                  A Okukala Imobiliária surgiu da visão de criar uma empresa capaz de oferecer soluções imobiliárias seguras, transparentes e eficientes, respondendo às necessidades de proprietários, compradores, investidores e arrendatários em Angola.
                </p>
                <p>
                  Ao longo da sua trajetória, temos consolidado a nossa experiência nas áreas de compra, venda e arrendamento de imóveis, legalização de terrenos, avaliação imobiliária, gestão de património e consultoria especializada.
                </p>
                <p>
                  Hoje, afirmamo-nos como uma marca em crescimento, comprometida com a confiança, a ética e a excelência, trabalhando diariamente para transformar oportunidades imobiliárias em negócios seguros e vantajosos para os nossos clientes.
                </p>
              </div>

                {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100 text-center sm:text-left">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-okukala-primary)] font-montserrat">18+</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Imóveis Listados</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-okukala-primary)] font-montserrat">98%</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Clientes Satisfeitos</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-okukala-primary)] font-montserrat">2+</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Anos de Experiência</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. MISSÃO, VISÃO, VALORES (SERVICE CARDS STYLE)             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-4 inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase">
              Nossa Essência
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-okukala-primary)]">
              Missão, Visão e Valores
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Missão */}
            <div className="group rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-card hover:shadow-card-hover hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex flex-col justify-between">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-okukala-electric)]/10 text-[var(--color-okukala-electric)] mb-6 group-hover:bg-[var(--color-okukala-electric)] group-hover:text-white transition-all duration-300">
                  <Megaphone className="w-7 h-7" />
                </span>
                <h3 className="font-montserrat font-bold text-xl text-[var(--color-okukala-primary)] mb-4">Missão</h3>
                <p className="text-gray-500 font-poppins text-sm leading-relaxed">
                  Desenvolver actividades imobiliárias de forma ética, eficiente e organizada, oferecendo soluções imobiliárias sustentáveis e contribuindo para o crescimento urbano, habitacional e económico da sociedade.
                </p>
              </div>
            </div>

            {/* Card 2: Visão */}
            <div className="group rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-card hover:shadow-card-hover hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex flex-col justify-between">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-okukala-accent)]/15 text-[var(--color-okukala-accent)] mb-6 group-hover:bg-[var(--color-okukala-accent)] group-hover:text-[var(--color-okukala-primary)] transition-all duration-300">
                  <Star className="w-7 h-7" />
                </span>
                <h3 className="font-montserrat font-bold text-xl text-[var(--color-okukala-primary)] mb-4">Visão</h3>
                <p className="text-gray-500 font-poppins text-sm leading-relaxed">
                  Ser uma empresa imobiliária de referência na Província da Huíla e em Angola, destacando-se pela organização, profissionalismo, inovação, credibilidade e excelência na prestação de serviços imobiliários.
                </p>
              </div>
            </div>

            {/* Card 3: Valores */}
            <div className="group rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-card hover:shadow-card-hover hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex flex-col justify-between">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-okukala-electric)]/10 text-[var(--color-okukala-electric)] mb-6 group-hover:bg-[var(--color-okukala-electric)] group-hover:text-white transition-all duration-300">
                  <Shield className="w-7 h-7" />
                </span>
                <h3 className="font-montserrat font-bold text-xl text-[var(--color-okukala-primary)] mb-4">Valores</h3>
                <ul className="grid grid-cols-2 gap-2 text-gray-500 font-poppins text-xs">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-okukala-electric)] flex-shrink-0" /> Ética</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-okukala-electric)] flex-shrink-0" /> Disciplina</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-okukala-electric)] flex-shrink-0" /> Transparência</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-okukala-electric)] flex-shrink-0" /> Inovação</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-okukala-electric)] flex-shrink-0" /> Rigor</li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-okukala-electric)] flex-shrink-0" /> Resultados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. WORK PROCESS TIMELINE SECTION                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
              Como Trabalhamos
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-okukala-primary)]">
              Nosso Processo de Trabalho Provado
            </h2>
          </div>

          <div className="relative">
            {/* Connector Line (Desktop only) */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gray-200/80 z-0"></div>

            <div className="grid gap-8 lg:grid-cols-4 relative z-10">
              {[
                { num: '01', icon: Shield, title: 'Consulta & Diagnóstico', desc: 'Reunimos as suas necessidades e preferências para traçar o perfil ideal do imóvel ou serviço.' },
                { num: '02', icon: Globe, title: 'Pesquisa & Seleção', desc: 'Filtramos as melhores oportunidades do mercado angolano, incluindo imóveis exclusivos off-market.' },
                { num: '03', icon: Building2, title: 'Visita & Rigor Documental', desc: 'Acompanhamos a vistoria física e realizamos a auditoria completa de toda a documentação legal do imóvel.' },
                { num: '04', icon: BadgeCheck, title: 'Assinatura & Fecho Seguro', desc: 'Garantimos uma negociação transparente e a entrega segura das chaves com total paz de espírito.' },
              ].map((step, i) => (
                <div key={i} className="text-center flex flex-col items-center group">
                  <div className="w-[88px] h-[88px] rounded-[18px] bg-white border-2 border-gray-200 shadow-md flex items-center justify-center relative mb-6 group-hover:border-[var(--color-okukala-electric)] group-hover:scale-105 transition-all duration-300 bg-white">
                    {/* Circle badge overlapping */}
                    <span className="w-7 h-7 rounded-[10px] bg-[var(--color-okukala-electric)] text-white text-xs font-bold flex items-center justify-center absolute -top-1 -right-1 shadow-md">
                      {step.num}
                    </span>
                    <step.icon className="w-8 h-8 text-[var(--color-okukala-electric)]" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-[var(--color-okukala-primary)] mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-poppins">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. NOSSA EQUIPE                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-4 inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase">
              Equipe
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-okukala-primary)]">
              Conheça Nossa Equipe
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500">
              Somos profissionais experientes dedicados a oferecer a melhor experiência imobiliária.
            </p>
          </div>

          {/* Row 1: 1 card */}
          <div className="flex justify-center mb-6">
            {team.slice(0, 1).map((membro, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-xs"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={membro.image}
                    alt={membro.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-montserrat font-bold text-sm text-[var(--color-okukala-primary)]">
                    {membro.nome}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--color-okukala-electric)] font-poppins font-medium">
                    {membro.cargo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 3 cards */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-6">
            {team.slice(1, 4).map((membro, idx) => (
              <div
                key={idx + 1}
                className="group rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={membro.image}
                    alt={membro.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-montserrat font-bold text-sm text-[var(--color-okukala-primary)]">
                    {membro.nome}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--color-okukala-electric)] font-poppins font-medium">
                    {membro.cargo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: 3 cards */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {team.slice(4, 7).map((membro, idx) => (
              <div
                key={idx + 4}
                className="group rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={membro.image}
                    alt={membro.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-montserrat font-bold text-sm text-[var(--color-okukala-primary)]">
                    {membro.nome}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--color-okukala-electric)] font-poppins font-medium">
                    {membro.cargo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. PARCEIROS ESTRATÉGICOS                                    */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
              Parceiros
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-okukala-primary)]">
              Nossos Parceiros Estratégicos
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
              Rede de parceiros que fortalecem a nossa proposta de valor.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee gap-6 py-2">
              {partnersCarousel.map((parceiro, idx) => (
                <div
                  key={`${parceiro.nome}-${idx}`}
                  className="group w-[280px] sm:w-[300px] rounded-2xl bg-[#f8fafc] border border-gray-100 p-7 hover:shadow-card hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex-shrink-0"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-okukala-electric)]/10 text-[var(--color-okukala-electric)] mb-5 group-hover:bg-[var(--color-okukala-electric)] group-hover:text-white transition-colors duration-300">
                    <CheckCircle className="w-6 h-6" />
                  </span>
                  <h3 className="font-montserrat font-bold text-base text-[var(--color-okukala-primary)]">{parceiro.nome}</h3>
                  <p className="text-xs font-semibold text-[var(--color-okukala-electric)] mt-1.5">{parceiro.tipo}</p>
                  <p className="text-sm text-gray-500 mt-2 font-poppins">{parceiro.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

