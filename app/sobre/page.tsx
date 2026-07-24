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

const teamMembers = [
  {
    departamento: 'Direcção Geral',
    membros: ['Francisco Mukevela Kukala'],
  },
  {
    departamento: 'Direcção Operacional',
    membros: ['Isaac Simão'],
  },
  {
    departamento: 'Departamento Financeiro',
    membros: ['Arone Tchimbassi'],
  },
  {
    departamento: 'Departamento de Recursos Humanos',
    membros: ['Arone Tchimbassi'],
  },
  {
    departamento: 'Departamento Comercial e Captação',
    membros: ['Isaac Simão', 'José Rafael', 'Viriato Chipenda', 'Lucimila Lucas'],
  },
  {
    departamento: 'Departamento Administrativo',
    membros: ['Arone Tchimbassi', 'Pedro Tchivia'],
  },
  {
    departamento: 'Departamento de Marketing e Imagem',
    membros: ['Pedro Tchivia'],
  },
  {
    departamento: 'Consultores e Captadores Imobiliários',
    membros: ['José Rafael', 'Viriato Chipenda', 'Lucimila Lucas'],
  },
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
  const marqueeItems = [
    'Mediação Imobiliária',
    'Compra e Venda',
    'Arrendamento de Imóveis',
    'Legalização de Terrenos',
    'Avaliação Imobiliária',
    'Gestão de Património',
    'Consultoria Especializada',
  ]

  return (
    <main className="overflow-hidden">

      {/* ============================================================ */}
      {/*  1. HERO — DARK IMAGE OVERLAY LAYOUT                         */}
      {/* ============================================================ */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/fotografias institucionais da Empresa/IMG_8975 - okukala imobiliária.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#03113E]/80 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-okukala-accent)] tracking-[0.25em] uppercase mb-4">
            Experiência Imobiliária Premium
          </span>
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
            Onde a Segurança Encontra a Oportunidade Imobiliária
          </h1>
          <p className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl font-poppins leading-relaxed">
            Sua parceira imobiliária de confiança em Angola. Conectamos pessoas aos seus sonhos imobiliários com excelência operacional e jurídica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href="/contato" className="btn-primary rounded-lg">
              Fale Connosco
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/imoveis"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-white text-white font-extrabold uppercase text-xs tracking-wider hover:bg-white hover:text-[var(--color-okukala-primary)] transition-all duration-200"
            >
              Explorar Imóveis
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. SCROLLING MARQUEE BANNER                                 */}
      {/* ============================================================ */}
      <div className="w-full bg-[var(--color-okukala-electric)] text-white py-4 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(marqueeItems).flat().map((item, idx) => (
            <span key={idx} className="flex items-center mx-4 text-xs sm:text-sm font-bold uppercase tracking-widest">
              {item}
              <span className="ml-8 text-[var(--color-okukala-accent)] text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  3. QUEM SOMOS — COLLAGE & STORY                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* Left Collage */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-tl-[60px] sm:rounded-tl-[80px] rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/Imagens/imovel1.png" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/Imagens/imovel3.png" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/Imagens/imovel4.png" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative rounded-br-[60px] sm:rounded-br-[80px] rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img src="/Imagens/imovel2.png" alt="OKUKALA" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Rotating badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--color-okukala-electric)] text-white flex flex-col items-center justify-center p-2 text-center shadow-2xl border-4 border-white animate-spin-slow">
                  <span className="text-[7px] sm:text-[9px] font-extrabold uppercase tracking-[0.15em] leading-tight block">
                    OKUKALA • IMOBILIÁRIA
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-extrabold text-[var(--color-okukala-accent)] mt-0.5">✦</span>
                </div>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
                // Quem Somos
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
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-okukala-primary)] font-montserrat">1500+</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Imóveis</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-okukala-primary)] font-montserrat">800+</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Clientes</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-okukala-primary)] font-montserrat">10+</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Anos</p>
                </div>
              </div>

              {/* CEO Signature Block */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[var(--color-okukala-electric)]/10 flex items-center justify-center text-[var(--color-okukala-electric)]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[var(--color-okukala-primary)] font-montserrat">Francisco Mukevela Kukala</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Director Geral</p>
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
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
              Nossa Essência
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-okukala-primary)]">
              Missão, Visão e Valores
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Missão */}
            <div className="group rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-card hover:shadow-card-hover hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-okukala-electric)]/10 text-[var(--color-okukala-electric)] mb-6 group-hover:bg-[var(--color-okukala-electric)] group-hover:text-white transition-all duration-300">
                  <Megaphone className="w-7 h-7" />
                </span>
                <h3 className="font-montserrat font-bold text-xl text-[var(--color-okukala-primary)] mb-4">Missão</h3>
                <p className="text-gray-500 font-poppins text-sm leading-relaxed">
                  Desenvolver actividades imobiliárias de forma ética, eficiente e organizada, oferecendo soluções imobiliárias sustentáveis e contribuindo para o crescimento urbano, habitacional e económico da sociedade.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/contato" className="text-xs font-bold text-[var(--color-okukala-electric)] group-hover:underline flex items-center gap-1.5">
                  Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Visão */}
            <div className="group rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-card hover:shadow-card-hover hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-okukala-accent)]/15 text-[var(--color-okukala-accent)] mb-6 group-hover:bg-[var(--color-okukala-accent)] group-hover:text-[var(--color-okukala-primary)] transition-all duration-300">
                  <Star className="w-7 h-7" />
                </span>
                <h3 className="font-montserrat font-bold text-xl text-[var(--color-okukala-primary)] mb-4">Visão</h3>
                <p className="text-gray-500 font-poppins text-sm leading-relaxed">
                  Ser uma empresa imobiliária de referência na Província da Huíla e em Angola, destacando-se pela organização, profissionalismo, inovação, credibilidade e excelência na prestação de serviços imobiliários.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/contato" className="text-xs font-bold text-[var(--color-okukala-electric)] group-hover:underline flex items-center gap-1.5">
                  Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Valores */}
            <div className="group rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-card hover:shadow-card-hover hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
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
              <div className="mt-6">
                <Link href="/contato" className="text-xs font-bold text-[var(--color-okukala-electric)] group-hover:underline flex items-center gap-1.5">
                  Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. WORK PROCESS TIMELINE SECTION                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
              // Como Trabalhamos
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
                  <div className="w-[88px] h-[88px] rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center relative mb-6 group-hover:border-[var(--color-okukala-electric)] group-hover:scale-105 transition-all duration-300 bg-white">
                    {/* Circle badge overlapping */}
                    <span className="w-7 h-7 rounded-full bg-[var(--color-okukala-electric)] text-white text-xs font-bold flex items-center justify-center absolute -top-1 -right-1 shadow-md">
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
      {/*  6. SECOND SCROLLING MARQUEE BANNER                          */}
      {/* ============================================================ */}
      <div className="w-full bg-[var(--color-okukala-electric)] text-white py-4 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(marqueeItems).flat().map((item, idx) => (
            <span key={idx} className="flex items-center mx-4 text-xs sm:text-sm font-bold uppercase tracking-widest">
              {item}
              <span className="ml-8 text-[var(--color-okukala-accent)] text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  7. NOSSA EQUIPE                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-[var(--color-okukala-electric)] tracking-[0.2em] uppercase mb-4">
              Equipe
            </span>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-okukala-primary)]">
              Conheça Nossa Equipe
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
              Somos profissionais experientes dedicados a oferecer a melhor experiência imobiliária.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((membro, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white border border-gray-100 p-8 hover:shadow-card hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300"
              >
                <div className="mb-5 h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--color-okukala-electric)]/10 to-[var(--color-okukala-electric)]/20 flex items-center justify-center group-hover:from-[var(--color-okukala-electric)] group-hover:to-[var(--color-okukala-primary)] transition-all duration-300">
                  <span className="text-xl font-bold text-[var(--color-okukala-electric)] group-hover:text-white transition-colors duration-300">
                    {membro.departamento.charAt(0)}
                  </span>
                </div>
                <h3 className="font-montserrat font-bold text-base text-[var(--color-okukala-primary)]">{membro.departamento}</h3>
                <ul className="mt-4 space-y-1.5">
                  {membro.membros.map((nome, i) => (
                    <li key={i} className="text-sm text-gray-600 font-poppins">{nome}</li>
                  ))}
                </ul>
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partners.map((parceiro, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-[#f8fafc] border border-gray-100 p-7 hover:shadow-card hover:border-[var(--color-okukala-electric)]/20 transition-all duration-300"
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
      </section>

    </main>
  )
}

