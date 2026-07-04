'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { to: 142, dec: 0, unit: '%', label: 'Increase in online sales', src: 'Nordhavn Cycles' },
  { to: 99, dec: 0, unit: '/100', label: 'Lighthouse performance score', src: 'Fjord Analytics' },
  { to: 0.8, dec: 1, unit: 's', label: 'Largest contentful paint', src: 'Nordhavn Cycles' },
  { to: 240, dec: 0, unit: '%', label: 'Growth in online bookings', src: 'Glostrup Kaffe' },
]

function CountUp({ to, dec }: { to: number; dec: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1400
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Number((to * eased).toFixed(dec)))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [to, dec])

  return <span ref={ref}>{value.toFixed(dec)}</span>
}

export function Results() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-display mb-14 max-w-xl text-5xl font-bold tracking-tight text-balance md:text-7xl">
          Output you can <span className="text-accent">measure.</span>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-7">
              <div className="font-display mb-4 text-5xl font-bold tracking-tight">
                <CountUp to={s.to} dec={s.dec} />
                <span className="text-2xl text-accent">{s.unit}</span>
              </div>
              <div className="mb-2 font-medium">{s.label}</div>
              <div className="text-xs text-muted-foreground">Demo · {s.src}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
