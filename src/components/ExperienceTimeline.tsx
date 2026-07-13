import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type ExperienceItem = {
  id: string
  title: string
  company: string
  location?: string | null
  startDate: string
  endDate: string
  bullets?: { text: string; id?: string | null }[] | null
  techTags?: { tag: string; id?: string | null }[] | null
}

export function ExperienceTimeline({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="apple-section" aria-labelledby="experience-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Experience"
            title="Where I've worked"
            id="experience-heading"
          />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">
            The roles that shaped how I build
          </p>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-6">
          {experience.map((role, index) => (
            <Reveal key={role.id} delay={index * 0.05}>
              <article className="surface-card p-6 md:p-8">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-medium md:text-2xl">{role.title}</h3>
                    <p className="text-muted">
                      {role.company}
                      {role.location ? ` · ${role.location}` : ''}
                    </p>
                  </div>
                  <p className="text-sm text-muted">
                    {role.startDate} – {role.endDate}
                  </p>
                </div>
                <ul className="space-y-3 text-muted">
                  {role.bullets?.map((bullet) => (
                    <li key={bullet.id || bullet.text} className="leading-7">
                      {bullet.text}
                    </li>
                  ))}
                </ul>
                {role.techTags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.techTags.map((tag) => (
                      <span key={tag.id || tag.tag} className="tag">
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
