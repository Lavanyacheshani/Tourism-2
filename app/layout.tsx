import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AdminAuthProvider } from "@/contexts/AdminAuthContext"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Planet Holiday - Discover Sri Lanka",
  description:
    "Explore the beautiful island of Sri Lanka with our curated travel packages and experiences.",
  icons: {
    icon: "/favicon.ico", // favicon in /public folder
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : ""

  return (
    <html lang="en">
      <head>
        {/* fallback link for browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <AdminAuthProvider>
          <LanguageProvider>
            <Navbar />
            {pathname === "/" && <Header />}
            <main>{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
