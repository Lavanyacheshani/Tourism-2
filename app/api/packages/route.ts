import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

// GET - list packages
export async function GET() {
  try {
    const { data, error } = await supabaseServer.from("packages").select("*").order("created_at", { ascending: false })

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

// POST - create a new package
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Basic validation
    const { title, duration, group_size, price, category } = body
    if (!title || !duration || !group_size || !price || !category) {
      return NextResponse.json(
        {
          error: "title, duration, group_size, price, and category are required",
        },
        { status: 400 },
      )
    }

    const { data, error } = await supabaseServer.from("packages").insert(body).select().single()

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
