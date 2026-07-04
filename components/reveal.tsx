'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface RevealProps {
  children: ReactNode
  className?: string
  /** When set, staggers the wrapper's direct children instead of revealing the block as one */
  stagger?: number
  delay?: number
}

/* Scroll-triggered entrance: fades in and slides up once as the block enters
   the viewport. Under prefers-reduced-motion (or without JS) content simply
   renders in place. Inline styles are cleared on completion so hover
   transforms on the revealed elements keep working afterwards. */
export function Reveal({ children, className, stagger, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(stagger != null ? Array.from(el.children) : el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          delay,
          stagger,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
