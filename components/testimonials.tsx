import { Star } from 'lucide-react'
import { Kinetic } from '@/components/kinetic'

const quotes = [
  {
    text: "The quote we signed was the invoice we paid. After two agencies that couldn't manage that, it honestly felt radical.",
    name: 'M. Sørensen',
    role: 'Founder · Nordhavn Cycles',
  },
  {
    text: 'We spoke directly with the engineer building our site — every call, every decision. No account-manager relay, no translation loss.',
    name: 'L. Kristensen',
    role: 'CMO · Fjord Analytics',
  },
  {
    text: 'Concept to live in a week, on a fixed price, and the site is faster than anything our old agency shipped in six months.',
    name: 'A. Birk',
    role: 'Owner · Glostrup Kaffe',
  },
]

export function Testimonials() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kinetic>
          <h2
            data-k="0"
            data-kx="-60"
            data-kskew="6"
            className="font-display mb-14 max-w-xl text-5xl font-bold tracking-tight text-balance md:text-7xl"
          >
            What clients <span className="text-muted-foreground/60">send back.</span>
          </h2>
        </Kinetic>

        <Kinetic className="grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={q.name}
              data-k={[0, 0.8, 0.4][i]}
              data-ky={[60, 30, 45][i]}
              className="flex flex-col justify-between gap-10 rounded-3xl border border-border bg-card p-7 transition duration-300 ease-out hover:scale-[1.02] hover:shadow-xl"
            >
              <blockquote className="text-lg leading-relaxed text-pretty">
                {'\u201C'}
                {q.text}
                {'\u201D'}
              </blockquote>
              <figcaption>
                <div
                  className="mb-3 flex gap-1 text-accent"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <div className="font-semibold">{q.name}</div>
                <div className="text-sm text-muted-foreground">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </Kinetic>
      </div>
    </section>
  )
}
