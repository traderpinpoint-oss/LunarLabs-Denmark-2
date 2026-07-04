'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    title: ['Web', 'Design'],
    tags: ['UI & UX design', 'Brand identity', 'Design systems'],
    description:
      'Crafting bold, memorable interfaces that put your brand first and turn visitors into customers.',
    image: '/images/hero-design.png',
    alt: 'Colorful website design mockups and brand tiles',
  },
  {
    title: ['Web', 'Development'],
    tags: ['Next.js builds', 'Performance', 'CMS integration'],
    description:
      'Danish-engineered code that loads fast, ranks well and scales with your business — no shortcuts.',
    image: '/images/hero-dev.png',
    alt: 'Laptop showing a modern web application interface',
  },
  {
    title: ['E-commerce', 'Stores'],
    tags: ['Online shops', 'Checkout flows', 'Conversion'],
    description:
      'Online stores designed to sell — smooth checkout flows, honest pricing and zero surprises.',
    image: '/images/hero-commerce.png',
    alt: 'Smartphone displaying a stylish e-commerce product page',
  },
]

const partners = [
  'Nordhavn Cycles',
  'Fjord Analytics',
  'Glostrup Kaffe',
  'Øresund Logistik',
  'Vesterbro Studio',
  'Amager Byg',
  'Kastrup Clinic',
  'Birk & Co',
]

const SLIDE_MS = 5000

export function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [paused])

  const slide = slides[active]

  return (
    <section
      id="top"
      className="hero-mesh relative overflow-hidden pt-32 pb-10 md:pt-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          Danish web engineering studio
        </p>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Text side — re-keyed on slide change to replay the entrance animation */}
          <div key={active} className="min-w-0 flex-1">
            <h1 className="hero-slide-in font-display text-[15vw] leading-[0.95] font-bold tracking-tighter text-balance md:text-8xl lg:text-[6.5rem]">
              {slide.title[0]}
              <br />
              <span className="text-accent">{slide.title[1]}</span>
            </h1>

            <div className="hero-slide-in mt-7 flex flex-wrap gap-2" style={{ animationDelay: '80ms' }}>
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 bg-card/70 px-4 py-1.5 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              className="hero-slide-in mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty"
              style={{ animationDelay: '140ms' }}
            >
              {slide.description}
            </p>

            <div className="hero-slide-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '200ms' }}>
              <a
                href="mailto:Sm1992@outlook.dk"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85"
              >
                Get your free quote
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-card/60 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-card"
              >
                See the work
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Image side — stacked slides crossfade with a gentle scale */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl lg:w-[46%]">
            {slides.map((s, i) => (
              <Image
                key={s.image}
                src={s.image || "/placeholder.svg"}
                alt={i === active ? s.alt : ''}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                priority={i === 0}
                className={`object-cover transition-all duration-700 ease-out ${
                  i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.title.join(' ')} slide`}
                  aria-current={i === active}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? 'w-8 bg-card' : 'w-1.5 bg-card/50 hover:bg-card/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner marquee */}
      <div className="mt-16 overflow-hidden border-y border-border/70 py-5" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-12 pr-12">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-display text-lg font-medium whitespace-nowrap text-muted-foreground/70"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
