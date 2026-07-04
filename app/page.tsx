import { SiteHeader } from '@/components/site-header'
import { ScrollHero } from '@/components/scroll-hero'
import { Services } from '@/components/services'
import { Principles } from '@/components/principles'
import { Work } from '@/components/work'
import { Results } from '@/components/results'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <ScrollHero />
        <Services />
        <Principles />

        {/* Dark zone — work, results, testimonials */}
        <div className="dark rounded-t-[2.5rem] bg-background text-foreground">
          <Work />
          <Results />
          <Testimonials />
        </div>

        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
