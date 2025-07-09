import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseAdmin.from("destinations").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching destination:", error)
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in destination GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const { data, error } = await supabaseAdmin.from("destinations").update(body).eq("id", params.id).select().single()

    if (error) {
      console.error("Error updating destination:", error)
      return NextResponse.json({ error: "Failed to update destination" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in destination PUT:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseAdmin.from("destinations").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting destination:", error)
      return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 })
    }

    return NextResponse.json({ message: "Destination deleted successfully" })
  } catch (error) {
    console.error("Error in destination DELETE:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
