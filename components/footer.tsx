import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Sparkles, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Sparkles className="h-10 w-10 text-emerald-400 animate-pulse-soft" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-lg opacity-30"></div>
              </div>
              <h3 className="text-3xl font-display font-bold text-gradient">Planet Holiday</h3>
            </div>

            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-md">
              Your trusted partner for unforgettable Sri Lankan adventures. Discover the pearl of the Indian Ocean with
              our <span className="text-emerald-400 font-semibold">expertly crafted tours</span> and create memories
              that last a lifetime.
            </p>

            <div className="flex space-x-6">
              {[
                { icon: Facebook, color: "hover:text-blue-400", bg: "hover:bg-blue-400/10" },
                { icon: Instagram, color: "hover:text-pink-400", bg: "hover:bg-pink-400/10" },
                { icon: Twitter, color: "hover:text-sky-400", bg: "hover:bg-sky-400/10" },
                { icon: Youtube, color: "hover:text-red-400", bg: "hover:bg-red-400/10" },
              ].map(({ icon: Icon, color, bg }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${color} ${bg}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-display font-semibold mb-6 text-gradient">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "Destinations", href: "/destinations" },
                { name: "Tour Packages", href: "/packages" },
                { name: "Activities", href: "/activities" },
                { name: "Travel Blog", href: "/blog" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item, index) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block group"
                  >
                    <span className="border-b border-transparent group-hover:border-emerald-400 transition-all duration-300">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-display font-semibold mb-6 text-gradient">Contact Us</h4>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  content: "No 32/01\n Bandaranayaka mv.\n Mahagonaduwan\n Moronthuduwa\nSri Lanka",
                  color: "text-emerald-400",
                },
                {
                  icon: Phone,
                  content: "+94 76 304 8811\n24/7 Support Available",
                  color: "text-teal-400",
                },
                {
                  icon: Mail,
                  content: "info@planetholiday.lk\nResponse within 2 hours",
                  color: "text-sapphire-400",
                },
              ].map(({ icon: Icon, content, color }, index) => (
                <div key={index} className="flex items-start group">
                  <div
                    className={`${color} mr-4 mt-1 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-300">
                      {content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-400">© 2024 Planet Holiday. Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-gray-400">in Sri Lanka</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
