import FeaturedDestinations from "@/components/featured-destinations"
import TourPackages from "@/components/tour-packages"
import Testimonials from "@/components/testimonials"
import WhatsAppWidget from "@/components/whatsapp-widget"
import Header from "@/components/header"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <FeaturedDestinations />
      <TourPackages />
      <Testimonials />
      <WhatsAppWidget />
    </main>
  )
}
