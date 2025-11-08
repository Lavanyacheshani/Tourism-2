import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

// GET - list reviews (only approved ones for public, or all for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const approvedOnly = searchParams.get("approved") !== "false"

    let query = supabaseServer.from("reviews").select("*")

    if (approvedOnly) {
      query = query.eq("approved", true)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// POST - create a new review
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Basic validation
    const { name, country, tour, comment, rating } = body
    if (!name || !country || !tour || !comment || !rating) {
      return NextResponse.json(
        {
          error: "name, country, tour, comment, and rating are required",
        },
        { status: 400 },
      )
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          error: "rating must be between 1 and 5",
        },
        { status: 400 },
      )
    }

    // Prepare review data
    // Handle avatar - use null only if it's empty string or undefined, otherwise use the value
    const avatarValue = body.avatar && body.avatar.trim() !== "" ? body.avatar.trim() : null
    
    console.log("Review data being saved:", {
      name,
      country,
      tour,
      comment,
      rating: parseInt(rating),
      avatar: avatarValue,
      approved: true,
    })

    const reviewData = {
      name,
      country,
      tour,
      comment,
      rating: parseInt(rating),
      avatar: avatarValue,
      approved: true, // Auto-approve reviews so they show immediately
      date: body.date || new Date().toISOString().split("T")[0],
    }

    const { data, error } = await supabaseServer.from("reviews").insert(reviewData).select().single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: (err as Error).message }, { status: 400 })
  }
}

