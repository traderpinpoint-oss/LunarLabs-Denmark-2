'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, PenTool, Rocket, Wrench } from 'lucide-react'
import { Kinetic } from '@/components/kinetic'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const services = [
  {
    idx: '01',
    title: 'Web Design',
    body: 'Custom, responsive design built around your brand and your users — not a recycled template. Mobile-first, sharp on every screen.',
  },
  {
    idx: '02',
    title: 'Web Development',
    body: "Clean, fast, reliably built websites on WordPress, Webflow, Shopify or fully custom code — and we'll tell you honestly which one is right.",
  },
  {
    idx: '03',
    title: 'E-Commerce',
    body: 'Online stores designed to convert browsers into buyers — product pages, checkout flow, payment integration and inventory setup.',
  },
  {
    idx: '04',
    title: 'SEO & Visibility',
    body: "Solid technical SEO foundations by default — clean code, fast loads, proper structure — plus on-page optimisation so you're built to be found.",
  },
  {
    idx: '05',
    title: 'Branding & UI/UX',
    body: "Visual identity and user experience design that's easy to navigate, on-brand, and built around how real users behave.",
  },
  {
    idx: '06',
    title: 'Maintenance & Support',
    body: 'Ongoing plans covering updates, security patches, hosting and support — your site stays fast and current long after launch day.',
  },
]

/* Shared with the contact form's "I'm interested in..." pills */
export const serviceTitles = services.map((s) => s.title)

/* Mindmap coordinates live in one system: percentages of the container for
   the HTML pills, ×4/×3 into the 400×300 viewBox for the SVG connectors.
   The chain reads as one stair-step cascade: top-left → bottom-right. */
const stages = [
  { label: 'Design', icon: PenTool, x: 24, y: 20 },
  { label: 'Build', icon: Code, x: 44, y: 40 },
  { label: 'Launch', icon: Rocket, x: 64, y: 60 },
  { label: 'Maintain', icon: Wrench, x: 84, y: 80 },
]
/* Symmetric S-curves (handles at 40% of dx, horizontal) so each curve's
   midpoint is the exact segment center — where the direction arrows sit. */
const connectors = [
  'M24 36 C52.8 36 67.2 60 96 60', // start dot → Design
  'M96 60 C128 60 144 120 176 120', // Design → Build
  'M176 120 C208 120 224 180 256 180', // Build → Launch
  'M256 180 C288 180 304 240 336 240', // Launch → Maintain
  'M336 252 C336 262 320 266 304 270', // Maintain → closing line
]
const arrows = [
  { x: 60, y: 48, a: 29 },
  { x: 136, y: 90, a: 51 },
  { x: 216, y: 150, a: 51 },
  { x: 296, y: 210, a: 51 },
]

/* Branching diagram for the section header: each connector draws itself
   (stroke-dashoffset, no DrawSVG plugin needed), then the node it leads to
   pops in — Design → Build → Launch → Maintain, once, on scroll into view.
   Under reduced motion (or no JS) the assembled diagram renders statically. */
