"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Package, Activity, FileText, TrendingUp, Eye, Calendar } from "lucide-react"

interface Stats {
  destinations: number
  packages: number
  activities: number
  blogPosts: number
  publishedPosts: number
  featuredContent: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    destinations: 0,
    packages: 0,
    activities: 0,
    blogPosts: 0,
    publishedPosts: 0,
    featuredContent: 0,
  })
  const [loading, setLoading] = useState(true)

  const safeJsonParse = async (response: Response) => {
    if (!response.ok) {
      const text = await response.text()
      console.error(`API Error (${response.status}):`, text)
      return []
    }
    return response.json()
  }

  const fetchStats = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [destinationsRes, packagesRes, activitiesRes, blogRes] = await Promise.all([
        fetch("/api/destinations").then(safeJsonParse),
        fetch("/api/packages").then(safeJsonParse),
        fetch("/api/activities").then(safeJsonParse),
        fetch("/api/blog").then(safeJsonParse),
      ])

      // Calculate stats
      const publishedPosts = blogRes.filter((post: any) => post.published).length
      const featuredContent = [
        ...destinationsRes.filter((d: any) => d.featured),
        ...packagesRes.filter((p: any) => p.featured),
        ...blogRes.filter((b: any) => b.featured),
      ].length

      setStats({
        destinations: destinationsRes.length,
        packages: packagesRes.length,
        activities: activitiesRes.length,
        blogPosts: blogRes.length,
        publishedPosts,
        featuredContent,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Destinations",
      value: stats.destinations,
      icon: MapPin,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Tour Packages",
      value: stats.packages,
      icon: Package,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Activities",
      value: stats.activities,
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Published Posts",
      value: stats.publishedPosts,
      icon: Eye,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Featured Content",
      value: stats.featuredContent,
      icon: TrendingUp,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
              <h3 className="font-semibold text-emerald-800 mb-2">Content Overview</h3>
              <p className="text-sm text-emerald-600">
                Total: {stats.destinations + stats.packages + stats.activities + stats.blogPosts} items
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Published Content</h3>
              <p className="text-sm text-blue-600">{stats.publishedPosts} blog posts live</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-purple-800 mb-2">Featured Items</h3>
              <p className="text-sm text-purple-600">{stats.featuredContent} featured items</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
              <h3 className="font-semibold text-orange-800 mb-2">Website Status</h3>
              <p className="text-sm text-orange-600">All systems operational</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
