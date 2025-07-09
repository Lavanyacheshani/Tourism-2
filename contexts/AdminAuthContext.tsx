"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Secure credentials (in production, these should be environment variables)
const ADMIN_CREDENTIALS = {
  username: "PlanetHoliday",
  password: "Planetholiday123",
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("admin-auth")
      const authTimestamp = localStorage.getItem("admin-auth-timestamp")

      if (authStatus === "authenticated" && authTimestamp) {
        const timestamp = Number.parseInt(authTimestamp)
        const now = Date.now()
        const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours

        if (now - timestamp < sessionDuration) {
          setIsAuthenticated(true)
        } else {
          // Session expired
          localStorage.removeItem("admin-auth")
          localStorage.removeItem("admin-auth-timestamp")
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Add a small delay to prevent brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Validate credentials
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      localStorage.setItem("admin-auth", "authenticated")
      localStorage.setItem("admin-auth-timestamp", Date.now().toString())
      return true
    }

    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin-auth")
    localStorage.removeItem("admin-auth-timestamp")
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
