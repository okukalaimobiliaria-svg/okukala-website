'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AppointmentForm } from '@/components/AppointmentForm'

interface PropertyDetailClientProps {
  slug: string
  titulo: string
}

export function PropertyDetailClient({ slug, titulo }: PropertyDetailClientProps) {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  const mensagem = `Olá, estou interessado no imóvel "${titulo}". Gostaria de obter mais informações sobre preço, localização e disponibilidade.`
  const href = `/contato?assunto=Imóvel: ${encodeURIComponent(titulo)}&mensagem=${encodeURIComponent(mensagem)}`

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setIsAppointmentOpen(true)}
          className="w-full rounded-xl bg-[#0A43D8] px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-[#021a5c] hover:shadow-lg cursor-pointer"
        >
          Agendar Visita
        </button>
        <Link
          href={href}
          className="flex w-full items-center justify-center rounded-xl border-2 border-[#0A43D8] bg-transparent px-6 py-3.5 font-bold text-[#0A43D8] transition-all hover:bg-[#0A43D8]/10"
        >
          Solicitar Informações
        </Link>
      </div>
      <AppointmentForm
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        slug={slug}
        propertyTitle={titulo}
      />
    </>
  )
}
