'use client'

import { useState, Suspense } from 'react'
import { Mail, Phone, MapPin, Shield, Users, Star, ArrowRight, CheckCircle, Globe } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { MapSection } from '@/components/MapSection'
import { buttonVariants } from '@/components/ui/button'

type TabType = 'fale' | 'trabalhe' | 'investidor'

export default function ContatoPage() {
  const [activeTab, setActiveTab] = useState<TabType>('fale')

  const tabs = [
    { id: 'fale', label: 'Fale Connosco' },
    { id: 'trabalhe', label: 'Trabalhe Connosco' },
    { id: 'investidor', label: 'Portal do Investidor' },
  ] as const

  return (
    <main className="overflow-hidden">

      {/* ============================================================ */}
      {/*  1. HERO — FULL WIDTH GRADIENT                                */}
      {/* ============================================================ */}
      <section className="relative bg-[#021a5c] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Imagens/imovel3.png')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03113E]/95 via-[#01217B]/90 to-[#03113E]/95" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-[#F5C400] tracking-[0.2em] uppercase mb-5">
              Contacto
            </span>
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold leading-[1.08] text-white">
              Contacte-nos
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-lg leading-relaxed font-light">
              Estamos aqui para ajudar. Escolha a opção que melhor se adequa às suas necessidades.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
              {[
                { icon: Phone, label: '+244 912 345 678', sub: 'Telefone' },
                { icon: Mail, label: 'contato@okukala.ao', sub: 'Email' },
                { icon: MapPin, label: 'Luanda, Angola', sub: 'Localização' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#F5C400]">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. TABS + CONTENT                                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Tab Buttons */}
          <div className="mb-12 flex flex-wrap gap-2 border-b border-gray-200 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 font-semibold transition-colors text-[15px] ${
                  activeTab === tab.id
                    ? 'text-[#0A43D8]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span
                    className="absolute bottom-0 left-0 h-[3px] w-full rounded-full"
                    style={{ backgroundColor: '#0A43D8' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ======================================================== */}
          {/*  TAB 1: FALE CONNOSCO                                     */}
          {/* ======================================================== */}
          {activeTab === 'fale' && (
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Info */}
              <div>
                <span className="inline-block text-sm font-semibold text-[#F5C400] tracking-[0.2em] uppercase mb-4">
                  Fale Connosco
                </span>
                <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-[#021a5c] leading-tight">
                  Tem Dúvidas?{' '}
                  <span className="text-[#0A43D8]">Estamos Aqui.</span>
                </h2>
                <p className="mt-5 text-gray-500 text-lg leading-relaxed">
                  Entre em contacto connosco directamente. A nossa equipa está pronta para ajudar.
                </p>

                <div className="mt-10 space-y-5">
                  {[
                    { icon: Phone, title: 'Telefone', value: '+244 912 345 678', href: 'tel:+244912345678' },
                    { icon: Mail, title: 'Email', value: 'contato@okukala.ao', href: 'mailto:contato@okukala.ao' },
                    { icon: MapPin, title: 'Localização', value: 'Luanda, Angola', href: undefined },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-[#f8fafc] border border-gray-100">
                      <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0A43D8]/10 flex items-center justify-center text-[#0A43D8]">
                        <item.icon className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-montserrat font-bold text-base text-[#021a5c]">{item.title}</h3>
                        {item.href ? (
                          <a href={item.href} className="text-[#0A43D8] hover:text-[#042A8F] font-medium text-sm transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-500 text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="rounded-2xl bg-[#f8fafc] border border-gray-100 p-8 lg:p-10">
                <Suspense fallback={<div className="h-96 rounded-2xl bg-gray-50 animate-pulse" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/*  TAB 2: TRABALHE CONNOSCO                                 */}
          {/* ======================================================== */}
          {activeTab === 'trabalhe' && (
            <div className="space-y-10">
              <div className="max-w-2xl">
                <span className="inline-block text-sm font-semibold text-[#F5C400] tracking-[0.2em] uppercase mb-4">
                  Carreira
                </span>
                <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-[#021a5c] leading-tight">
                  Oportunidades de{' '}
                  <span className="text-[#0A43D8]">Carreira</span>
                </h2>
                <p className="mt-5 text-gray-500 text-lg leading-relaxed">
                  Na OKUKALA, valorizamos talento, inovação e compromisso. Junte-se a uma equipa dinâmica que está transformando o mercado imobiliário em Angola.
                </p>
              </div>

              {/* Jobs List */}
              <div>
                <h3 className="font-montserrat font-bold text-xl text-[#021a5c] mb-6">Vagas Disponíveis</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { title: 'Consultor Imobiliário', location: 'Luanda' },
                    { title: 'Gestor de Propriedades', location: 'Luanda' },
                    { title: 'Especialista em Marketing Digital', location: 'Luanda' },
                  ].map((job, idx) => (
                    <button
                      key={idx}
                      className="group text-left rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-card hover:border-[#0A43D8]/20 transition-all duration-300"
                    >
                      <h4 className="font-montserrat font-bold text-base text-[#021a5c] group-hover:text-[#0A43D8] transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0A43D8]" />
                        {job.location}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Form */}
              <div className="rounded-2xl bg-[#f8fafc] border border-gray-100 p-8 lg:p-10">
                <h3 className="font-montserrat font-bold text-xl text-[#021a5c] mb-6">Envie-nos o seu Currículo</h3>
                <form className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nome Completo</label>
                      <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Email</label>
                      <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Telefone</label>
                      <input type="tel" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="+244 912 345 678" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Cargo de Interesse</label>
                      <select className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none">
                        <option>Seleccione uma vaga</option>
                        <option>Consultor Imobiliário</option>
                        <option>Gestor de Propriedades</option>
                        <option>Especialista em Marketing Digital</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Mensagem</label>
                    <textarea rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none resize-none" placeholder="Conte-nos um pouco sobre você..." />
                  </div>
                  <button type="submit" className={buttonVariants({ className: 'w-full bg-[#0A43D8] hover:bg-[#042A8F]' })}>
                    Enviar Candidatura
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/*  TAB 3: PORTAL DO INVESTIDOR                              */}
          {/* ======================================================== */}
          {activeTab === 'investidor' && (
            <div className="space-y-10">
              <div className="max-w-2xl">
                <span className="inline-block text-sm font-semibold text-[#F5C400] tracking-[0.2em] uppercase mb-4">
                  Investimento
                </span>
                <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold text-[#021a5c] leading-tight">
                  Oportunidades de{' '}
                  <span className="text-[#0A43D8]">Investimento</span>
                </h2>
                <p className="mt-5 text-gray-500 text-lg leading-relaxed">
                  Explore oportunidades de investimento imobiliário de alta rentabilidade em Angola. O mercado imobiliário oferece retornos atractivos para investidores estratégicos.
                </p>
              </div>

              {/* Investment Options */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'Residential', description: 'Investimentos em habitação residencial de qualidade' },
                  { title: 'Comercial', description: 'Espaços comerciais prime location' },
                  { title: 'Industrial', description: 'Propriedades para fins industriais' },
                  { title: 'Desenvolvimento', description: 'Projectos de desenvolvimento imobiliário' },
                ].map((option, idx) => (
                  <div key={idx} className="group rounded-2xl bg-[#f8fafc] border border-gray-100 p-7 hover:shadow-card hover:border-[#0A43D8]/20 transition-all duration-300">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0A43D8]/10 text-[#0A43D8] mb-5 group-hover:bg-[#0A43D8] group-hover:text-white transition-colors duration-300">
                      <Star className="w-6 h-6" />
                    </span>
                    <h3 className="font-montserrat font-bold text-base text-[#021a5c]">{option.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{option.description}</p>
                  </div>
                ))}
              </div>

              {/* Investor Form */}
              <div className="rounded-2xl bg-[#f8fafc] border border-gray-100 p-8 lg:p-10">
                <h3 className="font-montserrat font-bold text-xl text-[#021a5c] mb-6">Manifestar Interesse</h3>
                <form className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nome</label>
                      <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Email</label>
                      <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Telefone</label>
                      <input type="tel" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="+244 912 345 678" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Tipo de Investimento</label>
                      <select className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none">
                        <option>Seleccione</option>
                        <option>Residential</option>
                        <option>Comercial</option>
                        <option>Industrial</option>
                        <option>Desenvolvimento</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Mensagem</label>
                    <textarea rows={5} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none resize-none" placeholder="Descreva seu interesse e preferências de investimento..." />
                  </div>
                  <button type="submit" className={buttonVariants({ className: 'w-full bg-[#0A43D8] hover:bg-[#042A8F]' })}>
                    Solicitar Informações
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* ============================================================ */}
      {/*  BOTTOM FEATURES BAR                                          */}
      {/* ============================================================ */}
      <section className="bg-[#03113E] py-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Segurança Garantida', desc: 'Todas as transações são protegidas' },
              { icon: Users, title: 'Equipe Especializada', desc: 'Profissionais experientes' },
              { icon: Globe, title: 'Cobertura Nacional', desc: 'Imóveis em todo o país' },
              { icon: CheckCircle, title: 'Documentação OK', desc: 'Papelária sempre em ordem' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-3"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FFC800]/10 flex items-center justify-center text-[#FFC800]">
                  <item.icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-white text-xs md:text-sm font-semibold">{item.title}</p>
                  <p className="text-gray-400 text-[11px] md:text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
