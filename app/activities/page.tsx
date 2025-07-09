"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, MapPin, Camera, Waves, Mountain, TreePine, Compass } from "lucide-react"

const categories = ["All", "Marine", "Water Sports", "Trekking", "Wildlife", "Adventure", "Aerial"]

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/activities")
        if (res.ok) {
          const data = await res.json()
          setActivities(data)
        }
      } catch (err) {
        console.error("Failed to fetch activities", err)
      } finally {
        setLoading(false)
      }
    }
    fetchActivities()
  }, [])

  const filteredActivities =
    activeCategory === "All"
      ? activities
      : activities.filter((activity) => activity.category === activeCategory)

  const openBookingForm = (activity: any) => {
    const message = `Hi! I'm interested in booking "${activity.name}" activity. Can you provide more details?`
    const whatsappUrl = `https://wa.me/+94771234567?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Adventure Activities</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Thrilling experiences and unforgettable adventures across Sri Lanka
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
              activeCategory === category
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow-lg"
                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 hover:text-emerald-700 shadow-lg hover:shadow-xl border border-white/50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full text-center text-lg">Loading activities...</div>
        ) : filteredActivities.length === 0 ? (
          <div className="col-span-full text-center text-lg">No activities found.</div>
        ) : (
          filteredActivities.map((activity, index) => (
            <Card key={activity.id || index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 card-glass">
              <div className="relative overflow-hidden">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.name}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500" />
                <Badge className="absolute top-6 left-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-4 py-2 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  {activity.category}
                </Badge>
                <div className="absolute top-6 right-6 flex items-center bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold ml-1 text-gray-800">{activity.rating}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 text-shadow-strong group-hover:text-shadow-soft transition-all duration-300">
                    {activity.name}
                  </h3>
                  <div className="flex items-center mb-3 opacity-90">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {activity.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {activity.group_size}
                    </span>
                  </div>
                  <Button
                    className="mt-4 btn-gradient rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                    onClick={() => openBookingForm(activity)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
