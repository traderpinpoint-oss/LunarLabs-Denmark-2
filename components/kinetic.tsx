'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface KineticProps {
  children: ReactNode
  className?: string
}

/* Scroll-scrubbed staged choreography, opt-in via data attributes on any
   descendant. Everything ends at its natural resting position — this layer
   only stages HOW elements arrive, tied directly to scroll and reversible.

   - data-k="1.5"        stagger slot; lower slots land earlier
   - data-kx / data-ky   starting offset in px (a plain data-k defaults to y 32)
   - data-kskew          starting skewX in degrees, straightens on landing
   - data-kscale         starting scale
   - data-parallax="12"  drifts ±12% of its own height slower than the page
   - data-parallax-cover adds overscan scale so a fill image never shows edges

   Distances are damped on small screens; skipped under reduced motion, where
   (as with no JS) content simply renders in place. */
export function Kinetic({ children, className }: KineticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(
        {
          motionOK: '(prefers-reduced-motion: no-preference)',
          wide: '(min-width: 768px)',
        },
        (ctx) => {
          const { motionOK, wide } = ctx.conditions as { motionOK: boolean; wide: boolean }
          if (!motionOK) return
          const damp = wide ? 1 : 0.6

          const staged = Array.from(el.querySelectorAll<HTMLElement>('[data-k]'))
          if (staged.length) {
            const tl = gsap.timeline({
              defaults: { ease: 'power2.out', duration: 0.6 },
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 35%',
                scrub: 0.6,
              },
            })
            for (const node of staged) {
              const d = node.dataset
              const hasOther = d.kx || d.kskew || d.kscale
              tl.fromTo(
                node,
                {
                  x: parseFloat(d.kx ?? '0') * damp,
                  y: parseFloat(d.ky ?? (hasOther ? '0' : '32')) * damp,
                  skewX: parseFloat(d.kskew ?? '0'),
                  scale: parseFloat(d.kscale ?? '1'),
                  opacity: 0,
                },
                { x: 0, y: 0, skewX: 0, scale: 1, opacity: 1 },
                Number(d.k || 0) * 0.15,
              )
            }
          }

          for (const node of Array.from(el.querySelectorAll<HTMLElement>('[data-parallax]'))) {
            const amount = parseFloat(node.dataset.parallax || '10') * damp
            if (node.dataset.parallaxCover !== undefined) {
              gsap.set(node, { scale: 1 + (2 * amount) / 100 })
            }
            gsap.fromTo(
              node,
              { yPercent: amount },
              {
                yPercent: -amount,
                ease: 'none',
                scrollTrigger: {
                  trigger: node.parentElement ?? node,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.4,
                },
              },
            )
          }
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
