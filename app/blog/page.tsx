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
      <section className="relative h-96 bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400 animate-gradient-x overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">Travel Blog</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium drop-shadow-md">
              Discover insider tips, hidden gems, and travel inspiration for your Sri Lankan adventure
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/80 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md animate-fade-in">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-emerald-200 focus:border-emerald-400 rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white border-emerald-400 scale-105 shadow-lg"
                    : "bg-white/80 text-emerald-700 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 animate-fade-in-up">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 border-2 shadow-sm ${
                selectedTag === ""
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white border-emerald-400 scale-105 shadow-lg"
                  : "bg-white/80 text-emerald-700 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 border-2 shadow-sm ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white border-emerald-400 scale-105 shadow-lg"
                    : "bg-white/80 text-emerald-700 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600"
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
        <section className="py-16 bg-gradient-to-br from-emerald-50 via-cyan-50 to-white animate-fade-in">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-emerald-700 mb-8 tracking-tight">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <Card
                  key={post.id}
                  className={`group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 rounded-3xl border-emerald-100 ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2 border-4 border-gradient-to-r from-emerald-400 to-cyan-400" : ""
                  } animate-fade-in-up`}
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
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg">Featured</Badge>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge variant="secondary" className="mb-2 bg-white/20 text-white border border-white/30">
                        {post.category}
                      </Badge>
                      <h3
                        className={`font-extrabold group-hover:text-emerald-200 transition-colors drop-shadow-lg ${
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
                      <p className="text-gray-700 leading-relaxed font-medium text-lg animate-fade-in-up">{post.excerpt}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-white/90 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Card
                key={post.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/95 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.07}s` }}
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
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg border border-white/30">{post.category}</Badge>
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-3 font-semibold">{post.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-3 font-medium animate-fade-in-up">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gradient-to-r from-cyan-100 to-emerald-100 text-emerald-700 border border-emerald-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-emerald-600 font-semibold">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.read_time}
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 font-bold">
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="relative">
              <Image
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors shadow-lg"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                <Badge className="mb-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white border border-white/30">{selectedPost.category}</Badge>
                <h2 className="text-3xl font-extrabold mb-2 drop-shadow-lg">{selectedPost.title}</h2>
                <div className="flex items-center text-sm opacity-90">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-3 font-semibold">{selectedPost.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{new Date(selectedPost.created_at).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{selectedPost.read_time}</span>
                </div>
              </div>
            </div>

            <div className="p-6 animate-fade-in-up">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gradient-to-r from-cyan-100 to-emerald-100 text-emerald-700 border border-emerald-200">
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
                    <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">Share</Button>
                    <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">Save</Button>
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
