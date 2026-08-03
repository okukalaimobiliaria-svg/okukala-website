'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone, ArrowRight, Send } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Imóveis', href: '/imoveis' },
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contato', href: '/contato' },
  ]

  const serviceLinks = [
    { label: 'Venda e Arrendamento', href: '/imoveis' },
    { label: 'Venda de Terrenos e Fazendas', href: '/imoveis' },
    { label: 'Avaliação Imobiliária', href: '/imoveis' },
    { label: 'Gestão de Propriedades', href: '/imoveis' },
    { label: 'Consultoria Especializada', href: '/contato' },
  ]

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A43D8 0%, #021a5c 28%, #03113E 60%, #01081f 100%)' }}>

      {/* Decorative glow blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#0A43D8]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-56 h-56 rounded-full bg-[#FFC800]/10 blur-3xl pointer-events-none" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* ── Col 1: Brand (wider) ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Image
              src="/logo 02.png"
              alt="OKUKALA Imobiliária"
              width={180}
              height={56}
              className="h-auto w-[160px] object-contain"
            />
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              A plataforma imobiliária líder em inteligência, transparência e oportunidades únicas de investimento em Angola.
            </p>

            {/* CTA Button */}
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-lg bg-[#0A43D8] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FFC800] hover:text-[#03113E] transition-all duration-300 shadow-lg hover:shadow-[#FFC800]/20 hover:shadow-xl group"
            >
              Explorar Imóveis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Social Icons */}
            <div className="flex gap-3 pt-1">
              {[
                {
                  href: 'https://www.instagram.com/okukalaimobiliaria?igsh=MW40d2djMzZ4dXlkMA==',
                  label: 'Instagram',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://www.facebook.com/profile.php?id=61570060736176',
                  label: 'Facebook',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://www.tiktok.com/@okukalaimobiliaria?is_from_webapp=1&sender_device=pc',
                  label: 'TikTok',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC800] hover:bg-[#FFC800] hover:text-[#03113E] hover:shadow-lg hover:shadow-[#FFC800]/20"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-white">Navegação</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href} className="flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A43D8] group-hover:bg-[#FFC800] transition-colors duration-200 flex-shrink-0" />
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-all duration-200 hover:text-white hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-white">Nossos Serviços</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label} className="flex items-start gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A43D8] group-hover:bg-[#FFC800] transition-colors duration-200 flex-shrink-0 mt-1.5" />
                  <a
                    href={link.href}
                    className="text-sm text-white/55 transition-all duration-200 hover:text-white hover:translate-x-1 inline-block leading-snug"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contacts + Newsletter ── */}
          <div className="lg:col-span-3">
            {/* Contacts */}
            <h3 className="mb-6 text-xs font-extrabold uppercase tracking-[0.2em] text-white">Contactos</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0A43D8]/20 flex items-center justify-center text-white group-hover:text-[#FFC800] group-hover:bg-[#0A43D8]/40 transition-colors">
                  <MapPin size={14} />
                </span>
                <span className="text-sm text-white/55 leading-snug pt-1">Angola / Huíla / Lubango</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0A43D8]/20 flex items-center justify-center text-white group-hover:text-[#FFC800] group-hover:bg-[#0A43D8]/40 transition-colors">
                  <Phone size={14} />
                </span>
                <span className="text-sm text-white/55">923 934 470 / 932 263 593</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0A43D8]/20 flex items-center justify-center text-white group-hover:text-[#FFC800] group-hover:bg-[#0A43D8]/40 transition-colors">
                  <Mail size={14} />
                </span>
                <span className="text-sm text-white/55 break-all">okukalaimobiliaria@gmail.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white mb-2">Newsletter</h4>
              <p className="text-xs text-white/45 mb-4 leading-relaxed">Receba as últimas novidades imobiliárias em primeira mão.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O seu e-mail"
                  className="flex-1 bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#FFC800]/60 focus:bg-white/12 transition-all duration-200 min-w-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                />
                <button
                  type="button"
                  className="flex-shrink-0 flex items-center justify-center w-11 h-10 rounded-lg bg-[#0A43D8] text-white hover:bg-[#FFC800] hover:text-[#03113E] transition-all duration-300 shadow-md"
                  aria-label="Subscrever Newsletter"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 py-5">
          <p className="text-xs text-white/35 text-center">
            © {currentYear} <span className="text-white/55 font-semibold">OKUKALA Imobiliária</span>. Todos os direitos reservados. By RC Media
          </p>
        </div>
      </div>
    </footer>
  )
}

