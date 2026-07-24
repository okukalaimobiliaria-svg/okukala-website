/**
 * TEMPLATE PARA NOVAS SEÇÕES
 * 
 * Use este arquivo como base para criar novas seções.
 * Basta copiar, renomear e adaptar o conteúdo.
 */

'use client'

export function SectionTemplate() {
  return (
    <section className="w-full py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header da seção */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Título da Seção
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descrição e contexto da seção
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Example */}
          <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              Card Title
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Card content goes here
            </p>
          </div>

          {/* Adicionar mais cards conforme necessário */}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors">
            Call to Action
          </button>
        </div>
      </div>
    </section>
  )
}
