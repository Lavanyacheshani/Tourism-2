import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let query = supabaseServer.from("destinations").select("*").order("created_at", { ascending: false })

    if (category && category !== "All") {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,location.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching destinations:", error)
      return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in destinations GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabaseServer.from("destinations").insert([body]).select().single()

    if (error) {
      console.error("Error creating destination:", error)
      return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in destinations POST:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
