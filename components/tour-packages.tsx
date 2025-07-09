"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

const tourPackages = [
  {
    id: 1,
    title: "Cultural Triangle Explorer",
    duration: "7 Days",
    groupSize: "2-15 People",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=600",
    highlights: ["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Polonnaruwa Ancient City"],
    includes: ["Accommodation", "All Meals", "Transport", "Guide"],
    featured: true,
  },
  {
    id: 2,
    title: "Wildlife & Beach Paradise",
    duration: "10 Days",
    groupSize: "2-12 People",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=600",
    highlights: ["Yala Safari", "Whale Watching", "Mirissa Beach", "Galle Fort"],
    includes: ["Luxury Hotels", "All Meals", "Safari Jeep", "Boat Tours"],
    featured: false,
  },
  {
    id: 3,
    title: "Hill Country Adventure",
    duration: "5 Days",
    groupSize: "2-10 People",
    price: 699,
    originalPrice: 899,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=600",
    highlights: ["Ella Nine Arches", "Tea Plantation Tours", "Adams Peak Hike"],
    includes: ["Mountain Hotels", "Breakfast", "Train Tickets", "Hiking Guide"],
    featured: false,
  },
  {
    id: 4,
    title: "Complete Sri Lanka Experience",
    duration: "14 Days",
    groupSize: "2-20 People",
    price: 1899,
    originalPrice: 2399,
    rating: 4.9,
    reviews: 312,
    image: "/placeholder.svg?height=400&width=600",
    highlights: ["All Major Attractions", "Cultural Sites", "Wildlife Safari", "Beach Time"],
    includes: ["Premium Hotels", "All Meals", "Private Transport", "Expert Guide"],
    featured: true,
  },
  {
    id: 5,
    title: "Ayurveda Wellness Retreat",
    duration: "8 Days",
    groupSize: "2-8 People",
    price: 1199,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=400&width=600",
    highlights: ["Spa Treatments", "Yoga Sessions", "Meditation", "Healthy Cuisine"],
    includes: ["Wellness Resort", "Ayurveda Treatments", "Yoga Classes", "Organic Meals"],
    featured: false,
  },
]

export default function TourPackages() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(tourPackages.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(tourPackages.length / 3)) % Math.ceil(tourPackages.length / 3))
  }

  const visiblePackages = tourPackages.slice(currentIndex * 3, (currentIndex + 1) * 3)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Curated Tour Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Carefully crafted experiences that showcase the best of Sri Lanka, from cultural wonders to natural beauty
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-emerald-50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-emerald-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-emerald-50 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-emerald-600" />
          </button>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
            {visiblePackages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  pkg.featured ? "ring-2 ring-emerald-500" : ""
                } ${hoveredPackage === pkg.id ? "scale-105" : ""}`}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                {pkg.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-emerald-600 text-white">Most Popular</Badge>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{pkg.rating}</span>
                      <span className="text-sm ml-1">({pkg.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {pkg.groupSize}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-center">
                          <MapPin className="h-3 w-3 text-emerald-600 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.includes.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">${pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">${pkg.originalPrice}</span>
                      )}
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(tourPackages.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-emerald-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
