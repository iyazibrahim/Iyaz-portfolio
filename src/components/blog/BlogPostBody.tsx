import { RichText } from '@payloadcms/richtext-lexical/react'

type BlogPostBodyProps = {
  content: unknown
}

export function BlogPostBody({ content }: BlogPostBodyProps) {
  return <RichText className="blog-prose" data={content as never} />
}
