import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const published = searchParams.get("published")
    const featured = searchParams.get("featured")

    let query = supabaseAdmin.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (category && category !== "All") {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }

    if (published === "true") {
      query = query.eq("published", true)
    } else if (published === "false") {
      query = query.eq("published", false)
    }

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching blog posts:", error)
      return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in blog GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabaseAdmin.from("blog_posts").insert([body]).select().single()

    if (error) {
      console.error("Error creating blog post:", error)
      return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in blog POST:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
