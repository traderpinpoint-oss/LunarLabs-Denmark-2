const faqs = [
  {
    q: 'How much will my website cost?',
    a: "It depends on scope, but you'll always get a clear, fixed quote before any work begins — no hourly billing, no hidden fees. Get in touch for a free estimate.",
  },
  {
    q: 'How long does a project take?',
    a: "It varies with complexity — a simple site can move quickly, while a larger custom build takes longer. We'll confirm a clear timeline as part of your quote, before you commit to anything.",
  },
  {
    q: 'Who actually builds my website?',
    a: "Our own in-house Danish engineering team — not an outsourced freelancer or a subcontractor you've never spoken to.",
  },
  {
    q: 'Can you redesign an existing website?',
    a: 'Yes. We can rebuild, redesign, or improve an existing site, or start fresh — whichever makes more sense for your goals and budget.',
  },
  {
    q: 'Do you offer support after the site is live?',
    a: 'Yes. We offer ongoing maintenance and support plans covering updates, security, and hosting, so your site keeps running smoothly after launch.',
  },
  {
    q: 'Do you work with clients outside Denmark?',
    a: 'Yes — we work with clients across Denmark and internationally, with the same direct communication and transparent pricing either way.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-12 md:px-6">
        <h2 className="font-display text-5xl font-bold tracking-tight text-balance md:col-span-4 md:text-6xl">
          Questions, <span className="text-muted-foreground/50">answered.</span>
        </h2>

        <div className="md:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="text-2xl font-light text-accent transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
