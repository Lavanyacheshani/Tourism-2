"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, Tag, ArrowRight, Loader2 } from "lucide-react"
import type { BlogPost } from "@/lib/supabase"

const categories = [
  "All",
  "Travel Tips",
  "Budget Travel",
  "Food & Culture",
  "Travel Planning",
  "Photography",
  "Luxury Travel",
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [allTags, setAllTags] = useState<string[]>([])

  // Fetch blog posts from API
  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== "All") params.append("category", selectedCategory)
      if (searchTerm) params.append("search", searchTerm)
      params.append("published", "true") // Only show published posts on live site

      const response = await fetch(`/api/blog?${params}`)
      if (!response.ok) throw new Error("Failed to fetch blog posts")

      const data = await response.json()
      setBlogPosts(data)

      // Extract all unique tags
      const tags = new Set<string>()
      data.forEach((post: BlogPost) => {
        post.tags.forEach((tag: string) => tags.add(tag))
      })
      setAllTags(Array.from(tags))
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogPosts()
  }, [selectedCategory, searchTerm])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag)
    return matchesTag
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Travel Blog</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Discover insider tips, hidden gems, and travel inspiration for your Sri Lankan adventure
              </p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="ml-2 text-gray-600">Loading blog posts...</span>
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Travel Blog</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover insider tips, hidden gems, and travel inspiration for your Sri Lankan adventure
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedTag === ""
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600"
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600"
                }`}
              >
                <Tag className="h-3 w-3 mr-1 inline" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && searchTerm === "" && selectedTag === "" && featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <Card
                  key={post.id}
                  className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={index === 0 ? 500 : 300}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        index === 0 ? "h-64 lg:h-80" : "h-48"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">Featured</Badge>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge variant="secondary" className="mb-2 bg-white/20 text-white">
                        {post.category}
                      </Badge>
                      <h3
                        className={`font-bold group-hover:text-emerald-200 transition-colors ${
                          index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                        }`}
                      >
                        {post.title}
                      </h3>
                      <div className="flex items-center mt-2 text-sm opacity-90">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                  </div>
                  {index === 0 && (
                    <CardContent className="p-6">
                      <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">{post.category}</Badge>
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.read_time}
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedTag("")
                }}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <Badge className="mb-2 bg-emerald-600 text-white">{selectedPost.category}</Badge>
                <h2 className="text-3xl font-bold mb-2">{selectedPost.title}</h2>
                <div className="flex items-center text-sm opacity-90">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-3">{selectedPost.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{new Date(selectedPost.created_at).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{selectedPost.read_time}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">{selectedPost.excerpt}</p>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {selectedPost.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{selectedPost.author}</div>
                      <div className="text-sm text-gray-600">Travel Expert</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
