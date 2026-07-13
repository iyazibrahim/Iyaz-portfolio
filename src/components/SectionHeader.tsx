type SectionHeaderProps = {
  eyebrow: string
  title: string
  id?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  id,
  className = '',
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''} ${className}`}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 id={id} className="headline mx-auto max-w-3xl">
        {title}
      </h2>
    </div>
  )
}
