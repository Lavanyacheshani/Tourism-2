"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, Clock, Star } from "lucide-react"

// Category definitions matching the provided UI
const categories = [
  { id: "all", label: "All Activities" },
  { id: "adventure", label: "Adventure" },
  { id: "marine", label: "Marine" },
  { id: "cultural", label: "Cultural" },
  { id: "wildlife", label: "Wildlife" },
]

// Helper for difficulty color
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-100 text-green-800"
    case "Moderate": return "bg-yellow-100 text-yellow-800"
    case "Challenging": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
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

  // Map backend fields to UI fields
  const mappedActivities = activities.map((a) => ({
    id: a.id,
    title: a.name, // backend: name
    image: a.image || "/placeholder.svg",
    video: a.video_background ? a.video_background : undefined,
    description: a.description,
    duration: a.duration,
    groupSize: a.group_size,
    difficulty: a.difficulty,
    rating: a.rating,
    category: a.category?.toLowerCase(),
    location: a.location,
    highlights: Array.isArray(a.highlights) ? a.highlights : (a.highlights ? JSON.parse(a.highlights) : []),
  }))

  // Show all activities for 'all', otherwise filter
  const filteredActivities = selectedCategory === "all"
    ? mappedActivities
    : mappedActivities.filter((activity) => activity.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-jungle-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Adventure Activities
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up">
              From adrenaline-pumping adventures to peaceful cultural experiences
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

      {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-lg">Loading activities...</div>
            ) : filteredActivities.length === 0 ? (
              <div className="col-span-full text-center text-lg">No activities found.</div>
            ) : (
              filteredActivities.map((activity, index) => (
                <div
                key={activity.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedActivity(activity)}
              >
                    <div className="relative">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(activity.difficulty)}`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">{activity.rating ? `${activity.rating}/5` : "4.5/5"}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{activity.groupSize}</span>
                  </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-base font-semibold text-gray-800">{activity.rating ? `${activity.rating}/5` : "4.5/5"}</span>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors duration-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                    </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedActivity.title}</h3>
                  <p className="text-gray-600">{selectedActivity.location}</p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <Star className="w-7 h-7 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-primary-600">{selectedActivity.rating ? `${selectedActivity.rating}/5` : "4.5/5"}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedActivity.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold">Duration</div>
                    <div className="text-gray-600">{selectedActivity.duration}</div>
                  </div>
                    </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold">Group Size</div>
                    <div className="text-gray-600">{selectedActivity.groupSize}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="font-semibold">Rating</div>
                    <div className="text-gray-600">{selectedActivity.rating ? `${selectedActivity.rating}/5` : "4.5/5"}</div>
                        </div>
                        </div>
                      </div>
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedActivity.highlights?.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700">{highlight}</span>
                      </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-primary-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-primary-700 transition-colors duration-300">
                  Book This Activity
                </button>
                <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
