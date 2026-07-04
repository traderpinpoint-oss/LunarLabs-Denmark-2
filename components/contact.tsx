'use client'

import { useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Reveal } from '@/components/reveal'
import { serviceTitles } from '@/components/services'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const underlineField =
  'w-full border-b border-foreground/25 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [interests, setInterests] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  /* Gentle heartbeat on the Send mark: the shape eases a few pixels downward
     while a coral glow blooms beneath it, yoyo-looping forever. ScrollTrigger
     pauses the loop whenever the button is off screen, and reduced-motion
     users get a fully static button. The CSS hover scale lives on the inner
     svg, so it composes with this wrapper tween instead of fighting it. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.js-send',
          {
            y: 0,
            scale: 1,
            filter: 'brightness(0.97) drop-shadow(0px 5px 10px rgba(193, 54, 17, 0.22))',
          },
          {
            y: 6,
            scale: 1.045,
            filter: 'brightness(1.15) drop-shadow(0px 18px 30px rgba(193, 54, 17, 0.55))',
            duration: 0.95,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
              trigger: '.js-send',
              start: 'top bottom',
              end: 'bottom top',
              toggleActions: 'play pause resume pause',
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  const toggleInterest = (title: string) =>
    setInterests((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    // TODO: swap for a real backend / email service before launch
    console.log('Contact form submission', {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      interests,
    })
    setSent(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
          Get in Touch with{' '}
          <span className="animate-neon-flicker whitespace-nowrap">
            LUNAR<span className="text-accent">LABS</span>
          </span>
        </h2>

        <Reveal className="mt-16 md:mt-24">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-14 md:grid-cols-2 md:gap-20">
              {/* Left: minimal underlined fields */}
              <div className="flex flex-col gap-10">
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name*"
                  aria-label="Your name"
                  className={underlineField}
                />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Your e-mail*"
                  aria-label="Your e-mail"
                  className={underlineField}
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  aria-label="Tell us about your project"
                  className={`${underlineField} resize-none`}
                />
              </div>

              {/* Right: multi-select interest pills from the Services data */}
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  I&apos;m interested in...
                </h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  {serviceTitles.map((title) => {
                    const selected = interests.includes(title)
                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={() => toggleInterest(title)}
                        aria-pressed={selected}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ease-out hover:scale-105 hover:shadow-md ${
                          selected
                            ? 'border-accent bg-accent text-accent-foreground'
                            : 'border-border bg-card text-muted-foreground'
                        }`}
                      >
                        {title}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Send — the same chevron-heart mark as the hero, pointing down */}
            <div className="mt-14 flex flex-col items-center gap-6 md:mt-20">
              <button type="submit" className="group cursor-pointer">
                <span className="js-send relative block">
                  <svg
                    className="block h-auto w-36 text-coral transition-transform duration-300 ease-out group-hover:scale-105 md:w-44"
                    viewBox="0 0 96 96"
                    aria-hidden="true"
                  >
                    <path d="M48 88 L6 46 L27 25 L48 46 L69 25 L90 46 Z" fill="currentColor" />
                  </svg>
                  <span className="pointer-events-none absolute inset-0 grid translate-y-2 place-items-center text-sm font-semibold text-white md:translate-y-3">
                    Send
                  </span>
                </span>
              </button>
              {sent && (
                <p role="status" className="text-sm text-muted-foreground">
                  Thanks — your message has been received. We&apos;ll get back to you shortly.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
