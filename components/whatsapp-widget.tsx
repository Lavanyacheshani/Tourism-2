"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappNumber = "+94771234567" // Replace with actual WhatsApp number
  const message = encodeURIComponent("Hi! I'm interested in your Sri Lanka tour packages. Can you help me?")

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* WhatsApp Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-2xl border w-80 max-w-[calc(100vw-3rem)]">
          <div className="bg-green-500 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat with us on WhatsApp</h3>
            <p className="text-sm opacity-90">We're here to help you plan your perfect Sri Lankan adventure!</p>
          </div>
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">👋 Hello! How can we help you today?</p>
            </div>
            <Button onClick={openWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
