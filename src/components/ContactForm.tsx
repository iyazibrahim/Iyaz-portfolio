'use client'

import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type ContactProps = {
  email: string
  linkedin: string
  github: string
  location: string
  resumeUrl?: string | null
}

export function ContactForm({ email, linkedin, github, location, resumeUrl }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Unable to send message.')
      }

      event.currentTarget.reset()
      setStatus('success')
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : 'Unable to send message.')
    }
  }

  return (
    <section id="contact" className="apple-section" aria-labelledby="contact-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title="Want to talk? Say hello."
            id="contact-heading"
          />
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="space-y-5 text-muted">
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-[var(--color-fg)]">
                <Mail size={18} />
                {email}
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-[var(--color-fg)]"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-[var(--color-fg)]"
              >
                <Github size={18} />
                GitHub
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={18} />
                {location}
              </p>
              {resumeUrl ? (
                <a href={resumeUrl} className="btn-primary mt-4 inline-flex" download>
                  Download Resume
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="surface-card p-6 md:p-8"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm">
                  Name
                  <input name="name" required className="input-field" />
                </label>
                <label className="grid gap-2 text-sm">
                  Company
                  <input name="company" className="input-field" />
                </label>
                <label className="grid gap-2 text-sm">
                  Email
                  <input name="email" type="email" required className="input-field" />
                </label>
                <label className="grid gap-2 text-sm">
                  Role or opportunity
                  <input name="roleOpportunity" className="input-field" />
                </label>
                <label className="grid gap-2 text-sm">
                  Message
                  <textarea name="message" required rows={5} className="input-field" />
                </label>
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              </div>

              <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' ? (
                <p className="mt-4 text-sm text-accent" role="status">
                  Message sent. Thank you — I&apos;ll get back to you soon.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="mt-4 text-sm text-red-500" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
