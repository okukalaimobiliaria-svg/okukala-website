'use client'

import { useState } from 'react'
import { PropertyInquiryModal } from '@/components/PropertyInquiryModal'

interface PropertyInquiryModalWrapperProps {
  slug: string
  titulo: string
}

export function PropertyInquiryModalWrapper({ slug, titulo }: PropertyInquiryModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-xl border-2 border-[#0A43D8] bg-transparent px-6 py-3.5 font-bold text-[#0A43D8] transition-all hover:bg-[#0A43D8]/10 cursor-pointer"
      >
        Solicitar Informações
      </button>
      <PropertyInquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        slug={slug}
        titulo={titulo}
      />
    </>
  )
}
