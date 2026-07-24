'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { sendContactForm } from '@/lib/emailjs'
import { buttonVariants } from '@/components/ui/button'

export function ContactForm() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  })

  useEffect(() => {
    const assunto = searchParams.get('assunto')
    const mensagem = searchParams.get('mensagem')
    if (assunto || mensagem) {
      setFormData((prev) => ({
        ...prev,
        assunto: assunto || prev.assunto,
        mensagem: mensagem || prev.mensagem,
      }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await sendContactForm(formData)
      setSuccess(true)
      setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-[#03113E]">
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome completo"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#03113E]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="telefone" className="mb-2 block text-sm font-semibold text-[#03113E]">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            placeholder="+244 912 345 678"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="assunto" className="mb-2 block text-sm font-semibold text-[#03113E]">
            Assunto
          </label>
          <select
            id="assunto"
            name="assunto"
            value={formData.assunto}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#03113E] focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
          >
            <option value="">Selecione o assunto</option>
            <option value="compra">Compra de Imóvel</option>
            <option value="venda">Venda de Imóvel</option>
            <option value="aluguel">Aluguel</option>
            <option value="investimento">Investimento</option>
            <option value="parceria">Parceria</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-2 block text-sm font-semibold text-[#03113E]">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Escreva sua mensagem aqui..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-600">
          Mensagem enviada com sucesso! Obrigado por contatar a OKUKALA.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={buttonVariants({ className: 'w-full rounded-full bg-[#FFC800] text-[#03113E] hover:bg-[#FFE066]' })}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : (
          'Enviar Mensagem'
        )}
      </button>
    </form>
  )
}
