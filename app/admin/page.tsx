"use client"

import { useState } from "react"
import { useAdminAuth } from "@/contexts/AdminAuthContext"
import AdminLogin from "@/components/admin/admin-login"
import DashboardStats from "@/components/admin/dashboard-stats"
import PackagesManager from "@/components/admin/packages-manager"
import ActivitiesManager from "@/components/admin/activities-manager"
import DestinationsManager from "@/components/admin/destinations-manager"
import BlogManager from "@/components/admin/blog-manager"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, BarChart3, Package, MapPin, Activity, FileText, Shield, User } from "lucide-react"

export default function AdminPage() {
  const { isAuthenticated, logout, loading } = useAdminAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />
  }

  // Main admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Planet Holiday Admin</h1>
                <p className="text-sm text-gray-500">Content Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Administrator</span>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Packages</span>
            </TabsTrigger>
            <TabsTrigger
              value="destinations"
              className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Destinations</span>
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activities</span>
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
            </div>
            <DashboardStats />
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Tour Packages</h2>
            </div>
            <PackagesManager />
          </TabsContent>

          <TabsContent value="destinations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
            </div>
            <DestinationsManager />
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Activities</h2>
            </div>
            <ActivitiesManager />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
            </div>
            <BlogManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
