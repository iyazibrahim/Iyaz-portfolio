import { RichText } from '@payloadcms/richtext-lexical/react'

type BlogPostBodyProps = {
  content: unknown
}

export function BlogPostBody({ content }: BlogPostBodyProps) {
  return (
    <div className="blog-prose">
      <RichText data={content as never} />
    </div>
  )
}
