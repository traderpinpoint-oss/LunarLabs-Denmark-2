'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

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

const HEART_SHADOW_REST = 'drop-shadow(0px 20px 20px rgba(193, 54, 17, 0.32))'
const HEART_SHADOW_LIFTED = 'drop-shadow(0px 40px 40px rgba(193, 54, 17, 0.14))'

/* Splits decorative copy into per-character spans so the scrub timeline can
   dissolve it from the last character backwards. */
function MicroText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span key={i} className="js-microchar inline-block">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Resting pose: heart tilted 45° reads as a coral diamond with a tight
           shadow — scrolling resolves it upright and lifts it off the page.
           Without JS (or with reduced motion) the static upright mark renders. */
        gsap.set('.js-heart', { rotation: 45, filter: HEART_SHADOW_REST })
        /* The headline rests muted and the scrub sweeps it to solid ink as
           one unit. Opacity over the cream background reads as muted gray. */
        gsap.set('.js-headline', { opacity: 0.2 })

        // Entrance — plays once on load
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('.js-line', { yPercent: 115, duration: 1.15, stagger: 0.12 }, 0.1)
          .from(
            '.js-heart-svg',
            { scale: 0, duration: 1, ease: 'back.out(1.7)', transformOrigin: '50% 60%' },
            0.45,
          )
          .from('.js-guides', { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 0.55)
          .from('.js-corner', { y: 26, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.75)

        // Scroll choreography — stage pins for 120vh while the scrub plays.
        // Phase 1 (0 → 0.7): the whole headline sweeps from muted to solid ink.
        // Phase 2 (0.75 → 1.2): the headline recedes while the heart keeps rising.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: '+=120%',
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to('.js-headline', { opacity: 1, duration: 0.7 }, 0)
          .to(
            '.js-headline',
            { opacity: 0.15, scale: 0.95, transformOrigin: '50% 45%', duration: 0.45 },
            0.75,
          )
          // the two lines shear apart as the headline recedes (kinetic drift)
          .to('.js-linewrap-a', { xPercent: -3, skewX: -2.5, duration: 0.45 }, 0.75)
          .to('.js-linewrap-b', { xPercent: 3, skewX: 2.5, duration: 0.45 }, 0.75)
          // background guides sink slower than the receding content — depth
          .to('.js-guides', { y: () => window.innerHeight * 0.06, duration: 1.2 }, 0)
          .to(
            '.js-heart',
            {
              rotation: 0,
              x: () => window.innerWidth * 0.07,
              // 0.3x parallax of the 120vh pin distance
              y: () => window.innerHeight * -0.36,
              filter: HEART_SHADOW_LIFTED,
              // spans the whole timeline so the heart rises through both phases
              duration: 1.2,
            },
            0,
          )
          .fromTo(
            '.js-guides',
            { opacity: 1 },
            { opacity: 0.1, immediateRender: false, duration: 0.6 },
            0,
          )
          .to(
            '.js-microchar',
            { opacity: 0, y: -6, duration: 0.4, stagger: { each: 0.012, from: 'end' } },
            0,
          )
      })
    },
    { scope: sectionRef },
  )

  const pulseHeart = contextSafe(() => {
    gsap.fromTo(
      '.js-heart-svg',
      { scale: 1 },
      { scale: 1.14, duration: 0.13, yoyo: true, repeat: 3, ease: 'power1.inOut', transformOrigin: '50% 60%' },
    )
  })

  return (
    <section id="top" ref={sectionRef} className="relative bg-background">
      <div ref={stageRef} className="relative flex h-svh min-h-[620px] flex-col overflow-hidden">
        {/* Diagonal guide lines with micro copy sitting along them */}
        <div className="js-guides pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-[44%] w-[200vmax] -translate-x-1/2 -rotate-[68deg] border-t border-foreground/25">
            <MicroText
              text="Innovating in your industry"
              className="absolute -top-7 left-[calc(50%+9rem)] block text-[11px] font-medium tracking-[0.14em] text-muted-foreground"
            />
          </div>
          <div className="absolute top-[46%] left-[60%] w-[200vmax] -translate-x-1/2 rotate-[47deg] border-t border-foreground/25">
            <MicroText
              text="Don't press this heart"
              className="absolute -top-7 left-[calc(50%+5rem)] block text-[11px] font-medium tracking-[0.14em] text-muted-foreground"
            />
          </div>
          <div className="absolute top-1/2 left-[14%] w-[200vmax] -translate-x-1/2 -rotate-[68deg] border-t border-foreground/15" />
        </div>

        {/* Headline with the heart interleaved above it */}
        <div className="relative flex flex-1 items-center px-5 md:px-10">
          <div className="relative w-full">
            <h1 className="js-headline font-display text-[clamp(2.5rem,5.3vw,6.5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              <span className="js-linewrap-a block overflow-hidden pb-[0.06em]">
                <span className="js-line block">Creative design agency,</span>
              </span>
              <span className="js-linewrap-b block overflow-hidden pb-[0.06em]">
                <span className="js-line block">located in the heart of DENMARK.</span>
              </span>
            </h1>

            <button
              type="button"
              onClick={pulseHeart}
              aria-label="A coral heart — go on, press it"
              className="js-heart absolute top-[-30%] left-[48%] z-10 w-[clamp(140px,21vw,300px)] cursor-pointer"
            >
              <span className="animate-float block">
                <svg
                  className="js-heart-svg block h-auto w-full text-coral"
                  viewBox="0 0 96 96"
                  aria-hidden="true"
                >
                  <path d="M48 88 L6 46 L27 25 L48 46 L69 25 L90 46 Z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom chrome — stays at full strength while the stage recedes */}
        <div className="relative z-20 flex items-end justify-between gap-6 px-5 pb-8 md:px-10 md:pb-10">
          <div className="js-corner">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Reviewed on
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-tight">
                Trustpilot<span className="text-coral">.</span>
              </span>
              <div>
                <div className="flex gap-0.5 text-coral">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">103 reviews</p>
              </div>
            </div>
          </div>

          <a
            href="mailto:Sm1992@outlook.dk"
            className="js-corner animate-pill-pulse rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105"
          >
            New project?
          </a>
        </div>
      </div>

      {/* Partner marquee — scrolls in as the pin releases */}
      <div className="overflow-hidden border-y border-border/70 py-5" aria-hidden="true">
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
