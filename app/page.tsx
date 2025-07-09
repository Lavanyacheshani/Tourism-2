import Hero from "@/components/hero"
import FeaturedDestinations from "@/components/featured-destinations"
import TourPackages from "@/components/tour-packages"
import Testimonials from "@/components/testimonials"
import WhatsAppWidget from "@/components/whatsapp-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedDestinations />
      <TourPackages />
      <Testimonials />
      <WhatsAppWidget />
    </main>
  )
}
