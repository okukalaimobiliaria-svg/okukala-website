export function FeaturedSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <img src="/hero-property.png" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1e3a8a]/90" />
      </div>
      <div className="relative z-10 text-center text-white px-6">
        <h2 className="text-3xl font-bold">Consuloan is the heart of our business, and our consultants are the heartbeat.</h2>
      </div>
    </section>
  )
}
