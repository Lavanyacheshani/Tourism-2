import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

// GET - list activities
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false })

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

// POST - create a new activity
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Basic validation
    const { name, location, category, duration, price } = body
    if (!name || !location || !category || !duration || !price) {
      return NextResponse.json(
        {
          error: "name, location, category, duration, and price are required",
        },
        { status: 400 },
      )
    }

    const { data, error } = await supabaseServer.from("activities").insert(body).select().single()

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
