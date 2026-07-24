'use client'

import { useState, FormEvent } from 'react'
import { AlertCircle, CheckCircle, Loader } from 'lucide-react'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'number'
  placeholder?: string
  required?: boolean
}

interface FormularioBaseProps {
  titulo: string
  descricao?: string
  campos: FormField[]
  onSubmit: (dados: Record<string, string>) => Promise<void>
  botaoTexto?: string
}

export function FormularioBase({
  titulo,
  descricao,
  campos,
  onSubmit,
  botaoTexto = 'Enviar',
}: FormularioBaseProps) {
  const [dados, setDados] = useState<Record<string, string>>(
    campos.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [carregando, setCarregando] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sucesso' | 'erro'>('idle')
  const [mensagemErro, setMensagemErro] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setDados((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setStatus('idle')
    setMensagemErro('')

    try {
      await onSubmit(dados)
      setStatus('sucesso')
      setDados(campos.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}))
      setTimeout(() => setStatus('idle'), 3000)
    } catch (erro) {
      setStatus('erro')
      setMensagemErro(
        erro instanceof Error ? erro.message : 'Erro ao enviar formulário'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{titulo}</h2>
      {descricao && <p className="mb-6 text-gray-600">{descricao}</p>}

      {/* Status Messages */}
      {status === 'sucesso' && (
        <div className="mb-6 flex gap-3 rounded-lg bg-blue-50 p-4 text-green-800">
          <CheckCircle className="flex-shrink-0" size={20} />
          <p>Formulário enviado com sucesso! Entraremos em contato em breve.</p>
        </div>
      )}

      {status === 'erro' && (
        <div className="mb-6 flex gap-3 rounded-lg bg-red-50 p-4 text-red-800">
          <AlertCircle className="flex-shrink-0" size={20} />
          <p>{mensagemErro}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {campos.map((campo) => (
          <div key={campo.name}>
            <label htmlFor={campo.name} className="mb-2 block text-sm font-medium text-gray-900">
              {campo.label}
              {campo.required && <span className="text-red-500">*</span>}
            </label>

            {campo.type === 'textarea' ? (
              <textarea
                id={campo.name}
                name={campo.name}
                placeholder={campo.placeholder}
                value={dados[campo.name]}
                onChange={handleChange}
                required={campo.required}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            ) : (
              <input
                id={campo.name}
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                value={dados[campo.name]}
                onChange={handleChange}
                required={campo.required}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-okukala-dark disabled:bg-gray-400"
        >
          {carregando ? (
            <div className="flex items-center justify-center gap-2">
              <Loader size={18} className="animate-spin" />
              Enviando...
            </div>
          ) : (
            botaoTexto
          )}
        </button>
      </form>
    </div>
  )
}
