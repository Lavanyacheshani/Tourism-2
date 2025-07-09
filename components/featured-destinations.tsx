"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Camera, Sparkles } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    category: "Cultural",
    description: "Ancient rock fortress and palace ruins surrounded by extensive gardens",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    name: "Yala National Park",
    location: "Southern Province",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    category: "Wildlife",
    description: "Home to leopards, elephants, and diverse wildlife in natural habitat",
    color: "sunset",
    gradient: "from-sunset-500 to-ruby-500",
  },
  {
    id: 3,
    name: "Ella Nine Arches Bridge",
    location: "Uva Province",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    category: "Adventure",
    description: "Iconic railway bridge surrounded by lush tea plantations",
    color: "sapphire",
    gradient: "from-sapphire-500 to-teal-500",
  },
  {
    id: 4,
    name: "Mirissa Beach",
    location: "Southern Coast",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    category: "Beach",
    description: "Perfect for whale watching and pristine golden sand beaches",
    color: "tea",
    gradient: "from-tea-500 to-sunset-500",
  },
  {
    id: 5,
    name: "Temple of the Tooth",
    location: "Kandy",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    category: "Cultural",
    description: "Sacred Buddhist temple housing the relic of Buddha's tooth",
    color: "ruby",
    gradient: "from-ruby-500 to-sunset-500",
  },
  {
    id: 6,
    name: "Adam's Peak",
    location: "Central Highlands",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    category: "Adventure",
    description: "Sacred mountain peak with breathtaking sunrise views",
    color: "emerald",
    gradient: "from-emerald-600 to-sapphire-500",
  },
]

const categories = ["All", "Cultural", "Wildlife", "Adventure", "Beach"]

export default function FeaturedDestinations() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  const filteredDestinations =
    activeCategory === "All" ? destinations : destinations.filter((dest) => dest.category === activeCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll(".destination-card")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [filteredDestinations])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-2 border border-emerald-200">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Handpicked Destinations</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="text-gradient">Featured</span>
            <br />
            <span className="text-gray-900">Destinations</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover Sri Lanka's most captivating locations, from ancient cultural sites to pristine beaches and
            <span className="font-semibold text-emerald-700"> thrilling wildlife encounters</span>
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 hover:text-emerald-700 shadow-lg hover:shadow-xl border border-white/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Enhanced Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDestinations.map((destination, index) => (
            <Card
              key={destination.id}
              data-index={index}
              className={`destination-card group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 card-glass ${
                visibleCards.includes(index) ? "animate-scale-in" : "opacity-0"
              }`}
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Enhanced Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500`}
                />

                {/* Floating Badge */}
                <Badge
                  className={`absolute top-6 left-6 bg-gradient-to-r ${destination.gradient} text-white font-semibold px-4 py-2 shadow-lg transform group-hover:scale-110 transition-all duration-300`}
                >
                  {destination.category}
                </Badge>

                {/* Enhanced Rating */}
                <div className="absolute top-6 right-6 flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold ml-1 text-gray-800">{destination.rating}</span>
                </div>

                {/* Enhanced Bottom Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 text-shadow-strong group-hover:text-shadow-soft transition-all duration-300">
                    {destination.name}
                  </h3>
                  <div className="flex items-center mb-3 opacity-90">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="font-medium">{destination.location}</span>
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed mb-4">{destination.description}</p>

                  {/* Hover Action */}
                  <div
                    className={`transform transition-all duration-500 ${hoveredCard === destination.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  >
                    <Button size="sm" className="btn-gradient-sapphire rounded-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Explore More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <Button
            size="lg"
            className="btn-gradient px-12 py-6 text-lg font-semibold rounded-full shadow-glow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="mr-3 h-5 w-5" />
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  )
}
