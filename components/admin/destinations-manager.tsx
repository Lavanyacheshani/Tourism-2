"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, Edit, Trash2, Search, Star, Clock, Map } from "lucide-react"
import type { Destination } from "@/lib/supabase"
import { supabase } from "@/lib/supabaseClient"


export default function DestinationsManager() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    rating: 4.5,
    description: "",
    image: "",
    highlights: [] as string[],
    difficulty: "Easy",
    best_time: "",
    duration: "",
  })

  /** Remove keys whose values are undefined / ""  and coerce numerics. */
  function sanitizeDestination(data: typeof formData) {
    const cleaned: Record<string, unknown> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        // rating must be numeric in the DB
        cleaned[key] = key === "rating" ? Number(value) : value
      }
    })
    return cleaned
  }

  const categories = ["Cultural", "Wildlife", "Adventure", "Beach", "Nature", "Religious"]
  const difficulties = ["Easy", "Moderate", "Challenging"]

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations")
      if (response.ok) {
        const data = await response.json()
        setDestinations(data)
      }
    } catch (error) {
      console.error("Error fetching destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let url = "/api/destinations"
      let method: "POST" | "PUT" = "POST"
      if (isEditing && selectedDestination && selectedDestination.id !== undefined) {
        url = `/api/destinations/${selectedDestination.id}`
        method = "PUT"
      }

      const cleanedPayload = sanitizeDestination(formData)

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedPayload),
      })

      if (response.ok) {
        await fetchDestinations()
        resetForm()
      } else {
        const err = await response.json()
        console.error("Server responded with error:", err)
      }
    } catch (error) {
      console.error("Error saving destination:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this destination?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/destinations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchDestinations()
      }
    } catch (error) {
      console.error("Error deleting destination:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (destination: Destination) => {
    setSelectedDestination(destination)
    setFormData({
      name: destination.name,
      location: destination.location,
      category: destination.category,
      rating: destination.rating,
      description: destination.description,
      image: destination.image,
      highlights: destination.highlights,
      difficulty: destination.difficulty,
      best_time: destination.best_time,
      duration: destination.duration,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setSelectedDestination(null)
    setIsEditing(false)
    setFormData({
      name: "",
      location: "",
      category: "",
      rating: 4.5,
      description: "",
      image: "",
      highlights: [],
      difficulty: "Easy",
      best_time: "",
      duration: "",
    })
  }

  const handleArrayInput = (field: "highlights", value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "")
    setFormData((prev) => ({ ...prev, [field]: items }))
  }

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-emerald-600" />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Destinations Manager
                </h2>
                <p className="text-gray-600">Manage tourist destinations and attractions</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Add Destination"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Destination Form */}
        {isEditing && (
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">
                {selectedDestination ? "Edit Destination" : "Add New Destination"}
              </h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Destination Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Central Province"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff}>
                            {diff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="best_time">Best Time</Label>
                    <Input
                      id="best_time"
                      value={formData.best_time}
                      onChange={(e) => setFormData((prev) => ({ ...prev, best_time: e.target.value }))}
                      placeholder="e.g., Early morning"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 3-4 hours"
                    />
                  </div>
                </div>

                <div>
                <Label htmlFor="image">Upload Image</Label>
<Input
  id="image"
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('images') // your bucket name
      .upload(filePath, file);

    if (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image.');
    } else {
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;
      setFormData((prev) => ({ ...prev, image: publicUrl }));
    }
  }}
/>
{formData.image && (
  <img src={formData.image} alt="Preview" className="mt-2 rounded shadow-md h-32 object-cover" />
)}

                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the destination"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="highlights">Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights.join("\n")}
                    onChange={(e) => handleArrayInput("highlights", e.target.value)}
                    placeholder="Ancient frescoes&#10;Mirror wall&#10;Water gardens"
                    rows={4}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  >
                    {loading ? "Saving..." : selectedDestination ? "Update Destination" : "Create Destination"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Destinations List */}
        <div className={`${isEditing ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
          {/* Search */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading destinations...</p>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No destinations found</p>
              </div>
            ) : (
              filteredDestinations.map((destination) => (
                <Card
                  key={destination.id}
                  className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{destination.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Map className="h-4 w-4 mr-1" />
                          {destination.location}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="secondary">{destination.category}</Badge>
                          <Badge variant="outline">{destination.difficulty}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            {destination.rating}
                          </div>
                          {destination.duration && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {destination.duration}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(destination)} className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(destination.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
