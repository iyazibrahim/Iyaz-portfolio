import { formatPostDate } from '@/lib/blog'
import { formatReadingTime } from '@/lib/reading-time'

type BlogPostHeaderProps = {
  title: string
  excerpt: string
  publishedAt?: string | null
  readingTimeMinutes?: number | null
  tags?: { tag: string; id?: string | null }[] | null
}

export function BlogPostHeader({
  title,
  excerpt,
  publishedAt,
  readingTimeMinutes,
  tags,
}: BlogPostHeaderProps) {
  const readingTime = formatReadingTime(readingTimeMinutes)

  return (
    <header className="mb-8 md:mb-10">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        {publishedAt ? <time dateTime={publishedAt}>{formatPostDate(publishedAt)}</time> : null}
        {readingTime ? <span>· {readingTime}</span> : null}
        <span>· Iyaz Ibrahim</span>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted md:text-xl">{excerpt}</p>
      {tags?.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((item) => (
            <span key={item.id || item.tag} className="tag">
              {item.tag}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  )
}
