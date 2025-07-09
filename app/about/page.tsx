"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart, CheckCircle } from "lucide-react"

const timelineEvents = [
  {
    year: "2009",
    title: "Company Founded",
    description: "Started as a small family business with a passion for showcasing Sri Lanka's beauty",
    icon: "🌱",
  },
  {
    year: "2012",
    title: "First 1000 Travelers",
    description: "Reached our first milestone of serving 1000 happy travelers",
    icon: "🎯",
  },
  {
    year: "2015",
    title: "Award Recognition",
    description: 'Received "Best Local Tour Operator" award from Sri Lanka Tourism Board',
    icon: "🏆",
  },
  {
    year: "2018",
    title: "Digital Transformation",
    description: "Launched our online platform and mobile-friendly booking system",
    icon: "💻",
  },
  {
    year: "2020",
    title: "Sustainable Tourism",
    description: "Pioneered eco-friendly and sustainable tourism practices",
    icon: "🌿",
  },
  {
    year: "2024",
    title: "10,000+ Happy Travelers",
    description: "Celebrating over 10,000 satisfied customers from around the world",
    icon: "🎉",
  },
]

const teamMembers = [
  {
    name: "Rajesh Perera",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "15+ years in tourism industry, passionate about sustainable travel",
    specialties: ["Cultural Tours", "Business Development"],
  },
  {
    name: "Samantha Silva",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Expert in logistics and customer experience management",
    specialties: ["Operations", "Customer Service"],
  },
  {
    name: "Dinesh Fernando",
    role: "Wildlife Expert",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Marine biologist and wildlife photographer with 12+ years experience",
    specialties: ["Wildlife Tours", "Photography"],
  },
  {
    name: "Priya Jayawardena",
    role: "Cultural Specialist",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Historian and cultural expert specializing in ancient Sri Lankan heritage",
    specialties: ["Cultural Heritage", "Historical Tours"],
  },
]

const values = [
  {
    icon: <Heart className="h-8 w-8 text-emerald-600" />,
    title: "Passion for Sri Lanka",
    description: "We are deeply passionate about our beautiful island and love sharing its wonders with the world.",
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-600" />,
    title: "Customer First",
    description: "Every decision we make is centered around creating unforgettable experiences for our travelers.",
  },
  {
    icon: <Globe className="h-8 w-8 text-emerald-600" />,
    title: "Sustainable Tourism",
    description:
      "We are committed to responsible tourism that benefits local communities and preserves our environment.",
  },
  {
    icon: <Award className="h-8 w-8 text-emerald-600" />,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, from planning to execution.",
  },
]

export default function AboutPage() {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Planet Holiday</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Your trusted partner in discovering the magic of Sri Lanka for over 15 years
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Planet Holiday was born from a simple dream: to share the incredible beauty, rich culture, and warm
              hospitality of Sri Lanka with travelers from around the world. What started as a small family business has
              grown into one of Sri Lanka's most trusted tour operators, but our core values remain unchanged.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Our story"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Planet Holiday?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                    <p className="text-gray-600">
                      Born and raised in Sri Lanka, we know every hidden gem and secret spot.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Service</h4>
                    <p className="text-gray-600">Every tour is tailored to your interests, budget, and travel style.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                    <p className="text-gray-600">
                      Our team is always available to ensure your journey is smooth and memorable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sustainable Practices</h4>
                    <p className="text-gray-600">
                      We're committed to responsible tourism that benefits local communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming Sri Lanka's premier tour operator
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>

              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-4xl mb-3">{event.icon}</div>
                        <Badge className="bg-emerald-600 text-white mb-3">{event.year}</Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals who make your Sri Lankan adventure possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setActiveTeamMember(index)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-emerald-100">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-emerald-100">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-emerald-100">Tour Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-emerald-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
