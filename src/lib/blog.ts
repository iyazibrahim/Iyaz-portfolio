import { getPayloadClient } from '@/lib/payload'

const publishedFilter = {
  status: {
    equals: 'published' as const,
  },
}

export type BlogPostListItem = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  publishedAt?: string | null
  readingTimeMinutes?: number | null
  coverImage?: {
    url?: string | null
    alt?: string | null
  } | string | null
  tags?: { tag: string; id?: string | null }[] | null
}

export async function getLatestPosts(limit = 3) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    sort: '-publishedAt',
    limit,
    depth: 1,
  })

  return result.docs as unknown as BlogPostListItem[]
}

export async function getPublishedPosts({ page = 1, limit = 12 } = {}) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    where: publishedFilter,
    sort: '-publishedAt',
    page,
    limit,
    depth: 1,
  })

  return {
    posts: result.docs as unknown as BlogPostListItem[],
    totalPages: result.totalPages,
    page: result.page,
    totalDocs: result.totalDocs,
  }
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [publishedFilter, { slug: { equals: slug } }],
    },
    limit: 1,
    depth: 1,
  })

  return result.docs[0] ?? null
}

export function getCoverImageUrl(coverImage: unknown): string | null {
  if (!coverImage || typeof coverImage === 'number') return null
  if (typeof coverImage === 'string') return coverImage
  if (typeof coverImage === 'object' && 'url' in coverImage) {
    const media = coverImage as { url?: string | null }
    return media.url || null
  }
  return null
}

export function formatPostDate(date?: string | null) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
