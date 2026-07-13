import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { BlogPostBody } from '@/components/blog/BlogPostBody'
import { BlogPostHeader } from '@/components/blog/BlogPostHeader'
import { BlogPostingJsonLd } from '@/components/blog/BlogPostingJsonLd'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { getCoverImageUrl, getPostBySlug } from '@/lib/blog'
import { getSiteData } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

function getResumeUrl(resumePdf: unknown): string | null {
  if (!resumePdf || typeof resumePdf !== 'object') return null
  const media = resumePdf as { url?: string | null }
  return media.url || null
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post not found | Iyaz Ibrahim',
    }
  }

  const coverImageUrl = getCoverImageUrl(post.coverImage)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    title: `${post.title} | Iyaz Ibrahim`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      images: coverImageUrl ? [{ url: coverImageUrl }] : undefined,
      url: `${siteUrl}/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [post, { siteSettings }] = await Promise.all([getPostBySlug(slug), getSiteData()])

  if (!post) notFound()

  const resumeUrl = getResumeUrl(siteSettings.resumePdf)
  const coverImageUrl = getCoverImageUrl(post.coverImage)
  const content = post.content

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        publishedAt={post.publishedAt}
        coverImageUrl={coverImageUrl}
      />
      <Navbar resumeUrl={resumeUrl} />
      <main className="pt-28 pb-16 md:pt-36">
        <article className="section-shell max-w-3xl">
          <Link href="/blog" className="mb-8 inline-flex text-sm text-muted transition-colors hover:text-[var(--color-fg)]">
            ← Back to blog
          </Link>

          <BlogPostHeader
            title={post.title}
            excerpt={post.excerpt}
            publishedAt={post.publishedAt}
            readingTimeMinutes={post.readingTimeMinutes}
            tags={post.tags}
          />

          {coverImageUrl ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <Image
                src={coverImageUrl}
                alt={typeof post.coverImage === 'object' ? post.coverImage?.alt || post.title : post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ) : null}

          {content ? <BlogPostBody content={content} /> : null}
        </article>
      </main>
      <Footer />
    </>
  )
}
