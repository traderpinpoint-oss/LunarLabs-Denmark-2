export function SiteFooter() {
  return (
    <footer className="dark overflow-hidden bg-background pt-24 text-foreground md:pt-32">
      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
        <h2 className="font-display text-6xl font-bold tracking-tighter text-balance md:text-8xl">
          Ready when <span className="text-accent">you are.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty">
          Tell us about your project and we&apos;ll come back with a clear, honest quote — no
          pressure, no jargon, no surprises.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:Sm1992@outlook.dk"
            className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-85"
          >
            Get your free quote
          </a>
          <a
            href="mailto:Sm1992@outlook.dk"
            className="rounded-full border border-border px-8 py-4 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Sm1992@outlook.dk
          </a>
        </div>
      </div>

      {/* Footer grid */}
      <div className="mx-auto mt-24 grid max-w-6xl gap-10 border-t border-border px-4 py-14 sm:grid-cols-3 md:px-6">
        <div>
          <div className="font-display text-lg font-bold tracking-tight">
            LUNAR<span className="text-accent">LABS</span>
          </div>
          <p className="mt-3 max-w-56 text-sm leading-relaxed text-muted-foreground">
            Danish-engineered websites. Transparent pricing. No surprises.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-semibold tracking-widest text-muted-foreground uppercase">
            Base
          </h3>
          <address className="leading-relaxed text-muted-foreground not-italic">
            Faverland 3<br />
            2600 Glostrup
            <br />
            Denmark
          </address>
        </div>
        <nav className="text-sm" aria-label="Footer">
          <h3 className="mb-3 font-semibold tracking-widest text-muted-foreground uppercase">
            Navigate
          </h3>
          <ul className="flex flex-col gap-2">
            {[
              { href: '#top', label: 'Home' },
              { href: '#services', label: 'Services' },
              { href: '#work', label: 'Work' },
              { href: '#faq', label: 'FAQ' },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Giant wordmark, mirrored beneath a faint waterline */}
      <div className="pointer-events-none text-center select-none" aria-hidden="true">
        <div className="font-display text-[15.5vw] leading-none font-bold tracking-tighter whitespace-nowrap text-foreground/20">
          LUNARLABS
        </div>
        <div className="mx-auto h-px w-1/2 bg-accent/20" />
        <div className="wordmark-reflection -mb-[3vw] font-display text-[15.5vw] leading-none font-bold tracking-tighter whitespace-nowrap text-foreground/20">
          LUNARLABS
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs tracking-widest text-muted-foreground uppercase sm:flex-row sm:justify-between md:px-6">
          <span>© 2026 LunarLabs · All rights reserved</span>
          <span>Engineered in Glostrup · DK</span>
        </div>
      </div>
    </footer>
  )
}
