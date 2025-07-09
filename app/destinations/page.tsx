"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Users, Camera, Loader2 } from "lucide-react"
import type { Destination } from "@/lib/supabase"

const categories = ["All", "Cultural", "Wildlife", "Adventure", "Beach"]

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)

  // Fetch destinations from API
  const fetchDestinations = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (activeCategory !== "All") params.append("category", activeCategory)

      const response = await fetch(`/api/destinations?${params}`)
      if (!response.ok) throw new Error("Failed to fetch destinations")

      const data = await response.json()
      setDestinations(data)
    } catch (error) {
      console.error("Error fetching destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [activeCategory])

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Sri Lanka</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Discover breathtaking destinations across the Pearl of the Indian Ocean
              </p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="ml-2 text-gray-600">Loading destinations...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Sri Lanka</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover breathtaking destinations across the Pearl of the Indian Ocean
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Card
                key={destination.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onClick={() => setSelectedDestination(destination)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">{destination.category}</Badge>
                  <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{destination.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {destination.duration}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        destination.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : destination.difficulty === "Moderate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {destination.difficulty}
                    </Badge>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Camera className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedDestination.image || "/placeholder.svg"}
                alt={selectedDestination.name}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedDestination.name}</h2>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedDestination.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>Duration: {selectedDestination.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-2" />
                      <span>Rating: {selectedDestination.rating}/5</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>Best Time: {selectedDestination.best_time}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                  <ul className="space-y-1">
                    {selectedDestination.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{selectedDestination.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">Book Tour Package</Button>
                <Button
                  variant="outline"
                  className="bg-white text-emerald-600 border-emerald-600 hover:bg-emerald-50 flex-1"
                >
                  Get More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
