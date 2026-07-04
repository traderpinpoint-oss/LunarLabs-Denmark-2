import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Kinetic } from '@/components/kinetic'

const projects = [
  {
    title: 'Nordhavn Cycles',
    year: '2026',
    kind: 'E-Commerce',
    body: 'A Copenhagen bike brand moving from marketplace listings to its own storefront. Custom Shopify build, frictionless checkout, and a product configurator engineered for speed on mobile.',
    tags: ['Shopify', 'UI/UX', 'Conversion'],
    image: '/images/work-nordhavn.png',
    alt: 'Nordhavn Cycles e-commerce website shown on a laptop',
    stat: { value: '+142%', label: 'Online sales' },
  },
  {
    title: 'Fjord Analytics',
    year: '2026',
    kind: 'B2B SaaS',
    body: 'A data platform that needed its website to feel as precise as its product. Fully custom Next.js build with a motion system, interactive product tour, and a technical SEO foundation built to rank.',
    tags: ['Custom Build', 'Motion', 'SEO'],
    image: '/images/work-fjord.png',
    alt: 'Fjord Analytics dashboard website on a monitor',
    stat: { value: '99/100', label: 'Lighthouse performance' },
  },
  {
    title: 'Glostrup Kaffe',
    year: '2025',
    kind: 'Brand + Web',
    body: 'Full identity and website for a local roastery going national. Visual identity, tone of voice, and a WordPress build with online ordering — shipped on a fixed quote, on time.',
    tags: ['Branding', 'WordPress', 'Ordering'],
    image: '/images/work-glostrup.png',
    alt: 'Glostrup Kaffe brand website on a tablet beside coffee beans',
    stat: { value: '2.4×', label: 'Online bookings' },
  },
]

export function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kinetic className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            data-k="1"
            data-kx="60"
            data-kskew="-6"
            className="font-display max-w-xl text-5xl font-bold tracking-tight text-balance md:text-7xl"
          >
            Missions <span className="text-muted-foreground/60">completed.</span>
          </h2>
          <p data-k="0" className="max-w-sm leading-relaxed text-muted-foreground text-pretty">
            Three demo builds showing the system in motion — real case studies slot in here as
            projects ship.
          </p>
        </Kinetic>

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <Kinetic key={p.title}>
              <article className="grid overflow-hidden rounded-3xl border border-border bg-card transition duration-300 ease-out hover:scale-[1.02] hover:shadow-xl md:grid-cols-2">
              <div
                className={`flex min-h-72 bg-gradient-to-br from-accent/20 via-card to-navy/40 p-4 pb-0 md:min-h-96 md:p-5 md:pb-0 ${i % 2 === 1 ? 'md:order-2' : ''}`}
              >
                <div className="relative flex-1 overflow-hidden rounded-t-2xl">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    data-parallax="8"
                    data-parallax-cover=""
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <span
                    data-k="2.2"
                    className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm"
                  >
                    Demo project
                  </span>
                  <div
                    data-k="2.6"
                    className="absolute bottom-4 left-4 rounded-2xl bg-background/85 px-4 py-3 backdrop-blur-sm"
                  >
                    <div className="font-display text-2xl font-bold text-accent">{p.stat.value}</div>
                    <div className="text-xs text-muted-foreground">{p.stat.label}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
                <div>
                  <div
                    data-k="0"
                    className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase"
                  >
                    <span>{p.year}</span>
                    <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                    <span>{p.kind}</span>
                  </div>
                  <h3
                    data-k="0.6"
                    className="font-display mb-4 text-3xl font-bold tracking-tight md:text-4xl"
                  >
                    {p.title}
                  </h3>
                  <p data-k="1.2" className="leading-relaxed text-muted-foreground text-pretty">
                    {p.body}
                  </p>
                </div>

                <div data-k="1.8" className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition duration-200 ease-out hover:scale-105 hover:shadow-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="mailto:Sm1992@outlook.dk"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                  >
                    Start a project like this
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
              </article>
            </Kinetic>
          ))}
        </div>
      </div>
    </section>
  )
}
