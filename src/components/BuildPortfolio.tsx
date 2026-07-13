import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { getCoverImageUrl, type ProjectListItem } from '@/lib/projects'

type BuildPortfolioProps = {
  projects: ProjectListItem[]
}

export function BuildPortfolio({ projects }: BuildPortfolioProps) {
  if (!projects.length) return null

  return (
    <section id="built" className="apple-section" aria-labelledby="built-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader eyebrow="Projects" title="Things I've built" id="built-heading" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const imageUrl = getCoverImageUrl(project.coverImage)

            return (
              <Reveal key={project.id} delay={index * 0.05}>
                <article className="surface-card flex h-full flex-col overflow-hidden">
                  <Link href={`/projects/${project.slug}`} className="group block">
                    {imageUrl ? (
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-border)]">
                        <Image
                          src={imageUrl}
                          alt={
                            typeof project.coverImage === 'object' && project.coverImage
                              ? project.coverImage.alt || project.title
                              : project.title
                          }
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center border-b border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center text-sm text-muted">
                        Upload a cover image in Payload admin
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-medium md:text-2xl">
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>
                    {project.summary ? (
                      <p className="mt-3 flex-1 text-sm leading-7 text-muted md:text-base">
                        {project.summary}
                      </p>
                    ) : null}
                    {project.technologies?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech.id || tech.name} className="tag text-xs">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link href={`/projects/${project.slug}`} className="btn-secondary text-sm">
                        View project
                      </Link>
                      {project.projectUrl ? (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary text-sm"
                        >
                          <ExternalLink size={16} />
                          Visit site
                        </a>
                      ) : null}
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
