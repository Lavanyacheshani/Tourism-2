import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (API routes)
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

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
