import { Kinetic } from '@/components/kinetic'

export function SiteFooter() {
  return (
    <footer className="dark overflow-hidden bg-background pt-24 text-foreground md:pt-32">
      {/* CTA */}
      <Kinetic className="mx-auto max-w-6xl px-4 text-center md:px-6">
        <h2
          data-k="0"
          data-kscale="0.95"
          data-ky="20"
          className="font-display text-6xl font-bold tracking-tighter text-balance md:text-8xl"
        >
          Ready when <span className="text-accent">you are.</span>
        </h2>
        <p
          data-k="0.6"
          className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty"
        >
          Tell us about your project and we&apos;ll come back with a clear, honest quote — no
          pressure, no jargon, no surprises.
        </p>
        <div data-k="1.2" className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
      </Kinetic>

      {/* Footer grid */}
      <div className="mx-auto mt-24 grid max-w-6xl gap-10 border-t border-border px-4 py-14 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_auto] md:px-6">
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

        {/* Spinning line-art globe, pinned on Denmark — pure CSS loop */}
        <div className="md:justify-self-end" aria-hidden="true">
          <div className="w-36 md:w-44">
            <svg viewBox="0 0 100 100" className="h-auto w-full" fill="none">
              <defs>
                <clipPath id="globe-clip">
                  <circle cx="50" cy="50" r="38" />
                </clipPath>
              </defs>
              <g clipPath="url(#globe-clip)" className="stroke-foreground/25">
                <g className="animate-globe-spin">
                  {[-7, 12, 31, 50, 69, 88, 107].map((x) => (
                    <path key={x} d={`M${x} 12 C${x + 7} 31 ${x + 7} 69 ${x} 88`} strokeWidth="1" />
                  ))}
                </g>
                <path d="M12 50 H88" strokeWidth="1" />
                <path d="M17 31 H83" strokeWidth="1" />
                <path d="M17 69 H83" strokeWidth="1" />
              </g>
              <circle cx="50" cy="50" r="38" className="stroke-foreground/40" strokeWidth="1.5" />
              <circle cx="58" cy="26" r="3.2" className="fill-coral" />
              <circle cx="58" cy="26" r="5" className="animate-pin-ping stroke-coral" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Giant wordmark, mirrored beneath a faint waterline — the wordmark and
          its reflection drift at different parallax rates for depth */}
      <Kinetic>
        <div className="pointer-events-none text-center select-none" aria-hidden="true">
          <div
            data-parallax="12"
            className="font-display text-[15.5vw] leading-none font-bold tracking-tighter whitespace-nowrap text-foreground/20"
          >
            LUNARLABS
          </div>
          <div className="mx-auto h-px w-1/2 bg-accent/20" />
          <div data-parallax="5" className="-mb-[3vw]">
            <div className="wordmark-reflection font-display text-[15.5vw] leading-none font-bold tracking-tighter whitespace-nowrap text-foreground/20">
              LUNARLABS
            </div>
          </div>
        </div>
      </Kinetic>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs tracking-widest text-muted-foreground uppercase sm:flex-row sm:justify-between md:px-6">
          <span>© 2026 LunarLabs · All rights reserved</span>
          <span>Engineered in Glostrup · DK</span>
        </div>
      </div>
    </footer>
  )
}
