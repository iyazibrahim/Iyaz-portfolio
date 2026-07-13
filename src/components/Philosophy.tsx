import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type Principle = {
  title: string
  description: string
  id?: string | null
}

export function Philosophy({ principles }: { principles: Principle[] }) {
  return (
    <section id="philosophy" className="apple-section" aria-labelledby="philosophy-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader eyebrow="Philosophy" title="How I work" id="philosophy-heading" />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">
            A few principles I stick to
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.id || principle.title} delay={index * 0.05}>
              <article className="surface-card h-full p-6 text-center">
                <h3 className="text-lg font-medium">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{principle.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
