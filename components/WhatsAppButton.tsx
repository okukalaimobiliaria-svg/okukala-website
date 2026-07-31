'use client'

import Image from 'next/image'

export function WhatsAppButton() {
  const whatsappNumber = '244923934470'
  const message = 'Olá! Gostaria de mais informações sobre os serviços da OKUKALA.'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group md:bottom-8 md:right-8"
      aria-label="Contactar via WhatsApp"
      title="Falar no WhatsApp"
    >
      {/* Button */}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-md animate-pulse" />
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={64}
          height={64}
          priority
          className="relative z-10 h-16 w-16 rounded-full object-cover shadow-lg shadow-black/20"
        />
      </span>

      {/* Tooltip label */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
        Falar no WhatsApp
      </span>
    </a>
  )
}