function ServicesMindmap() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lines = gsap.utils.toArray<SVGPathElement>('.js-mm-line', root)
        const nodes = gsap.utils.toArray<HTMLElement>('.js-mm-node', root)
        const arrowEls = gsap.utils.toArray<SVGPolygonElement>('.js-mm-arrow', root)

        for (const line of lines) {
          const len = line.getTotalLength()
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        }
        gsap.set(nodes, { autoAlpha: 0, scale: 0.6, y: 6 })
        gsap.set(['.js-mm-start', '.js-mm-tail', '.js-mm-arrow'], { autoAlpha: 0 })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        })
        tl.to('.js-mm-start', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' })
        lines.forEach((line, i) => {
          tl.to(line, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, '>-0.05')
          if (arrowEls[i]) tl.to(arrowEls[i], { autoAlpha: 1, duration: 0.2 }, '>-0.15')
          if (nodes[i])
            tl.to(nodes[i], { autoAlpha: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, '>-0.1')
        })
        tl.to('.js-mm-tail', { autoAlpha: 1, y: 0, duration: 0.4 }, '>-0.05')
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="relative mx-auto aspect-[4/3] w-full max-w-2xl md:mx-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="mm-grad"
            gradientUnits="userSpaceOnUse"
            x1="24"
            y1="36"
            x2="336"
            y2="240"
          >
            <stop offset="0" stopColor="oklch(0.72 0.17 55)" />
            <stop offset="1" stopColor="oklch(0.66 0.22 34)" />
          </linearGradient>
        </defs>
        {connectors.map((d) => (
          <path
            key={d}
            d={d}
            className="js-mm-line"
            stroke="url(#mm-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
        {arrows.map((p) => (
          <polygon
            key={`${p.x}-${p.y}`}
            points="-3,-3.5 4,0 -3,3.5"
            className="js-mm-arrow fill-coral"
            transform={`translate(${p.x} ${p.y}) rotate(${p.a})`}
          />
        ))}
      </svg>

      <span
        className="js-mm-start absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: '6%', top: '12%' }}
        aria-hidden="true"
      />

      {stages.map((s, i) => (
        <span
          key={s.label}
          className="js-mm-node absolute block -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <span
            className="animate-mm-wobble inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-base font-medium shadow-sm"
            style={{ animationDelay: `${i * 0.7}s`, animationDuration: `${3.6 + i * 0.5}s` }}
          >
            <s.icon className="size-4 text-accent" aria-hidden="true" />
            {s.label}
          </span>
        </span>
      ))}

      <p
        className="js-mm-tail absolute w-48 -translate-x-1/2 text-center text-sm leading-relaxed text-muted-foreground"
        style={{ left: '76%', top: '94%' }}
      >
        on the platform that actually fits your business
      </p>
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  /* Crossfades the description panels whenever the active item changes.
     All six bodies stay in the DOM (stacked in one grid cell on desktop,
     collapsed inline on mobile), so GSAP only ever animates opacity/height —
     no React re-render of the content itself. */
  useGSAP(
    () => {
      const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.utils.toArray<HTMLElement>('.js-service-panel').forEach((panel, i) => {
        gsap.to(panel, {
          autoAlpha: i === active ? 1 : 0,
          duration: instant ? 0 : 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })

      gsap.utils.toArray<HTMLElement>('.js-service-inline').forEach((panel, i) => {
        gsap.to(panel, {
          height: i === active ? 'auto' : 0,
          autoAlpha: i === active ? 1 : 0,
          duration: instant ? 0 : 0.4,
          ease: 'power2.inOut',
          overwrite: 'auto',
          // leave the open panel at natural height so text reflow never clips
          onComplete: i === active ? () => gsap.set(panel, { height: 'auto' }) : undefined,
        })
      })

      // re-trigger the glow surge so switching reads as a highlight flash
      if (!instant) {
        const card = sectionRef.current?.querySelector<HTMLElement>('.service-glow')
        if (card) {
          card.classList.remove('service-glow-flash')
          void card.offsetWidth // reflow so the flash animation restarts
          card.classList.add('service-glow-flash')
        }
      }
    },
    { scope: sectionRef, dependencies: [active] },
  )

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kinetic className="mb-14 grid items-center gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <h2
              data-k="1"
              data-kx="-60"
              data-kskew="6"
              className="font-display max-w-xl text-5xl font-bold tracking-tight text-balance md:text-7xl"
            >
              Every system, <span className="text-muted-foreground/50">one crew.</span>
            </h2>
            <p
              data-k="1.6"
              className="mt-5 max-w-md font-display text-xl font-medium tracking-tight text-muted-foreground text-pretty md:text-2xl"
            >
              Every module handled by the same in-house Danish engineering team.
            </p>
          </div>

          <ServicesMindmap />
        </Kinetic>

        <div ref={sectionRef}>
          <Kinetic className="grid gap-10 md:grid-cols-12 md:gap-14">
            {/* Numbered title list — hover or tap activates an item */}
            <ul className="divide-y divide-border border-y border-border md:col-span-7">
              {services.map((s, i) => (
                <li key={s.idx}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={active === i}
                    aria-controls={`service-body-${s.idx}`}
                    className="flex w-full cursor-pointer items-baseline gap-5 py-5 text-left md:gap-8 md:py-6"
                  >
                    <span
                      data-k={2.5 + i}
                      data-kx="-16"
                      className={`font-display text-sm font-semibold tracking-widest transition-colors duration-300 ${
                        active === i ? 'text-accent' : 'text-muted-foreground/50'
                      }`}
                    >
                      {s.idx}
                    </span>
                    <span
                      data-k={2 + i}
                      className={`font-display text-3xl font-bold tracking-tight transition-colors duration-300 sm:text-4xl md:text-5xl lg:text-6xl ${
                        active === i ? 'text-foreground' : 'text-muted-foreground/40'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>

                  {/* Mobile: the active description expands inline below its title */}
                  <div
                    id={`service-body-${s.idx}`}
                    className={`js-service-inline overflow-hidden md:hidden ${
                      i === 0 ? '' : 'invisible h-0 opacity-0'
                    }`}
                  >
                    <p className="pb-6 pl-10 leading-relaxed text-muted-foreground text-pretty">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop: descriptions stacked in one grid cell, crossfaded */}
            <aside data-k="8.5" className="hidden md:col-span-5 md:block" aria-live="polite">
              <div className="service-glow grid rounded-3xl border border-accent bg-gradient-to-br from-accent/10 via-card to-navy/15 p-8 md:sticky md:top-28 lg:p-10">
                {services.map((s, i) => (
                  <div
                    key={s.idx}
                    className={`js-service-panel col-start-1 row-start-1 ${
                      i === 0 ? '' : 'invisible opacity-0'
                    }`}
                  >
                    <p className="max-w-md text-2xl leading-snug text-muted-foreground text-pretty lg:text-3xl">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </Kinetic>
        </div>
      </div>
    </section>
  )
}
