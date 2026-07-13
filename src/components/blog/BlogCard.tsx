import Image from 'next/image'
import Link from 'next/link'

import {
  type BlogPostListItem,
  formatPostDate,
  getCoverImageUrl,
} from '@/lib/blog'

type BlogCardProps = {
  post: BlogPostListItem
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = getCoverImageUrl(post.coverImage)

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="surface-card flex h-full flex-col overflow-hidden">
        {imageUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={typeof post.coverImage === 'object' ? post.coverImage?.alt || post.title : post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            {post.publishedAt ? <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> : null}
            {post.readingTimeMinutes ? <span>· {post.readingTimeMinutes} min read</span> : null}
          </div>
          <h3
            className={`font-semibold tracking-tight transition-colors group-hover:text-[var(--color-fg)] ${
              featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
            }`}
          >
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted md:text-base">{post.excerpt}</p>
          {post.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((item) => (
                <span key={item.id || item.tag} className="tag text-xs">
                  {item.tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  )
}
