'use client'

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
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#20c65a] group-hover:shadow-[#25D366]/60">
        {/* Official WhatsApp icon: speech bubble with phone handset */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-7 h-7"
          fill="white"
        >
          <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 27.827793 5.0721867 31.401462 6.9765625 34.425781 L 4.03125 43.96875 L 13.988281 41.050781 C 16.963097 42.82717 20.362853 43.857958 24 43.857958 C 35.027934 43.857958 44 34.885017 44 23.857958 C 44 12.830899 35.027934 4 24 4 z M 24 7 C 33.406097 7 41 14.593903 41 24 C 41 33.406097 33.406097 41 24 41 C 20.668779 41 17.578383 39.987386 15.011719 38.246094 L 14.337891 37.798828 L 7.8359375 39.798828 L 9.8671875 33.515625 L 9.3789063 32.824219 C 7.4581992 30.195418 6.3576986 26.964816 6.3576986 23.5 C 6.3576986 14.320508 13.820508 7 24 7 z M 16.642578 13 C 16.202578 13 15.521406 13.16975 14.941406 13.84375 C 14.361406 14.51775 12.75 16.039844 12.75 19.089844 C 12.75 22.139844 15.003906 25.085938 15.253906 25.460938 C 15.493906 25.835938 18.955078 31.644531 24.6875 34.144531 C 27.102594 45.186531 29.144485 45.786531 30.644485 45.786531 C 32.144485 45.786531 34.359375 44.748438 34.859375 43.498438 C 35.359375 42.248438 35.349609 41.197266 35.099609 40.697266 C 34.849609 40.197266 34.474609 39.947266 33.974609 39.697266 C 33.474609 39.447266 30.875 38.139609 30.375 37.849609 C 29.875 37.559609 29.445312 37.509609 29.070312 38.099609 C 28.695312 38.689609 27.711875 39.799219 27.421875 40.199219 C 27.131875 40.599219 26.845703 40.648438 26.345703 40.398438 C 25.845703 40.148438 24.117969 39.560547 22.167969 37.810547 C 20.637969 36.440547 19.614297 34.759766 19.279297 34.134766 C 18.944297 33.509766 19.244969 33.165 19.484969 32.875 C 19.704969 32.615 19.984375 32.199219 20.234375 31.949219 C 20.484375 31.699219 20.524688 31.449219 20.804688 30.949219 C 21.084688 30.449219 20.954297 30.099609 20.779297 29.849609 C 20.604297 29.599609 19.050781 25.939453 18.300781 24.189453 C 17.660781 22.659453 17.003641 22.607753 16.378641 22.564453 C 16.128641 22.547453 15.842578 22.548828 15.517578 22.548828 z" />
        </svg>
      </span>

      {/* Tooltip label */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
        Falar no WhatsApp
      </span>
    </a>
  )
}

