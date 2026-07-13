import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type StackCategory = {
  category: string
  items?: { name: string; id?: string | null }[] | null
  id?: string | null
}

export function TechnicalStack({ categories }: { categories: StackCategory[] }) {
  return (
    <section id="toolkit" className="apple-section" aria-labelledby="stack-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader eyebrow="Toolkit" title="My toolkit" id="stack-heading" />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">Tools I reach for</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.id || category.category} delay={index * 0.04}>
              <article className="surface-card p-6">
                <h3 className="mb-3 text-base font-medium">{category.category}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  {category.items?.map((item) => (
                    <li key={item.id || item.name}>{item.name}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
