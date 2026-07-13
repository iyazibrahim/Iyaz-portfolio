import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ArchitectureDiagram } from '@/components/ArchitectureDiagram'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import {
  getCoverImageUrl,
  getGalleryUrls,
  getProjectBySlug,
  isBuildProject,
} from '@/lib/projects'
import { getSiteData } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

function getResumeUrl(resumePdf: unknown): string | null {
  if (!resumePdf || typeof resumePdf !== 'object') return null
  const media = resumePdf as { url?: string | null }
  return media.url || null
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project not found | Iyaz Ibrahim' }
  }

  const description = project.summary || project.problem || project.outcome || project.title
  const coverImageUrl = getCoverImageUrl(project.coverImage)

  return {
    title: `${project.title} | Iyaz Ibrahim`,
    description: description || undefined,
    openGraph: {
      title: project.title,
      description: description || undefined,
      images: coverImageUrl ? [{ url: coverImageUrl }] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const [project, { siteSettings }] = await Promise.all([getProjectBySlug(slug), getSiteData()])

  if (!project) notFound()

  const resumeUrl = getResumeUrl(siteSettings.resumePdf)
  const coverImageUrl = getCoverImageUrl(project.coverImage)
  const gallery = getGalleryUrls(project.gallery)
  const isBuild = isBuildProject(project)
  const backHref = isBuild ? '/#built' : '/#delivered'
  const backLabel = isBuild ? "Things I've built" : "Infrastructure I've delivered"

  return (
    <>
      <Navbar resumeUrl={resumeUrl} />
      <main className="apple-section pt-28 md:pt-36">
        <article className="section-shell max-w-4xl">
          <Link
            href={backHref}
            className="mb-8 inline-flex text-sm text-muted transition-colors hover:text-[var(--color-fg)]"
          >
            ← Back to {backLabel}
          </Link>

          <h1 className="headline">{project.title}</h1>

          {isBuild ? (
            <>
              {project.summary ? (
                <p className="lead mt-4">{project.summary}</p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {project.projectUrl ? (
                  <a href={project.projectUrl} target="_blank" rel="noreferrer" className="btn-primary">
                    <ExternalLink size={16} />
                    Visit site
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                ) : null}
              </div>

              {coverImageUrl ? (
                <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--color-border)]">
                  <Image
                    src={coverImageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </div>
              ) : null}

              {gallery.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {gallery.map((item, index) => (
                    <div
                      key={index}
                      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)]"
                    >
                      <Image
                        src={item.url}
                        alt={item.alt || `${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              {project.longDescription ? (
                <div className="mt-10 space-y-4 text-base leading-8 text-muted">
                  {project.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <>
              {coverImageUrl ? (
                <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--color-border)]">
                  <Image
                    src={coverImageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </div>
              ) : null}

              <dl className="mt-10 space-y-6">
                {project.problem ? (
                  <div>
                    <dt className="eyebrow mb-2">Problem</dt>
                    <dd className="text-muted">{project.problem}</dd>
                  </div>
                ) : null}
                {project.solution ? (
                  <div>
                    <dt className="eyebrow mb-2">Solution</dt>
                    <dd className="text-muted">{project.solution}</dd>
                  </div>
                ) : null}
                {project.role ? (
                  <div>
                    <dt className="eyebrow mb-2">My role</dt>
                    <dd>{project.role}</dd>
                  </div>
                ) : null}
                {project.outcome ? (
                  <div>
                    <dt className="eyebrow mb-2">Outcome</dt>
                    <dd>{project.outcome}</dd>
                  </div>
                ) : null}
              </dl>

              {project.architectureNotes ? (
                <p className="mt-8 text-sm leading-7 text-muted">{project.architectureNotes}</p>
              ) : null}

              <ArchitectureDiagram type={project.diagramType || 'none'} />
            </>
          )}

          {project.technologies?.length ? (
            <div className="mt-10 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech.id || tech.name} className="tag">
                  {tech.name}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  )
}
