"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Camera, Sparkles, Clock, Users, Heart, Map } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

const MotionSection = motion.section

export default function FeaturedDestinations({ showAll = false }: { showAll?: boolean }) {
  const router = useRouter();
  
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true;
    
    async function fetchDestinations() {
      try {
        const res = await fetch("/api/destinations", {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        if (!mounted) return;
        
        const data = await res.json();
        if (Array.isArray(data) && mounted) {
          setDestinations(data);
        }
      } catch (e) {
        console.error('Error fetching destinations:', e);
        if (mounted) {
          setDestinations([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    fetchDestinations();
    
    return () => {
      mounted = false;
    };
  }, [])

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

  const getCategoryColor = (category: string) => {
    const colors = {
      Cultural: "from-yellow-500 to-orange-400",
      Adventure: "from-blue-500 to-indigo-500",
      Beach: "from-cyan-400 to-blue-400",
      Nature: "from-green-500 to-emerald-500",
      Wildlife: "from-amber-600 to-lime-500",
      Historical: "from-rose-500 to-pink-400",
    };
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
  }

  const categories = ["All", "Cultural", "Wildlife", "Nature", "Beach", "Historical"];

  // Only show first 6 destinations for the grid
  const shownDestinations = showAll ? filteredDestinations : filteredDestinations.slice(0, 6);

  const handleBooking = (destination: any) => {
    const message = `Hello, I would like to book a tour to "${destination.name}".\n\n` +
      `Category: ${destination.category}\n` +
      `Location: ${destination.location}\n` +
      `Duration: ${destination.duration || 'Not specified'}\n` +
      `Best Time: ${destination.best_time || 'Not specified'}\n` +
      `Highlights: ${Array.isArray(destination.highlights) ? destination.highlights.join(', ') : 'None specified'}`;

    router.push(`/contact?tourInterest=${encodeURIComponent(destination.name)}&message=${encodeURIComponent(message)}`);
  };

  return (
    <MotionSection
      className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-2 border border-emerald-200">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Discover Amazing Places</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="text-gradient">Featured Destinations</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover the most breathtaking locations Sri Lanka has to offer, each with its unique charm and
            <span className="font-semibold text-emerald-700"> unforgettable experiences</span>
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

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl overflow-hidden">
                  <div className="h-72 bg-gray-300"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6"></div>
                    <div className="h-10 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Destinations Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shownDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                data-index={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedDestination(destination)}
                onMouseEnter={() => setHoveredCard(destination.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="destination-card group cursor-pointer"
            >
              <div className="relative bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                {/* Image Container with Overlay Effects */}
                <div className="relative overflow-hidden h-72">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={600}
                    height={400}
                    loading="eager"
                    priority={index < 3}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <Badge
                    className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(destination.category)} text-white font-semibold px-4 py-2 shadow-lg transform group-hover:scale-110 transition-all duration-300`}
                  >
                    {destination.category}
                  </Badge>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-gray-800">{destination.rating}</span>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div
                    className={`absolute bottom-4 left-4 flex gap-2 transition-all duration-500 ${
                      hoveredCard === destination.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-300">
                      <Camera className="w-4 h-4" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-300">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                        {destination.name}
                      </h3>
                      <div className="flex items-center mb-3 text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="font-medium">{destination.location}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">{destination.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{destination.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{destination.location}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      handleBooking(destination);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 group-hover:from-emerald-500 group-hover:to-teal-500"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>

        {/* Call to Action */}
        {!showAll && (
          <div className="text-center mt-20">
            <Button
              asChild
              size="lg"
              className="btn-gradient px-12 py-6 text-lg font-semibold rounded-full shadow-glow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
            >
              <a href="/destinations">
                <Sparkles className="mr-3 h-5 w-5" />
                View All Destinations
              </a>
            </Button>
          </div>
        )}

        {/* Enhanced Modal */}
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <Image
                  src={selectedDestination.image || "/placeholder.svg"}
                  alt={selectedDestination.name}
                  width={800}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white rounded-full p-3 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Modal Header */}
                <div className="absolute bottom-6 left-6 text-white">
                  <div
                    className={`inline-block bg-gradient-to-r ${getCategoryColor(selectedDestination.category)} px-4 py-2 rounded-full text-sm font-semibold mb-3`}
                  >
                    {selectedDestination.category}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{selectedDestination.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{selectedDestination.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">{selectedDestination.description}</p>

                {/* In modal details, show all available fields from the database schema */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {selectedDestination.duration && (
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Clock className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Duration</div>
                        <div className="text-gray-600">{selectedDestination.duration}</div>
                      </div>
                    </div>
                  )}
                  {selectedDestination.best_time && (
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Map className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Best Time</div>
                        <div className="text-gray-600">{selectedDestination.best_time}</div>
                      </div>
                    </div>
                  )}
                  {selectedDestination.difficulty && (
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Users className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Difficulty</div>
                        <div className="text-gray-600">{selectedDestination.difficulty}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fix highlights.map error in modal */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(Array.isArray(selectedDestination.highlights) ? selectedDestination.highlights : []).map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      setSelectedDestination(null)
                      handleBooking(selectedDestination)
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Book This Destination
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </MotionSection>
  )