"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"
import { useAdminAuth } from "@/contexts/AdminAuthContext"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const { login } = useAdminAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if too many failed attempts
    if (attempts >= 3) {
      setError("Too many failed attempts. Please wait before trying again.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const success = await login(username.trim(), password)

      if (success) {
        setAttempts(0)
        // Login successful - the context will handle the redirect
      } else {
        setAttempts((prev) => prev + 1)
        setError("Invalid username or password. Please check your credentials and try again.")

        // Clear password field on failed attempt
        setPassword("")

        // If this is the 3rd attempt, show lockout message
        if (attempts + 1 >= 3) {
          setError("Too many failed attempts. Access temporarily locked.")
          setTimeout(() => {
            setAttempts(0)
            setError("")
          }, 30000) // 30 second lockout
        }
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isLocked = attempts >= 3

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Planet Holiday Admin
            </CardTitle>
            <p className="text-gray-600 mt-2">Secure access to content management</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Enter your username"
                    required
                    disabled={loading || isLocked}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Enter your password"
                    required
                    disabled={loading || isLocked}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    disabled={loading || isLocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className={`border-red-200 bg-red-50 ${isLocked ? "border-orange-200 bg-orange-50" : ""}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className={`${isLocked ? "text-orange-800" : "text-red-800"}`}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {attempts > 0 && attempts < 3 && (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  Warning: {3 - attempts} attempt{3 - attempts !== 1 ? "s" : ""} remaining
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || isLocked || !username.trim() || !password}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : isLocked ? (
                  "Access Locked"
                ) : (
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In Securely
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-700">
                  <p className="font-medium mb-1">Security Notice:</p>
                  <p>
                    This is a secure admin portal. Multiple failed login attempts will result in temporary access
                    restriction.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Credentials - Only show in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2 font-medium">Demo Credentials:</p>
                <div className="text-xs text-gray-500 space-y-1 font-mono">
                  <p>
                    <strong>Username:</strong> PlanetHoliday
                  </p>
                  <p>
                    <strong>Password:</strong> Planetholiday123
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2024 Planet Holiday. Secure Admin Access.</p>
        </div>
      </div>
    </div>
  )
}
