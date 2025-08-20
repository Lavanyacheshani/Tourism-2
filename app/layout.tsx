import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AdminAuthProvider } from "@/contexts/AdminAuthContext"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Planet Holiday - Discover Sri Lanka",
  description: "Explore the beautiful island of Sri Lanka with our curated travel packages and experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <AdminAuthProvider>
          <LanguageProvider>
            <Navbar />
            {pathname === '/' && <Header />}
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
