"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import type { Review } from "@/lib/supabase"

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarMethod, setAvatarMethod] = useState<"url" | "upload">("url")
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    tour: "",
    comment: "",
    rating: 5,
    avatar: "",
  })

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true)
      // Add cache: 'no-store' to ensure fresh data
      // Fetch all reviews (both approved and unapproved) to show everything
      const response = await fetch("/api/reviews?approved=false", {
        cache: "no-store",
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Fetched reviews from database:", data)
      
      // Always use database reviews if available, otherwise use fallback
      if (data && data.length > 0) {
        setTestimonials(data)
      } else {
        // Fallback to sample reviews only if database is completely empty
        console.log("No reviews in database, using fallback data")
        setTestimonials([
          {
            id: 1,
            name: "Sarah Johnson",
            country: "United States",
            avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
            rating: 5,
            comment:
              "Our trip to Sri Lanka exceeded all expectations! The cultural sites were breathtaking, and our guide was incredibly knowledgeable. Planet Holiday made everything seamless.",
            tour: "Cultural Triangle Explorer",
            date: "2023-12-01",
            approved: true,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Marcus Weber",
            country: "Germany",
            avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
            rating: 5,
            comment:
              "The wildlife safari in Yala was absolutely incredible! We saw leopards, elephants, and so many birds. The accommodation was luxurious and the food was amazing.",
            tour: "Beach & Wildlife Adventure",
            date: "2023-11-01",
            approved: true,
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: "Emma Thompson",
            country: "United Kingdom",
            avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
            rating: 5,
            comment:
              "The hill country tour was magical! The train ride through tea plantations, the cool mountain air, and the stunning views made this trip unforgettable.",
            tour: "Hill Country Escape",
            date: "2023-10-01",
            approved: true,
            created_at: new Date().toISOString(),
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
      toast.error("Failed to load reviews")
      // On error, still try to show fallback data
      setTestimonials([
        {
          id: 1,
          name: "Sarah Johnson",
          country: "United States",
          avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
          rating: 5,
          comment:
            "Our trip to Sri Lanka exceeded all expectations! The cultural sites were breathtaking, and our guide was incredibly knowledgeable. Planet Holiday made everything seamless.",
          tour: "Cultural Triangle Explorer",
          date: "2023-12-01",
          approved: true,
          created_at: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `reviews/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = fileName

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Image upload error:", uploadError)
        toast.error("Failed to upload image. Please try again.")
        return
      }

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath)
      const publicUrl = urlData.publicUrl

      console.log("Image uploaded successfully. Public URL:", publicUrl)
      
      if (!publicUrl) {
        toast.error("Failed to get image URL. Please try again.")
        return
      }
      
      setFormData((prev) => {
        console.log("Setting avatar in formData to:", publicUrl)
        return { ...prev, avatar: publicUrl }
      })
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Ensure avatar is included if it exists
      const submitData = {
        ...formData,
        avatar: formData.avatar && formData.avatar.trim() !== "" ? formData.avatar.trim() : null,
      }
      
      // Log form data for debugging
      console.log("Submitting review with data:", submitData)
      console.log("Avatar value:", submitData.avatar)
      
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        toast.success("Review submitted successfully! It will appear shortly.")
        setIsDialogOpen(false)
        setFormData({
          name: "",
          country: "",
          tour: "",
          comment: "",
          rating: 5,
          avatar: "",
        })
        setAvatarMethod("url")
        // Refresh reviews to show the new one immediately
        await fetchReviews()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
          </div>
        </div>
      </section>
    )
  }

  const currentData = testimonials[currentTestimonial]

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from real travelers who have experienced the magic of Sri Lanka with
            us.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="relative mb-4">
                  <img
                    src={currentData.avatar || "/placeholder.svg"}
                    alt={currentData.name}
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mx-auto lg:mx-0 border-4 border-emerald-100"
                  />
                  <div className="absolute -top-2 -right-2 bg-emerald-600 rounded-full p-2">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{currentData.name}</h4>
                <p className="text-gray-500 mb-2">{currentData.country}</p>
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-emerald-600 font-medium">{currentData.tour}</p>
                <p className="text-xs text-gray-400">{formatDate(currentData.date)}</p>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                  "{currentData.comment}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300 hidden lg:block"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300 hidden lg:block"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`transition-all duration-300 ${
                index === currentTestimonial
                  ? "w-8 h-3 bg-emerald-600 rounded-full"
                  : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Add Review Button */}
        <div className="flex justify-center mt-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="space-y-4 overflow-y-auto flex-1 pr-2 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      placeholder="Your country"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tour">Tour Package *</Label>
                  <Input
                    id="tour"
                    value={formData.tour}
                    onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                    required
                    placeholder="e.g., Cultural Triangle Explorer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating *</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars - Excellent</SelectItem>
                      <SelectItem value="4">4 Stars - Very Good</SelectItem>
                      <SelectItem value="3">3 Stars - Good</SelectItem>
                      <SelectItem value="2">2 Stars - Fair</SelectItem>
                      <SelectItem value="1">1 Star - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review *</Label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                    placeholder="Share your experience with us..."
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Avatar Image (Optional)</Label>
                  <Tabs value={avatarMethod} onValueChange={(value) => setAvatarMethod(value as "url" | "upload")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="url">From URL</TabsTrigger>
                      <TabsTrigger value="upload">Upload File</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url" className="space-y-2">
                      <Input
                        id="avatar-url"
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                      />
                      {formData.avatar && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Preview:</p>
                          <img
                            src={formData.avatar}
                            alt="Avatar preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-emerald-200"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                              toast.error("Failed to load image from URL")
                            }}
                          />
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="upload" className="space-y-2">
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="cursor-pointer"
                      />
                      {uploading && (
                        <p className="text-sm text-emerald-600">Uploading image...</p>
                      )}
                      {formData.avatar && !uploading && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Preview:</p>
                          <img
                            src={formData.avatar}
                            alt="Avatar preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-emerald-200"
                          />
                        </div>
                      )}
                      <p className="text-xs text-gray-500">Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
                    </TabsContent>
                  </Tabs>
                </div>
                {formData.avatar && (
                  <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
                    <p className="text-sm font-medium text-emerald-800 mb-1">✓ Avatar image ready</p>
                    <p className="text-xs text-emerald-600 truncate">{formData.avatar}</p>
                  </div>
                )}
                </div>
                <DialogFooter className="mt-4 flex-shrink-0">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting || uploading} className="bg-emerald-600 hover:bg-emerald-700">
                    {submitting ? "Submitting..." : uploading ? "Uploading..." : "Submit Review"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">4.9</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">500+</div>
            <p className="text-gray-600">Tours Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <p className="text-gray-600">Destinations</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Testimonials
