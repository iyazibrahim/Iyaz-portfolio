import { getPayloadClient } from '@/lib/payload'

export type ProjectType = 'build' | 'delivery'

export type ProjectMedia = {
  url?: string | null
  alt?: string | null
  mimeType?: string | null
}

export type ProjectListItem = {
  id: string | number
  title: string
  slug: string
  projectType?: ProjectType | null
  summary?: string | null
  longDescription?: string | null
  projectUrl?: string | null
  githubUrl?: string | null
  problem?: string | null
  solution?: string | null
  role?: string | null
  outcome?: string | null
  technologies?: { name: string; id?: string | null }[] | null
  architectureNotes?: string | null
  diagramType?: 'none' | 'devops' | 'monitoring' | 'multisite' | 'zabbix' | null
  coverImage?: ProjectMedia | string | number | null
  gallery?: { image?: ProjectMedia | number | null; id?: string | null }[] | null
  featured?: boolean | null
  sort: number
}

export function getCoverImageUrl(coverImage: unknown): string | null {
  if (!coverImage || typeof coverImage === 'number') return null
  if (typeof coverImage === 'string') return coverImage
  if (typeof coverImage === 'object' && 'url' in coverImage) {
    return (coverImage as ProjectMedia).url || null
  }
  return null
}

export function getGalleryUrls(
  gallery: ProjectListItem['gallery'],
): { url: string; alt: string }[] {
  if (!gallery?.length) return []
  return gallery
    .map((item) => {
      const media = item.image
      if (!media || typeof media === 'number') return null
      const url = typeof media === 'string' ? media : media.url
      if (!url) return null
      const alt = typeof media === 'object' ? media.alt || '' : ''
      return { url, alt }
    })
    .filter((item): item is { url: string; alt: string } => Boolean(item))
}

export async function getProjectBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  return (result.docs[0] as unknown as ProjectListItem) ?? null
}

export function isBuildProject(project: ProjectListItem) {
  return project.projectType === 'build'
}

export function isDeliveryProject(project: ProjectListItem) {
  return !project.projectType || project.projectType === 'delivery'
}
