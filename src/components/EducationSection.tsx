import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type EducationItem = {
  id: string
  institution: string
  degree: string
  dates: string
  highlights?: { text: string; id?: string | null }[] | null
}

export function EducationSection({ education }: { education: EducationItem[] }) {
  return (
    <section id="education" className="apple-section" aria-labelledby="education-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Education"
            title="Where I studied"
            id="education-heading"
          />
        </Reveal>

        <div className="mx-auto grid max-w-3xl gap-4">
          {education.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="surface-card p-6 md:p-8">
                <p className="text-sm text-muted">{item.dates}</p>
                <h3 className="mt-2 text-xl font-medium">{item.degree}</h3>
                <p className="mt-1 text-muted">{item.institution}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {item.highlights?.map((highlight) => (
                    <li key={highlight.id || highlight.text}>{highlight.text}</li>
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
