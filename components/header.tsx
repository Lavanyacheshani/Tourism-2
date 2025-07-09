"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.destinations"), href: "/destinations" },
    { name: t("nav.packages"), href: "/packages" },
    { name: t("nav.activities"), href: "/activities" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-white/20" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles
                className={`h-8 w-8 transition-all duration-300 ${
                  isScrolled ? "text-emerald-600" : "text-emerald-300"
                } group-hover:rotate-12 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span
              className={`text-2xl font-display font-bold transition-all duration-300 ${
                isScrolled ? "text-gradient" : "text-white text-shadow-soft"
              } group-hover:scale-105`}
            >
              Planet Holiday
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 hover:scale-105 relative group ${
                  isScrolled ? "text-gray-700 hover:text-emerald-600" : "text-white/90 hover:text-white"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <LanguageSwitcher />

            <Button className="btn-gradient rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300">
              <Sparkles className="mr-2 h-4 w-4" />
              {t("nav.bookNow")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 transition-all duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 transition-all duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 animate-fade-in-down">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-4 text-gray-800 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6 pt-4 space-y-4">
              <LanguageSwitcher />
              <Button className="w-full btn-gradient rounded-full py-3 font-semibold shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                {t("nav.bookNow")}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
