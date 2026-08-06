'use client'

import { useState } from 'react'
import { Map, Car, Bike, Footprints, Navigation } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

const LOCATION_COORDS = {
  m: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15782.992228717196!2d13.4883492!3d-15.0617755!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b93f7c46c36f56d%3A0x6758410221e5e019!2sRua%2028%20de%20Maio%2C%20Lubango%2C%20Angola!5e0!3m2!1spt-PT!2spt!4v1716987654321!5m2!1spt-PT!2spt",
  k: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15782.992228717196!2d13.4883492!3d-15.0617755!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b93f7c46c36f56d%3A0x6758410221e5e019!2sRua%2028%20de%20Maio%2C%20Lubango%2C%20Angola!5e1!3m2!1spt-PT!2spt!4v1716987654321!5m2!1spt-PT!2spt",
  p: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15782.992228717196!2d13.4883492!3d-15.0617755!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b93f7c46c36f56d%3A0x6758410221e5e019!2sRua%2028%20de%20Maio%2C%20Lubango%2C%20Angola!5e2!3m2!1spt-PT!2spt!4v1716987654321!5m2!1spt-PT!2spt",
}

export function MapSection() {
  const [mapType, setMapType] = useState<'m' | 'k' | 'p'>('k') // m=standard, k=satellite, p=terrain
  const [origin, setOrigin] = useState('')
  const [travelMode, setTravelMode] = useState<'driving' | 'bicycling' | 'walking'>('driving')
  const [mapSrc, setMapSrc] = useState(LOCATION_COORDS.k)
  const [routeActive, setRouteActive] = useState(false)

  const handleTraceRoute = () => {
    if (!origin.trim()) {
      window.alert('Por favor, insira a origem para traçar a rota.')
      return
    }

    const destination = 'Rua 28 de Maio, Lubango, Angola'

    if (!GOOGLE_MAPS_API_KEY) {
      // Fallback: abrir no Google Maps em nova aba quando não há chave
      const fallbackUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`
      window.open(fallbackUrl, '_blank')
      return
    }
    const routeUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${travelMode}`

    setMapSrc(routeUrl)
    setRouteActive(true)
  }

  const clearRoute = () => {
    setRouteActive(false)
    setMapSrc(LOCATION_COORDS[mapType])
  }

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#0A43D8] tracking-[0.2em] uppercase mb-4">
            Localização
          </span>
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#021a5c]">
            Como Chegar até Nós
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Utilize o planeador de rota para obter as melhores indicações até às nossas instalações no Lubango.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg texto-[#021a5c]">
              <Navigation className="w-5 h-5" />
              <span className="font-bold">Planeador de Rota</span>
            </div>
            
            <input
              type="text"
              placeholder="Ex: Largo da Sé, Lubango"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0A43D8] outline-none"
            />
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button onClick={() => setTravelMode('driving')} className={`p-2 rounded ${travelMode === 'driving' ? 'bg-white shadow' : ''}`}><Car className="w-5 h-5" /></button>
              <button onClick={() => setTravelMode('bicycling')} className={`p-2 rounded ${travelMode === 'bicycling' ? 'bg-white shadow' : ''}`}><Bike className="w-5 h-5" /></button>
              <button onClick={() => setTravelMode('walking')} className={`p-2 rounded ${travelMode === 'walking' ? 'bg-white shadow' : ''}`}><Footprints className="w-5 h-5" /></button>
            </div>

            <button
              onClick={handleTraceRoute}
              className={buttonVariants({ className: 'bg-[#0A43D8] text-white hover:bg-[#042A8F]' })}
            >
              TRAÇAR ROTA
            </button>
            {routeActive && (
              <button
                onClick={clearRoute}
                className="ml-2 px-4 py-2 rounded-md bg-white border border-gray-200 texto-sm text-[#0A43D8] hover:bg-gray-50"
              >
                Limpar Rota
              </button>
            )}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[400px] md:h-[500px] bg-gray-200">
          <iframe
            src={routeActive ? mapSrc : LOCATION_COORDS[mapType]}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={routeActive ? 'Rota no mapa' : 'Mapa Okukala'}
          />
          
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 flex gap-2 shadow-md">
            <button onClick={() => {setMapType('m'); if(!routeActive) setMapSrc(LOCATION_COORDS.m)}} className={`px-3 py-1 text-sm rounded ${mapType === 'm' ? 'bg-[#0A43D8] text-white' : 'hover:bg-gray-100'}`}>Padrão</button>
            <button onClick={() => {setMapType('k'); if(!routeActive) setMapSrc(LOCATION_COORDS.k)}} className={`px-3 py-1 text-sm rounded ${mapType === 'k' ? 'bg-[#0A43D8] text-white' : 'hover:bg-gray-100'}`}>Satélite</button>
            <button onClick={() => {setMapType('p'); if(!routeActive) setMapSrc(LOCATION_COORDS.p)}} className={`px-3 py-1 text-sm rounded ${mapType === 'p' ? 'bg-[#0A43D8] text-white' : 'hover:bg-gray-100'}`}>Relevo</button>
          </div>
        </div>
      </div>
    </section>
  )
}
