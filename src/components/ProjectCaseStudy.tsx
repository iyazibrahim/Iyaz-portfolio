import Image from 'next/image'

import { ArchitectureDiagram } from '@/components/ArchitectureDiagram'
import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type Project = {
  id: string
  title: string
  problem: string
  solution: string
  role: string
  outcome: string
  technologies?: { name: string; id?: string | null }[] | null
  architectureNotes?: string | null
  diagramType?: 'none' | 'devops' | 'monitoring' | 'multisite' | 'zabbix' | null
  coverImage?:
    | {
        url?: string | null
        alt?: string | null
      }
    | string
    | null
}

function getImageUrl(image: Project['coverImage']) {
  if (!image || typeof image === 'string') return null
  return image.url || null
}

export function ProjectCaseStudy({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="apple-section" aria-labelledby="projects-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            title="Things I've built"
            id="projects-heading"
          />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">
            A few projects I&apos;m proud of
          </p>
        </Reveal>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const imageUrl = getImageUrl(project.coverImage)

            return (
              <Reveal key={project.id} delay={index * 0.05}>
                <article className="surface-card overflow-hidden">
                  <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
                    <div>
                      <h3 className="text-2xl font-medium md:text-3xl">{project.title}</h3>
                      <dl className="mt-5 space-y-4">
                        <div>
                          <dt className="eyebrow mb-1">Problem</dt>
                          <dd className="text-muted">{project.problem}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-1">Solution</dt>
                          <dd className="text-muted">{project.solution}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-1">My role</dt>
                          <dd>{project.role}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-1">Outcome</dt>
                          <dd>{project.outcome}</dd>
                        </div>
                      </dl>
                      {project.technologies?.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech.id || tech.name} className="tag">
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      {imageUrl ? (
                        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)]">
                          <Image
                            src={imageUrl}
                            alt={
                              typeof project.coverImage === 'object'
                                ? project.coverImage?.alt || project.title
                                : project.title
                            }
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 480px"
                          />
                        </div>
                      ) : (
                        <div className="mb-4 flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center text-sm text-muted">
                          Upload a project image in Payload admin to replace this placeholder.
                        </div>
                      )}
                      {project.architectureNotes ? (
                        <p className="text-sm leading-7 text-muted">{project.architectureNotes}</p>
                      ) : null}
                      <ArchitectureDiagram type={project.diagramType || 'none'} />
                    </div>
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
