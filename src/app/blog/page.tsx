import Link from 'next/link'

import { BlogCard } from '@/components/blog/BlogCard'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { SectionHeader } from '@/components/SectionHeader'
import { getPublishedPosts } from '@/lib/blog'
import { getSiteData } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>
}

function getResumeUrl(resumePdf: unknown): string | null {
  if (!resumePdf || typeof resumePdf !== 'object') return null
  const media = resumePdf as { url?: string | null }
  return media.url || null
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Number(params.page || 1)
  const [{ siteSettings }, { posts, totalPages, page: currentPage }] = await Promise.all([
    getSiteData(),
    getPublishedPosts({ page: Number.isNaN(page) ? 1 : page, limit: 12 }),
  ])

  const currentPageNumber = currentPage ?? 1
  const resumeUrl = getResumeUrl(siteSettings.resumePdf)

  return (
    <>
      <Navbar resumeUrl={resumeUrl} />
      <main className="apple-section pt-28 md:pt-36">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Blog"
            title="Notes from the field"
            id="blog-index-heading"
          />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">
            Practical notes on ICT operations, networking, Microsoft 365 administration, monitoring, and dependable infrastructure.
          </p>

          {posts.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  featured={index === 0 && currentPageNumber === 1}
                />
              ))}
            </div>
          ) : (
            <div className="surface-card p-8 text-center text-muted">
              No published posts yet. Create your first article in Payload admin.
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Blog pagination">
              {currentPageNumber > 1 ? (
                <Link href={`/blog?page=${currentPageNumber - 1}`} className="btn-secondary">
                  Previous
                </Link>
              ) : null}
              <span className="text-sm text-muted">
                Page {currentPageNumber} of {totalPages}
              </span>
              {currentPageNumber < totalPages ? (
                <Link href={`/blog?page=${currentPageNumber + 1}`} className="btn-secondary">
                  Next
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}
