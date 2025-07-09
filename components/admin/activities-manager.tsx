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
import { Switch } from "@/components/ui/switch"
import { Activity, Plus, Edit, Trash2, Search, Star, Clock, MapPin, DollarSign } from "lucide-react"
import type { Activity as ActivityType } from "@/lib/supabase"

export default function ActivitiesManager() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    duration: "",
    price: 0,
    rating: 4.5,
    reviews: 0,
    image: "",
    video_background: false,
    description: "",
    highlights: [] as string[],
    best_time: "",
    difficulty: "Easy",
    group_size: "",
    published: true,
  })

  const categories = ["Marine", "Water Sports", "Trekking", "Wildlife", "Adventure", "Aerial", "Cultural"]
  const difficulties = ["Easy", "Moderate", "Challenging", "Beginner to Advanced"]

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities")
      if (response.ok) {
        const data = await response.json()
        setActivities(data)
      }
    } catch (error) {
      console.error("Error fetching activities:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let url = "/api/activities"
      let method: "POST" | "PUT" = "POST"
      if (isEditing && selectedActivity && selectedActivity.id !== undefined) {
        url = `/api/activities/${selectedActivity.id}`
        method = "PUT"
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchActivities()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving activity:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this activity?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchActivities()
      }
    } catch (error) {
      console.error("Error deleting activity:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (activity: ActivityType) => {
    setSelectedActivity(activity)
    setFormData({
      name: activity.name,
      location: activity.location,
      category: activity.category,
      duration: activity.duration,
      price: activity.price,
      rating: activity.rating,
      reviews: activity.reviews,
      image: activity.image,
      video_background: activity.video_background,
      description: activity.description,
      highlights: activity.highlights,
      best_time: activity.best_time,
      difficulty: activity.difficulty,
      group_size: activity.group_size,
      published: activity.published,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setSelectedActivity(null)
    setIsEditing(false)
    setFormData({
      name: "",
      location: "",
      category: "",
      duration: "",
      price: 0,
      rating: 4.5,
      reviews: 0,
      image: "",
      video_background: false,
      description: "",
      highlights: [],
      best_time: "",
      difficulty: "Easy",
      group_size: "",
      published: true,
    })
  }

  const handleArrayInput = (field: "highlights", value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "")
    setFormData((prev) => ({ ...prev, [field]: items }))
  }

  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-emerald-600" />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Activities Manager
                </h2>
                <p className="text-gray-600">Manage adventure activities and experiences</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Add Activity"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Form */}
        {isEditing && (
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">{selectedActivity ? "Edit Activity" : "Add New Activity"}</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Activity Name</Label>
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
                    placeholder="e.g., Mirissa, Southern Coast"
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
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 3-4 hours"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="group_size">Group Size</Label>
                  <Input
                    id="group_size"
                    value={formData.group_size}
                    onChange={(e) => setFormData((prev) => ({ ...prev, group_size: e.target.value }))}
                    placeholder="e.g., Up to 30 people"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="best_time">Best Time</Label>
                  <Input
                    id="best_time"
                    value={formData.best_time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, best_time: e.target.value }))}
                    placeholder="e.g., November to April"
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />

                    
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the activity"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="highlights">Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights.join("\n")}
                    onChange={(e) => handleArrayInput("highlights", e.target.value)}
                    placeholder="Blue whale sightings&#10;Dolphin encounters&#10;Professional guides"
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="video_background"
                      checked={formData.video_background}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, video_background: checked }))}
                    />
                    <Label htmlFor="video_background">Video Background</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  >
                    {loading ? "Saving..." : selectedActivity ? "Update Activity" : "Create Activity"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Activities List */}
        <div className={`${isEditing ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
          {/* Search */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading activities...</p>
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No activities found</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{activity.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {activity.location}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {activity.duration}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />${activity.price}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="secondary">{activity.category}</Badge>
                          <Badge variant="outline">{activity.difficulty}</Badge>
                          {activity.video_background && <Badge className="bg-red-100 text-red-800">Video</Badge>}
                          <Badge
                            className={activity.published ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {activity.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {activity.rating} ({activity.reviews} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(activity)} className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(activity.id)}
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
