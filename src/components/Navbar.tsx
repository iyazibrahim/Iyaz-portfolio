'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ThemeToggle } from '@/components/ThemeToggle'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#built', label: 'Built' },
  { href: '/#delivered', label: 'Delivered' },
  { href: '/blog', label: 'Blog' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#certifications', label: 'Certs' },
  { href: '/#contact', label: 'Contact' },
]

type NavbarProps = {
  resumeUrl?: string | null
}

export function Navbar({ resumeUrl }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight"
        >
          Iyaz Ibrahim
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-[var(--color-fg)]"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          {resumeUrl ? (
            <a href={resumeUrl} className="btn-primary ml-2 text-sm" download>
              Resume
            </a>
          ) : (
            <a href="#contact" className="btn-primary ml-2 text-sm">
              Contact
            </a>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="btn-icon"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] lg:hidden">
          <nav className="section-shell flex flex-col gap-2 py-5" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 text-base"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {resumeUrl ? (
              <a href={resumeUrl} className="btn-primary mt-2 w-fit" download onClick={() => setOpen(false)}>
                Resume
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
