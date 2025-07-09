"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, MapPin, Calendar, Search, Filter, Loader2 } from "lucide-react"
import type { Package } from "@/lib/supabase"

const categories = [
  "All",
  "Cultural",
  "Wildlife",
  "Adventure",
  "Complete",
  "Wellness",
  "Family",
  "Photography",
  "Luxury",
]
const durations = ["All", "1-5 Days", "6-10 Days", "11+ Days"]
const priceRanges = ["All", "Under $1000", "$1000-$1500", "$1500+"]

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages")
      if (response.ok) {
        const data = await response.json()
        // Only show published packages on the website
        setPackages(data.filter((pkg: Package) => pkg.published))
      }
    } catch (error) {
      console.error("Error fetching packages:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter packages based on search and filters
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory

    const matchesDuration =
      selectedDuration === "All" ||
      (selectedDuration === "1-5 Days" && Number.parseInt(pkg.duration) <= 5) ||
      (selectedDuration === "6-10 Days" && Number.parseInt(pkg.duration) >= 6 && Number.parseInt(pkg.duration) <= 10) ||
      (selectedDuration === "11+ Days" && Number.parseInt(pkg.duration) >= 11)

    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under $1000" && pkg.price < 1000) ||
      (selectedPriceRange === "$1000-$1500" && pkg.price >= 1000 && pkg.price <= 1500) ||
      (selectedPriceRange === "$1500+" && pkg.price > 1500)

    return matchesSearch && matchesCategory && matchesDuration && matchesPrice
  })

  const openBookingForm = (pkg: Package) => {
    const message = `Hi! I'm interested in booking the "${pkg.title}" package for ${pkg.duration}. Can you provide more details?`
    const whatsappUrl = `https://wa.me/+94771234567?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Tour Packages</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Carefully crafted experiences that showcase the best of Sri Lanka
              </p>
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="ml-2 text-gray-600">Loading packages...</span>
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Tour Packages</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Carefully crafted experiences that showcase the best of Sri Lanka
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((dur) => (
                    <SelectItem key={dur} value={dur}>
                      {dur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((dur) => (
                    <SelectItem key={dur} value={dur}>
                      {dur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="border-none shadow-lg">
              <CardHeader className="flex flex-col items-start p-4">
                <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-emerald-600 text-white">
                    {pkg.category}
                  </Badge>
                  <Badge variant="outline" className="bg-teal-600 text-white">
                    {pkg.duration} Days
                  </Badge>
                  <Badge variant="outline" className="bg-blue-600 text-white">
                    ${pkg.price}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{pkg.highlights.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{pkg.capacity} People</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span>{pkg.rating} Stars</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{pkg.date}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex justify-center">
                  <Button variant="default" onClick={() => openBookingForm(pkg)}>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
