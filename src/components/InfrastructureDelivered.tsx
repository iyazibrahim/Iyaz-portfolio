import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { getCoverImageUrl, type ProjectListItem } from '@/lib/projects'

type InfrastructureDeliveredProps = {
  projects: ProjectListItem[]
}

export function InfrastructureDelivered({ projects }: InfrastructureDeliveredProps) {
  if (!projects.length) return null

  return (
    <section id="delivered" className="apple-section" aria-labelledby="delivered-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Delivery"
            title="Infrastructure I've delivered"
            id="delivered-heading"
          />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">
            Hands-on work across operations, migrations, and monitoring
          </p>
        </Reveal>

        <div className="space-y-6">
          {projects.map((project, index) => {
            const imageUrl = getCoverImageUrl(project.coverImage)

            return (
              <Reveal key={project.id} delay={index * 0.05}>
                <article className="surface-card overflow-hidden">
                  <div className="grid gap-6 p-6 md:grid-cols-[1fr_220px] md:p-8">
                    <div>
                      <h3 className="text-xl font-medium md:text-2xl">{project.title}</h3>
                      {project.problem ? (
                        <p className="mt-3 text-sm leading-7 text-muted md:text-base">
                          {project.problem}
                        </p>
                      ) : null}
                      {project.outcome ? (
                        <p className="mt-3 text-sm leading-7">{project.outcome}</p>
                      ) : null}
                      {project.technologies?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <span key={tech.id || tech.name} className="tag text-xs">
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="btn-secondary mt-5 inline-flex text-sm"
                      >
                        View details
                      </Link>
                    </div>

                    {imageUrl ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)]">
                        <Image
                          src={imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="220px"
                        />
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
