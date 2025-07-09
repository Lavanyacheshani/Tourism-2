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
import { Package, Plus, Edit, Trash2, Search, Star, Clock, Users, DollarSign } from "lucide-react"
import type { Package as PackageType } from "@/lib/supabase"
import { supabase } from "@/lib/supabaseClient"


export default function PackagesManager() {
  const [packages, setPackages] = useState<PackageType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    group_size: "",
    price: 0,
    original_price: 0,
    rating: 4.5,
    reviews: 0,
    image: "",
    category: "",
    difficulty: "Easy",
    highlights: [] as string[],
    includes: [] as string[],
    itinerary: [] as string[],
    featured: false,
    published: true,
  })

  const categories = ["Cultural", "Wildlife", "Adventure", "Complete", "Wellness", "Family", "Photography", "Luxury"]
  const difficulties = ["Easy", "Moderate", "Challenging"]

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages")
      if (response.ok) {
        const data = await response.json()
        setPackages(data)
      }
    } catch (error) {
      console.error("Error fetching packages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let url = "/api/packages"
      let method: "POST" | "PUT" = "POST"
      if (isEditing && selectedPackage && selectedPackage.id !== undefined) {
        url = `/api/packages/${selectedPackage.id}`
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
        await fetchPackages()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving package:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this package?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchPackages()
      }
    } catch (error) {
      console.error("Error deleting package:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (pkg: PackageType) => {
    setSelectedPackage(pkg)
    setFormData({
      title: pkg.title,
      duration: pkg.duration,
      group_size: pkg.group_size,
      price: pkg.price,
      original_price: pkg.original_price || 0,
      rating: pkg.rating,
      reviews: pkg.reviews,
      image: pkg.image,
      category: pkg.category,
      difficulty: pkg.difficulty,
      highlights: pkg.highlights,
      includes: pkg.includes,
      itinerary: pkg.itinerary,
      featured: pkg.featured,
      published: pkg.published,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setSelectedPackage(null)
    setIsEditing(false)
    setFormData({
      title: "",
      duration: "",
      group_size: "",
      price: 0,
      original_price: 0,
      rating: 4.5,
      reviews: 0,
      image: "",
      category: "",
      difficulty: "Easy",
      highlights: [],
      includes: [],
      itinerary: [],
      featured: false,
      published: true,
    })
  }

  const handleArrayInput = (field: "highlights" | "includes" | "itinerary", value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "")
    setFormData((prev) => ({ ...prev, [field]: items }))
  }

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-emerald-600" />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Packages Manager
                </h2>
                <p className="text-gray-600">Manage tour packages and travel experiences</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Add Package"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Package Form */}
        {isEditing && (
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">{selectedPackage ? "Edit Package" : "Add New Package"}</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 7 Days"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="group_size">Group Size</Label>
                    <Input
                      id="group_size"
                      value={formData.group_size}
                      onChange={(e) => setFormData((prev) => ({ ...prev, group_size: e.target.value }))}
                      placeholder="e.g., 2-15 People"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="original_price">Original Price ($)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      value={formData.original_price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, original_price: Number(e.target.value) }))}
                    />
                  </div>
                </div>

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
                  <Label htmlFor="highlights">Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights.join("\n")}
                    onChange={(e) => handleArrayInput("highlights", e.target.value)}
                    placeholder="Sigiriya Rock Fortress&#10;Dambulla Cave Temple&#10;Kandy Temple"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="includes">What's Included (one per line)</Label>
                  <Textarea
                    id="includes"
                    value={formData.includes.join("\n")}
                    onChange={(e) => handleArrayInput("includes", e.target.value)}
                    placeholder="Accommodation&#10;All Meals&#10;Transport&#10;Guide"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="itinerary">Itinerary (one per line)</Label>
                  <Textarea
                    id="itinerary"
                    value={formData.itinerary.join("\n")}
                    onChange={(e) => handleArrayInput("itinerary", e.target.value)}
                    placeholder="Day 1: Arrival in Colombo&#10;Day 2: Sigiriya Rock Fortress"
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                    />
                    <Label htmlFor="featured">Featured</Label>
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
                    {loading ? "Saving..." : selectedPackage ? "Update Package" : "Create Package"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Packages List */}
        <div className={`${isEditing ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
          {/* Search */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading packages...</p>
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No packages found</p>
              </div>
            ) : (
              filteredPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{pkg.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {pkg.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {pkg.group_size}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />${pkg.price}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="secondary">{pkg.category}</Badge>
                          <Badge variant="outline">{pkg.difficulty}</Badge>
                          {pkg.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                          <Badge className={pkg.published ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {pkg.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {pkg.rating} ({pkg.reviews} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)} className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(pkg.id)}
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
