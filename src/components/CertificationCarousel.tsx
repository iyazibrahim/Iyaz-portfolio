'use client'

import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

// Legacy slug fallback for any pre-migration values that were stored as slugs.
const legacyCategoryLabels: Record<string, string> = {
  networking: 'Networking',
  cybersecurity: 'Cybersecurity',
  av: 'AV and Technical',
}

type MediaRef = {
  url?: string | null
  mimeType?: string | null
  alt?: string | null
  filename?: string | null
}

type CategoryRef = {
  name?: string | null
}

type Certification = {
  id: string
  title: string
  category?: CategoryRef | number | string | null
  badgeImage?: MediaRef | number | null
  certificateFile?: MediaRef | number | null
}

function getCategoryLabel(category: Certification['category']): string {
  if (!category) return 'Uncategorized'
  if (typeof category === 'object') return category.name || 'Uncategorized'
  // Fallback for a raw slug/id left over from older data.
  return legacyCategoryLabels[category] || String(category)
}

function getMedia(media: MediaRef | number | null | undefined): MediaRef | null {
  if (!media || typeof media === 'number') return null
  return media
}

function isPdf(media: MediaRef | null) {
  if (!media?.mimeType) return media?.url?.toLowerCase().endsWith('.pdf')
  return media.mimeType === 'application/pdf'
}

export function CertificationCarousel({ certifications }: { certifications: Certification[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollStart = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current
    if (!track || !track.children.length) return

    const trackRect = track.getBoundingClientRect()
    const trackCenter = trackRect.left + trackRect.width / 2
    let closest = 0
    let closestDistance = Infinity

    Array.from(track.children).forEach((child, index) => {
      const rect = child.getBoundingClientRect()
      const childCenter = rect.left + rect.width / 2
      const distance = Math.abs(childCenter - trackCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = index
      }
    })

    setActiveIndex(closest)
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const child = track.children[index] as HTMLElement | undefined
      if (!child) return

      track.scrollTo({
        left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
      setActiveIndex(index)
    },
    [reducedMotion],
  )

  const goPrev = useCallback(() => {
    scrollToIndex(Math.max(0, activeIndex - 1))
  }, [activeIndex, scrollToIndex])

  const goNext = useCallback(() => {
    scrollToIndex(Math.min(certifications.length - 1, activeIndex + 1))
  }, [activeIndex, certifications.length, scrollToIndex])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => updateActiveIndex()
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [updateActiveIndex])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current
    if (!track) return
    isDragging.current = true
    dragStartX.current = event.clientX
    scrollStart.current = track.scrollLeft
    track.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return
    const track = trackRef.current
    if (!track) return
    const delta = event.clientX - dragStartX.current
    track.scrollLeft = scrollStart.current - delta
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return
    isDragging.current = false
    trackRef.current?.releasePointerCapture(event.pointerId)
    updateActiveIndex()
  }

  return (
    <section id="certifications" className="apple-section" aria-labelledby="certifications-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Certifications"
            title="Certifications I've earned"
            id="certifications-heading"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="mb-6 flex items-center justify-end gap-2">
              <button
                type="button"
                className="btn-icon"
                aria-label="Previous certification"
                onClick={goPrev}
                disabled={activeIndex === 0}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="btn-icon"
                aria-label="Next certification"
                onClick={goNext}
                disabled={activeIndex >= certifications.length - 1}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div
              ref={trackRef}
              className="carousel-track cursor-grab active:cursor-grabbing"
              role="list"
              aria-label="Certifications carousel"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {certifications.map((cert, index) => {
                const badge = getMedia(cert.badgeImage)
                const certificate = getMedia(cert.certificateFile)
                const preview = badge?.url || (!isPdf(certificate) ? certificate?.url : null)
                const pdfUrl = isPdf(certificate) ? certificate?.url : null

                return (
                  <article
                    key={cert.id}
                    role="listitem"
                    className="carousel-slide surface-card flex flex-col overflow-hidden"
                    aria-current={index === activeIndex ? 'true' : undefined}
                  >
                    {preview ? (
                      <div className="relative aspect-[4/3] w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                        <Image
                          src={preview}
                          alt={badge?.alt || cert.title}
                          fill
                          className="object-contain p-4"
                          sizes="320px"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center text-sm text-muted">
                        Upload a badge or certificate image in Payload admin
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="eyebrow mb-3 text-accent">
                        {getCategoryLabel(cert.category)}
                      </p>
                      <h3 className="text-lg font-medium leading-snug">{cert.title}</h3>
                      {pdfUrl ? (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-[var(--color-fg)]"
                        >
                          <FileText size={16} />
                          View certificate PDF
                        </a>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-6 flex justify-center gap-2" aria-hidden>
              {certifications.map((cert, index) => (
                <button
                  key={cert.id}
                  type="button"
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-6 bg-[var(--color-accent)]'
                      : 'w-2 bg-[var(--color-border)]'
                  }`}
                  aria-label={`Go to certification ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
