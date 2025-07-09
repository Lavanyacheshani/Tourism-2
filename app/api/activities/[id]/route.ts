import { type Request, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

type Params = { params: { id: string } }

// GET one activity
export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = params
    const { data, error } = await supabaseServer.from("activities").select("*").eq("id", id).single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// PUT – update activity
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params
    const body = await request.json()

    const { data, error } = await supabaseServer.from("activities").update(body).eq("id", id).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// DELETE activity
export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = params
    const { error } = await supabaseServer.from("activities").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
