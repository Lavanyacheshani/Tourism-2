import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (API routes)
// Note: This should only be used in server-side code (API routes)
// For better type safety, consider using lib/supabase-server.ts instead
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : (() => {
      if (typeof window === "undefined") {
        console.warn("SUPABASE_SERVICE_ROLE_KEY is not set. Admin operations will fail.")
      }
      return null
    })()

// Types for our database tables
export interface Destination {
  id: number
  name: string
  location: string
  category: string
  rating: number
  description: string
  image: string
  highlights: string[]
  difficulty: string
  best_time: string
  duration: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  read_time: string
  created_at: string
  updated_at: string
}

export interface Package {
  id: number
  title: string
  duration: string
  group_size: string
  price: number
  original_price?: number
  rating: number
  reviews: number
  image: string
  category: string
  difficulty: string
  highlights: string[]
  includes: string[]
  itinerary: string[]
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface Activity {
  id: number
  name: string
  location: string
  category: string
  duration: string
  price: number
  rating: number
  reviews: number
  image: string
  video_background: boolean
  description: string
  highlights: string[]
  best_time: string
  difficulty: string
  group_size: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: number
  name: string
  country: string
  tour: string
  comment: string
  rating: number
  date: string
  avatar: string | null
  approved: boolean
  created_at: string
}