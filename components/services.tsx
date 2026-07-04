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

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display max-w-xl text-5xl font-bold tracking-tight text-balance md:text-7xl">
            Every system, <span className="text-muted-foreground/50">one crew.</span>
          </h2>
          <p className="max-w-sm leading-relaxed text-muted-foreground text-pretty">
            Design, build, launch, maintain — every module handled by the same in-house Danish
            engineering team, on the platform that actually fits your business.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.idx}
              className="group flex flex-col gap-16 rounded-3xl border border-border/70 bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <span className="font-display text-sm font-semibold tracking-widest text-accent">
                {s.idx}
              </span>
              <div>
                <h3 className="font-display mb-3 text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
