export function ServicesGrid() {
  const industries = [
    { title: 'Corporate Finance', description: 'Expert financial advice for business growth.' },
    { title: 'Economic Consulting', description: 'Data-driven insights for market challenges.' },
    { title: 'Forensic & Litigation', description: 'Investigative financial analysis and support.' },
    { title: 'Strategic Communications', description: 'Crafting the right message for stakeholders.' },
    { title: 'Technology Consulting', description: 'Leveraging tech to optimize operations.' },
    { title: 'Healthcare Consulting', description: 'Specialized solutions for health providers.' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center section-title">Our Industries</h2>
        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {industries.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-4xl">🔹</div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
