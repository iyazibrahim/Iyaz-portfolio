import type { ReactNode } from 'react'

type BentoCardProps = {
  children: ReactNode
  className?: string
  span?: '12' | '8' | '7' | '6' | '5' | '4' | '3'
  variant?: 'default' | 'accent' | 'brown'
}

export function BentoCard({
  children,
  className = '',
  span = '12',
  variant = 'default',
}: BentoCardProps) {
  const variantClass =
    variant === 'accent' ? 'bento-card-accent' : variant === 'brown' ? 'bento-card-brown' : ''

  return (
    <article className={`bento-card bento-span-${span} ${variantClass} p-5 md:p-6 ${className}`}>
      {children}
    </article>
  )
}
