'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { Mail, Phone, MapPin, Shield, Users, Star, ArrowRight, CheckCircle, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { MapSection } from '@/components/MapSection'
import { sendInvestorInterest, sendWorkApplicationForm } from '@/lib/emailjs'

interface JobItem {
  title: string
  location: string
  description: string
  requirements: string[]
  image: string
}

interface InvestmentItem {
  title: string
  description: string
  image: string
}

type TabType = 'fale' | 'trabalhe' | 'investidor'

export default function ContatoPage() {
  const [activeTab, setActiveTab] = useState<TabType>('fale')
  const [activeJobIndex, setActiveJobIndex] = useState(0)
  const trabalheFormRef = useRef<HTMLFormElement>(null)
  const [activeInvestmentIndex, setActiveInvestmentIndex] = useState(0)
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [investments, setInvestments] = useState<InvestmentItem[]>([])
  const [loadingContent, setLoadingContent] = useState(true)
  const [trabalheForm, setTrabalheForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    mensagem: '',
  })
  const [trabalheLoading, setTrabalheLoading] = useState(false)
  const [trabalheSuccess, setTrabalheSuccess] = useState(false)
  const [trabalheError, setTrabalheError] = useState('')
  const [investidorForm, setInvestidorForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoInvestimento: '',
    mensagem: '',
  })
  const [investidorLoading, setInvestidorLoading] = useState(false)
  const [investidorSuccess, setInvestidorSuccess] = useState(false)
  const [investidorError, setInvestidorError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadContent = async () => {
      try {
        const [jobsRes, investmentsRes] = await Promise.all([
          fetch('/api/hygraph/content?type=jobs'),
          fetch('/api/hygraph/content?type=investments'),
        ])

        const jobsData = await jobsRes.json()
        const investmentsData = await investmentsRes.json()

        if (!mounted) return

        if (jobsData?.items?.length) {
          setJobs(jobsData.items)
          setTrabalheForm((prev) => ({ ...prev, cargo: jobsData.items[0].title }))
        }

        if (investmentsData?.items?.length) {
          setInvestments(investmentsData.items)
          setInvestidorForm((prev) => ({ ...prev, tipoInvestimento: investmentsData.items[0].title }))
        }
      } catch (error) {
        console.warn('Hygraph content loading failed:', error)
      } finally {
        if (mounted) setLoadingContent(false)
      }
    }

    loadContent()

    return () => {
      mounted = false
    }
  }, [])

  const tabs = [
    { id: 'fale', label: 'Fale Connosco' },
    { id: 'trabalhe', label: 'Trabalhe Connosco' },
    { id: 'investidor', label: 'Portal do Investidor' },
  ] as const

  const handleTrabalheChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTrabalheForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'cargo') {
      const index = jobs.findIndex((job) => job.title === value)
      if (index !== -1) {
        setActiveJobIndex(index)
      }
    }
  }

  const handleInvestorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setInvestidorForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'tipoInvestimento') {
      const index = investments.findIndex((option) => option.title === value)
      if (index !== -1) {
        setActiveInvestmentIndex(index)
      }
    }
  }

  const handleTrabalheSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTrabalheLoading(true)
    setTrabalheError('')
    setTrabalheSuccess(false)

    const form = trabalheFormRef.current
    if (!form) {
      setTrabalheLoading(false)
      return
    }

    try {
      await sendWorkApplicationForm(form)

      // Persist to Hygraph (server-side) if token and content model exist
      try {
        await fetch('/api/hygraph/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'work', data: { ...trabalheForm, cargo: jobs[activeJobIndex]?.title || trabalheForm.cargo } }),
        })
      } catch (hyErr) {
        console.warn('Hygraph submission failed:', hyErr)
      }

      setTrabalheSuccess(true)
      setTrabalheForm({ nome: '', email: '', telefone: '', cargo: jobs[activeJobIndex]?.title || trabalheForm.cargo, mensagem: '' })
      form.reset()
      const curriculoInput = form.querySelector('input[name="curriculo"]')
      if (curriculoInput instanceof HTMLInputElement) {
        curriculoInput.value = ''
      }
      setTimeout(() => setTrabalheSuccess(false), 4000)
    } catch (err) {
      setTrabalheError('Erro ao enviar candidatura. Tente novamente.')
      console.error(err)
    } finally {
      setTrabalheLoading(false)
    }
  }

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setInvestidorLoading(true)
    setInvestidorError('')
    setInvestidorSuccess(false)

    try {
      await sendInvestorInterest({
        ...investidorForm,
        tipoInvestimento: investidorForm.tipoInvestimento || investments[activeInvestmentIndex]?.title || investidorForm.tipoInvestimento,
      })

      // Persist investor interest to Hygraph
      try {
        await fetch('/api/hygraph/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'investor', data: { ...investidorForm, tipoInvestimento: investidorForm.tipoInvestimento || investments[activeInvestmentIndex]?.title || investidorForm.tipoInvestimento } }),
        })
      } catch (hyErr) {
        console.warn('Hygraph investor submission failed:', hyErr)
      }
      setInvestidorSuccess(true)
      setInvestidorForm({ nome: '', email: '', telefone: '', tipoInvestimento: investments[activeInvestmentIndex]?.title || investidorForm.tipoInvestimento, mensagem: '' })
      setTimeout(() => setInvestidorSuccess(false), 4000)
    } catch (err) {
      setInvestidorError('Erro ao enviar pedido de informação. Tente novamente.')
      console.error(err)
    } finally {
      setInvestidorLoading(false)
    }
  }

  return (
    <main className="overflow-hidden">

      {/* 1. HERO WITH CHEVRON DIVIDER */}
      <section className="relative h-auto lg:h-[600px] flex flex-col lg:flex-row overflow-hidden">
        {/* Image (Background) */}
        <div className="relative lg:absolute right-0 top-0 w-full lg:w-[64%] h-[300px] lg:h-full z-0 overflow-hidden">
          <img 
            src="/heros/customer-service-business-contact-concept-wooden-cube-block-which-print-screen-letter-telephone-email-address-message (2).jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover object-left" 
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
              Contacto
            </span>
            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
              Contacte-<span className="text-[#FFC800]">nos</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200/80 font-light max-w-2xl">
              Estamos aqui para ajudar. Escolha a opção que melhor se adequa às suas necessidades — fale connosco, envie-nos o seu currículo ou explore as oportunidades exclusivas para investidores no mercado angolano.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. TABS + CONTENT                                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Tab Buttons */}
          <div className="mb-16 flex justify-center">
            <div className="inline-flex p-1 bg-gray-100 rounded-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3.5 font-bold text-sm rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0A43D8] shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/*  TAB 1: FALE CONNOSCO                                     */}
          {/* ======================================================== */}
          {activeTab === 'fale' && (
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Info */}
              <div>
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-okukala-electric)]">
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
                    { icon: MapPin, title: 'Localização', value: 'Angola / Huíla / Lubango', href: undefined },
                    { icon: Phone, title: 'Telefone', value: '923 934 470 / 932 263 593', href: 'tel:+244923934470' },
                    { icon: Mail, title: 'Email', value: 'okukalaimobiliaria@gmail.com', href: 'mailto:okukalaimobiliaria@gmail.com' },
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

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-montserrat font-bold text-base text-[#021a5c] mb-4">Redes Sociais</h3>
                  <div className="flex gap-3">
                    {[
                      {
                        href: 'https://www.instagram.com/okukalaimobiliaria?igsh=MW40d2djMzZ4dXlkMA==',
                        label: 'Instagram',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        ),
                      },
                      {
                        href: 'https://www.facebook.com/profile.php?id=61570060736176',
                        label: 'Facebook',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        ),
                      },
                      {
                        href: 'https://www.tiktok.com/@okukalaimobiliaria?is_from_webapp=1&sender_device=pc',
                        label: 'TikTok',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                          </svg>
                        ),
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A43D8]/10 text-[#0A43D8] transition-all duration-300 hover:bg-[#0A43D8] hover:text-white"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
              {/* Left Column: Job Carousel */}
              <div className="lg:col-span-5 flex flex-col bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex-grow">
                  {loadingContent ? (
                    <div className="h-64 w-full rounded-2xl mb-6 animate-pulse bg-slate-200" />
                  ) : jobs.length > 0 ? (
                    <>
                      <div className="h-64 w-full rounded-2xl mb-6 overflow-hidden">
                        <img src={jobs[activeJobIndex]?.image || ''} alt={jobs[activeJobIndex]?.title || 'Oportunidade'} className="w-full h-full object-cover" />
                      </div>
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3">
                        {jobs[activeJobIndex]?.location || 'Luanda'}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{jobs[activeJobIndex]?.title || 'Oportunidade'}</h3>
                      <p className="text-sm text-slate-600 mb-5">{jobs[activeJobIndex]?.description || ''}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Requisitos:</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                          {(jobs[activeJobIndex]?.requirements?.length ? jobs[activeJobIndex].requirements : []).map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                      Sem vagas disponíveis no momento.
                    </div>
                  )}
                </div>
                
                {!loadingContent && jobs.length > 0 && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">{jobs.length ? `${activeJobIndex + 1} / ${jobs.length}` : '0 / 0'}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActiveJobIndex((prev) => (prev === 0 ? Math.max(jobs.length - 1, 0) : prev - 1))}
                        className="p-3 rounded-full bg-slate-100 hover:bg-[#0A43D8] text-slate-600 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setActiveJobIndex((prev) => (prev === Math.max(jobs.length - 1, 0) ? 0 : prev + 1))}
                        className="p-3 rounded-full bg-slate-100 hover:bg-[#0A43D8] text-slate-600 hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-7 rounded-2xl bg-[#f8fafc] border border-gray-100 p-8 lg:p-10">
                <h3 className="font-montserrat font-bold text-xl text-[#021a5c] mb-6">Envie-nos o seu Currículo</h3>
                <form
                  ref={trabalheFormRef}
                  onSubmit={handleTrabalheSubmit}
                  encType="multipart/form-data"
                  method="post"
                  className="space-y-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nome Completo</label>
                      <input type="text" name="nome" value={trabalheForm.nome} onChange={handleTrabalheChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Email</label>
                      <input type="email" name="email" value={trabalheForm.email} onChange={handleTrabalheChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Telefone</label>
                      <input type="tel" name="telefone" value={trabalheForm.telefone} onChange={handleTrabalheChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="+244 912 345 678" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Cargo de Interesse</label>
                      <select
                        name="cargo"
                        value={trabalheForm.cargo}
                        onChange={handleTrabalheChange}
                        className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none"
                      >
                        {jobs.map((job) => <option key={job.title} value={job.title}>{job.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Mensagem</label>
                    <textarea name="mensagem" value={trabalheForm.mensagem} onChange={handleTrabalheChange} rows={4} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none resize-none" placeholder="Conte-nos um pouco sobre você..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Currículo</label>
                    <input
                      type="file"
                      name="curriculo"
                      accept=".pdf,.doc,.docx"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#0A43D8] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#042A8F]"
                    />
                    <p className="mt-2 text-xs text-gray-500">Anexe o seu currículo em PDF, DOC ou DOCX.</p>
                  </div>
                  {trabalheError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                      {trabalheError}
                    </div>
                  )}
                  {trabalheSuccess && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-600">
                      Candidatura enviada com sucesso. A nossa equipa irá entrar em contacto.
                    </div>
                  )}
                  <button type="submit" disabled={trabalheLoading} className="w-full bg-[#0A43D8] hover:bg-[#042A8F] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0A43D8]/20 disabled:opacity-60">
                    {trabalheLoading ? 'Enviando...' : 'Enviar Candidatura'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/*  TAB 3: PORTAL DO INVESTIDOR                              */}
          {/* ======================================================== */}
          {activeTab === 'investidor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
              {/* Left Column: Investment Card */}
              <div className="lg:col-span-5 flex flex-col bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex-grow">
                  {loadingContent ? (
                    <div className="h-64 w-full rounded-2xl mb-6 animate-pulse bg-slate-200" />
                  ) : investments.length > 0 ? (
                    <>
                      <div className="h-64 w-full rounded-2xl mb-6 overflow-hidden">
                        <img src={investments[activeInvestmentIndex]?.image || ''} alt={investments[activeInvestmentIndex]?.title || 'Oportunidade'} className="w-full h-full object-cover" />
                      </div>
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-3 uppercase tracking-wider">
                        Oportunidade de Investimento
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{investments[activeInvestmentIndex]?.title || 'Oportunidade'}</h3>
                      <p className="text-sm text-slate-600 mb-5">{investments[activeInvestmentIndex]?.description || ''}</p>
                    </>
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                      Sem oportunidades de investimento disponíveis no momento.
                    </div>
                  )}
                </div>

                {!loadingContent && investments.length > 0 && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">{investments.length ? `${activeInvestmentIndex + 1} / ${investments.length}` : '0 / 0'}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActiveInvestmentIndex((prev) => (prev === 0 ? Math.max(investments.length - 1, 0) : prev - 1))}
                        className="p-3 rounded-full bg-slate-100 hover:bg-[#0A43D8] text-slate-600 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setActiveInvestmentIndex((prev) => (prev === Math.max(investments.length - 1, 0) ? 0 : prev + 1))}
                        className="p-3 rounded-full bg-slate-100 hover:bg-[#0A43D8] text-slate-600 hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Investor Form */}
              <div className="lg:col-span-7 rounded-2xl bg-[#f8fafc] border border-gray-100 p-8 lg:p-10">
                <h3 className="font-montserrat font-bold text-xl text-[#021a5c] mb-6">Manifestar Interesse</h3>
                <form onSubmit={handleInvestorSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nome</label>
                      <input type="text" name="nome" value={investidorForm.nome} onChange={handleInvestorChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Email</label>
                      <input type="email" name="email" value={investidorForm.email} onChange={handleInvestorChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Telefone</label>
                      <input type="tel" name="telefone" value={investidorForm.telefone} onChange={handleInvestorChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none" placeholder="+244 912 345 678" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1.5">Tipo de Investimento</label>
                      <select
                        name="tipoInvestimento"
                        value={investidorForm.tipoInvestimento}
                        onChange={handleInvestorChange}
                        className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none"
                      >
                        {investments.map((opt) => <option key={opt.title} value={opt.title}>{opt.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Mensagem</label>
                    <textarea name="mensagem" value={investidorForm.mensagem} onChange={handleInvestorChange} rows={5} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white focus:border-[#0A43D8] focus:ring-2 focus:ring-[#0A43D8]/20 outline-none resize-none" placeholder="Descreva seu interesse e preferências de investimento..." />
                  </div>
                  {investidorError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                      {investidorError}
                    </div>
                  )}
                  {investidorSuccess && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-600">
                      Pedido de informação enviado com sucesso. Responderemos em breve.
                    </div>
                  )}
                  <button type="submit" disabled={investidorLoading} className="w-full bg-[#0A43D8] hover:bg-[#042A8F] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0A43D8]/20 disabled:opacity-60">
                    {investidorLoading ? 'Enviando...' : 'Solicitar Informações'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </main>
  )
}

