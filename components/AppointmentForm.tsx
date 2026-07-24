'use client'

import { useState } from 'react'
import { Calendar, Clock, X, CalendarCheck } from 'lucide-react'

interface AppointmentFormProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  slug: string
}

const inputClass = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#03113E] placeholder:text-gray-400 focus:border-[#0A43D8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A43D8]/20 transition-all"
const labelClass = "mb-1.5 block text-sm font-semibold text-[#03113E]"

export function AppointmentForm({ isOpen, onClose, propertyTitle, slug }: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data: '',
    hora: '',
    mensagem: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log('Agendamento solicitado:', { ...formData, slug, propertyTitle })
      alert('Agendamento solicitado com sucesso! Entraremos em contacto em breve.')
      setFormData({ nome: '', email: '', telefone: '', data: '', hora: '', mensagem: '' })
      onClose()
    } catch (error) {
      console.error('Erro ao agendar visita:', error)
      alert('Erro ao agendar visita. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-backdrop-in { animation: modalBackdropIn 0.25s ease-out forwards; }
        .animate-modal-in { animation: modalSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      <div
        className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl shadow-[0_8px_40px_-8px_rgba(3,17,62,0.45)] animate-modal-in">
          {/* Header */}
          <div className="relative bg-[#0A43D8] px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <CalendarCheck size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white">Agendar Visita</h2>
                <p className="mt-0.5 text-sm font-medium text-blue-100 line-clamp-1">{propertyTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:scale-110 cursor-pointer"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
              <label className={labelClass}>Nome Completo *</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={inputClass} placeholder="Seu nome" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="seu@email.com" />
              </div>
              <div>
                <label className={labelClass}>Telefone *</label>
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required className={inputClass} placeholder="+244 912 345 678" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Data Preferida *</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="date" name="data" value={formData.data} onChange={handleChange} required className={`${inputClass} pl-10`} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Hora Preferida *</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="time" name="hora" value={formData.hora} onChange={handleChange} required className={`${inputClass} pl-10`} />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Mensagem Adicional</label>
              <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Deixe uma mensagem (opcional)..." />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-bold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
                Cancelar
              </button>
              <button type="submit" disabled={isLoading} className="flex-1 rounded-xl bg-[#0A43D8] py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/25 transition-all hover:bg-[#021a5c] hover:shadow-xl hover:shadow-blue-900/30 disabled:opacity-50 cursor-pointer">
                {isLoading ? 'Agendando...' : 'Agendar Visita'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
