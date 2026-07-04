'use client'

import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#approach', label: 'Approach' },
  { href: '#work', label: 'Work' },
  { href: '#faq', label: 'FAQ' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-card/80 px-5 py-3 shadow-sm backdrop-blur-md">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          LUNAR<span className="text-accent">LABS</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="mailto:Sm1992@outlook.dk"
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85 md:inline-flex"
          >
            Start a project
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border/60 bg-card p-6 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:Sm1992@outlook.dk"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
