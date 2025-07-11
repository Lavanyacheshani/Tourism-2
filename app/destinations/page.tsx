"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Users, Camera, Loader2 } from "lucide-react"
import type { Destination } from "@/lib/supabase"
import FeaturedDestinations from "@/components/featured-destinations"

const categories = ["All", "Cultural", "Wildlife", "Adventure", "Beach"]

export default function DestinationsPage() {
  return <FeaturedDestinations showAll />
}
