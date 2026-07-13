import Link from 'next/link'

import { BlogCard } from '@/components/blog/BlogCard'
import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import type { BlogPostListItem } from '@/lib/blog'

type BlogTeaserProps = {
  posts: BlogPostListItem[]
}

export function BlogTeaser({ posts }: BlogTeaserProps) {
  if (!posts.length) return null

  return (
    <section id="writing" className="apple-section" aria-labelledby="blog-teaser-heading">
      <div className="section-shell">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-14">
            <SectionHeader eyebrow="Writing" title="Notes from the field" id="blog-teaser-heading" />
            <Link href="/blog" className="btn-secondary -mt-6">
              View all posts
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.05}>
              <BlogCard post={post} featured={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
