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
import { FileText, Plus, Edit, Trash2, Search, Calendar, User, Eye } from "lucide-react"
import type { BlogPost } from "@/lib/supabase"
import { supabase } from "@/lib/supabaseClient"


export default function BlogManager() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Admin",
    category: "",
    tags: [] as string[],
    featured: false,
    published: false,
    read_time: "5 min read",
  })

  const categories = [
    "Travel Tips",
    "Budget Travel",
    "Food & Culture",
    "Travel Planning",
    "Photography",
    "Luxury Travel",
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let url = "/api/blog"
      let method: "POST" | "PUT" = "POST"
      if (isEditing && selectedPost && selectedPost.id !== undefined) {
        url = `/api/blog/${selectedPost.id}`
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
        await fetchBlogPosts()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchBlogPosts()
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      published: post.published,
      read_time: post.read_time,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setSelectedPost(null)
    setIsEditing(false)
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "Admin",
      category: "",
      tags: [],
      featured: false,
      published: false,
      read_time: "5 min read",
    })
  }

  const handleArrayInput = (field: "tags", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "")
    setFormData((prev) => ({ ...prev, [field]: items }))
  }

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-emerald-600" />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Blog Manager
                </h2>
                <p className="text-gray-600">Create and manage blog posts and articles</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "New Post"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blog Form */}
        {isEditing && (
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold">{selectedPost ? "Edit Post" : "Create New Post"}</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Full blog post content"
                    rows={6}
                  />
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="read_time">Read Time</Label>
                    <Input
                      id="read_time"
                      value={formData.read_time}
                      onChange={(e) => setFormData((prev) => ({ ...prev, read_time: e.target.value }))}
                      placeholder="5 min read"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(", ")}
                    onChange={(e) => handleArrayInput("tags", e.target.value)}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                    />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                  <div className="flex items-center">
                    <Switch
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
                    />
                    <span className="text-sm font-medium">Published</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                >
                  {isEditing ? "Update Post" : "Create Post"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Search className="h-6 w-6 text-gray-400" />
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts by title, category, or author"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-600">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleEdit(post)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(post.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{post.category}</Badge>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{post.read_time}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{post.published ? "Published" : "Draft"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
