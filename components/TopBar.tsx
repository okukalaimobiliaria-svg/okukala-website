import { MapPin, Mail, Phone } from 'lucide-react'

export function TopBar() {
  return (
    <div className="bg-[#042A8F] text-white py-2.5 text-xs">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#F5C400]" />
            <span className="text-white/70">Localização:</span>
            <span className="font-medium text-white">Angola / Huíla / Lubango</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#F5C400]" />
            <span className="font-medium">okukalaimobiliaria@gmail.com</span>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden sm:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F5C400]" />
            923 934 470 / 932 263 593
          </span>
          <span className="text-gray-400">PT ▾</span>
        </div>
      </div>
    </div>
  )
}
