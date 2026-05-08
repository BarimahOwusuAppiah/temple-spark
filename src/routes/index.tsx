import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { HeroSection } from '@/components/site/HeroSection'
import { StickyScrollSection } from '@/components/site/StickyScrollSection'
import { QuoteBreak } from '@/components/site/QuoteBreak'
import { WelcomeSection } from '@/components/site/WelcomeSection'
import { ProphetQuotesSection } from '@/components/site/ProphetQuotesSection'
import { QuotesSection } from '@/components/site/QuotesSection'
import { FellowshipSection } from '@/components/site/FellowshipSection'
import { Footer } from '@/components/site/Footer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar revealAfterVh={2.35} />
      <main>
        <HeroSection />
        <div className="relative z-10 bg-background">
          <WelcomeSection />
          <StickyScrollSection />
          <QuoteBreak />
          <QuotesSection />
          <ProphetQuotesSection />
          <FellowshipSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
