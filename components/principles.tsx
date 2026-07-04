import { Kinetic } from '@/components/kinetic'

const principles = [
  {
    idx: '01',
    title: 'Built by Danish engineers.',
    body: 'Every project is designed and developed in-house by our own Danish engineering team. No outsourcing, no unnamed subcontractors, no quality lottery — senior-level work from people who put their name on it.',
  },
  {
    idx: '02',
    title: 'Transparent pricing, every time.',
    body: 'You get a clear, fixed quote before any work begins. No hourly guesswork, no scope-creep invoices, no fine print. What we quote is what you pay.',
  },
  {
    idx: '03',
    title: 'Genuinely affordable.',
    body: 'We run lean and work directly with our clients — no account-management layers or agency overhead inflating your invoice. Rates that match agencies charging two or three times as much.',
  },
  {
    idx: '04',
    title: 'A direct line to your engineers.',
    body: 'No relay through account managers. You talk directly with the engineers designing and building your website, from the first call to launch.',
  },
]

export function Principles() {
  return (
    <section id="approach" className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kinetic>
          <h2
            data-k="0"
            data-kx="-60"
            data-kskew="6"
            className="font-display mb-14 max-w-xl text-5xl font-bold tracking-tight text-balance md:text-7xl"
          >
            Brand-led. <span className="text-accent">Precision</span>-built.
          </h2>
        </Kinetic>

        <Kinetic className="divide-y divide-border border-y border-border">
          {principles.map((p, i) => (
            <div key={p.idx} className="grid gap-4 py-10 md:grid-cols-12 md:gap-8">
              <span
                data-k={i}
                data-kx="-16"
                className="font-display text-sm font-semibold tracking-widest text-accent md:col-span-2"
              >
                {p.idx}
              </span>
              <h3
                data-k={i + 0.35}
                className="font-display text-2xl font-bold tracking-tight text-balance md:col-span-4 md:text-3xl"
              >
                {p.title}
              </h3>
              <p
                data-k={i + 0.7}
                className="leading-relaxed text-muted-foreground text-pretty md:col-span-6"
              >
                {p.body}
              </p>
            </div>
          ))}
        </Kinetic>
      </div>
    </section>
  )
}
