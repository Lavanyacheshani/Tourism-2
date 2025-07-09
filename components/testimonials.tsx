"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United Kingdom",
    rating: 5,
    text: "Planet Holiday made our Sri Lankan adventure absolutely unforgettable! The attention to detail and local knowledge of our guide was exceptional. Every moment was perfectly planned.",
    image: "/placeholder.svg?height=80&width=80",
    tour: "Cultural Triangle Explorer",
  },
  {
    id: 2,
    name: "Michael Chen",
    country: "Australia",
    rating: 5,
    text: "The wildlife safari exceeded all expectations. Seeing leopards in Yala and whales in Mirissa was a dream come true. Professional service throughout our journey.",
    image: "/placeholder.svg?height=80&width=80",
    tour: "Wildlife & Beach Paradise",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    country: "Spain",
    rating: 5,
    text: "The hill country tour was breathtaking! The train ride through tea plantations and the sunrise at Adams Peak were magical moments we'll never forget.",
    image: "/placeholder.svg?height=80&width=80",
    tour: "Hill Country Adventure",
  },
  {
    id: 4,
    name: "David Thompson",
    country: "Canada",
    rating: 5,
    text: "Outstanding service from start to finish. The complete Sri Lanka experience package was worth every penny. Highly recommend Planet Holiday!",
    image: "/placeholder.svg?height=80&width=80",
    tour: "Complete Sri Lanka Experience",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    country: "United States",
    rating: 5,
    text: "The Ayurveda wellness retreat was exactly what I needed. Perfect blend of relaxation, culture, and natural beauty. Thank you for an amazing experience!",
    image: "/placeholder.svg?height=80&width=80",
    tour: "Ayurveda Wellness Retreat",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the thousands of happy travelers who have experienced the magic
            of Sri Lanka with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <Quote className="h-16 w-16 text-emerald-600/20" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-emerald-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-600">{testimonials[currentIndex].country}</p>
                      <p className="text-emerald-600 font-medium text-sm">{testimonials[currentIndex].tour}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-emerald-50 transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6 text-emerald-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-emerald-50 transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6 text-emerald-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-emerald-600 w-8" : "bg-gray-300 hover:bg-emerald-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <div className="text-gray-600">Tour Packages</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">15</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
