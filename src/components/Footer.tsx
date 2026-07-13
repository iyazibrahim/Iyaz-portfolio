export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Iyaz Ibrahim. Infrastructure-first engineering portfolio.</p>
        <p>Penang, Malaysia</p>
      </div>
    </footer>
  )
}
