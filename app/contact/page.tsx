"use client"

import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const featuredDestinations = [
  "Sigiriya Rock Fortress",
  "Kandy Temple of Tooth",
  "Yala National Park",
  "Galle Fort",
  "Ella Nine Arches Bridge",
  "Mirissa Beach",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourInterest: "",
    travelDates: "",
    groupSize: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const destination = params.get('destination');
      const price = params.get('price');
      const duration = params.get('duration');
      let prefillMessage = formData.message;
      if (destination) {
        prefillMessage = `Hello, I would like to book the "${destination}" tour`;
        if (price) prefillMessage += ` (Price: $${price})`;
        if (duration) prefillMessage += ` for ${duration}`;
        prefillMessage += ". Please provide more details.";
      }
      setFormData((prev) => ({
        ...prev,
        tourInterest: destination || prev.tourInterest,
        message: prefillMessage,
      }));
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        tourInterest: "",
        travelDates: "",
        groupSize: "",
        message: "",
      });
    }, 3000);
  };

  const tourOptions = [
    ...featuredDestinations,
    "Cultural Triangle Explorer",
    "Beach & Wildlife Adventure",
    "Hill Country Escape",
    "Luxury Ceylon Experience",
    "Adventure Seeker Special",
    "Family Fun Package",
    "Custom Tour Package",
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-yellow-100 via-teal-100 to-blue-100 animate-gradient-x">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 animate-slide-up text-teal-800 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto animate-slide-up text-teal-700">
              Ready to start your Sri Lankan adventure? Get in touch and let's
              plan your perfect journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left bg-white/90 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tourInterest"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tour Interest
                      </label>
                      <select
                        id="tourInterest"
                        name="tourInterest"
                        value={formData.tourInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                      >
                        <option value="">Select a tour package</option>
                        {tourOptions.map((tour) => (
                          <option key={tour} value={tour}>
                            {tour}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="travelDates"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Travel Dates
                      </label>
                      <input
                        type="text"
                        id="travelDates"
                        name="travelDates"
                        value={formData.travelDates}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                        placeholder="e.g., March 2024"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="groupSize"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Group Size
                      </label>
                      <select
                        id="groupSize"
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300"
                      >
                        <option value="">Select group size</option>
                        <option value="1">Solo Traveler</option>
                        <option value="2">Couple</option>
                        <option value="3-5">Small Group (3-5)</option>
                        <option value="6-10">Medium Group (6-10)</option>
                        <option value="10+">Large Group (10+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-300 resize-none"
                      placeholder="Tell us about your dream Sri Lankan adventure..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for your interest. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="animate-slide-in-right bg-white/90 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-yellow-200 via-teal-100 to-blue-100 p-3 rounded-full shadow">
                    <MapPin className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Office Address
                    </h4>
                    <p className="text-gray-600">
                      123 Galle Road
                      <br />
                      Colombo 03, Sri Lanka
                      <br />
                      10300
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-yellow-200 via-teal-100 to-blue-100 p-3 rounded-full shadow">
                    <Phone className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Phone Numbers
                    </h4>
                    <p className="text-gray-600">
                      Primary: +94 77 123 4567
                      <br />
                      Secondary: +94 11 234 5678
                      <br />
                      WhatsApp: +94 77 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-yellow-200 via-teal-100 to-blue-100 p-3 rounded-full shadow">
                    <Mail className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Email Addresses
                    </h4>
                    <p className="text-gray-600">
                      General: info@planethoday.lk
                      <br />
                      Bookings: bookings@planethoday.lk
                      <br />
                      Support: support@planethoday.lk
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-yellow-200 via-teal-100 to-blue-100 p-3 rounded-full shadow">
                    <Clock className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Office Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 4:00 PM
                      <br />
                      Sunday: Emergency only
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gradient-to-br from-blue-100 via-teal-100 to-yellow-100 rounded-lg h-64 flex items-center justify-center shadow-inner">
                <p className="text-teal-600 font-medium">Interactive Map Coming Soon</p>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-6 bg-gradient-to-br from-yellow-100 via-teal-50 to-blue-50 rounded-lg shadow">
                <h4 className="font-semibold text-teal-800 mb-4">
                  Need Immediate Assistance?
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+94771234567"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-blue-400 text-white py-3 px-4 rounded-lg text-center font-medium hover:from-teal-600 hover:to-blue-500 transition-colors duration-300 shadow"
                  >
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/94771234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-green-400 to-teal-400 text-white py-3 px-4 rounded-lg text-center font-medium hover:from-green-500 hover:to-teal-500 transition-colors duration-300 shadow"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about traveling to Sri Lanka
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Do I need a visa to visit Sri Lanka?",
                answer:
                  "Most visitors need an Electronic Travel Authorization (ETA) or visa. We can help you with the application process and requirements based on your nationality.",
              },
              {
                question: "What is the best time to visit Sri Lanka?",
                answer:
                  "Sri Lanka can be visited year-round, but the best time depends on which regions you want to explore. December to March is ideal for the west and south coasts, while April to September is perfect for the east coast.",
              },
              {
                question: "Are your tours suitable for families with children?",
                answer:
                  "Absolutely! We offer family-friendly packages and can customize tours to accommodate children of all ages. Our guides are experienced in working with families.",
              },
              {
                question: "What is included in your tour packages?",
                answer:
                  "Our packages typically include accommodation, meals as specified, transportation, entrance fees, and professional guide services. Specific inclusions vary by package.",
              },
              {
                question: "Can you arrange custom itineraries?",
                answer:
                  "Yes! We specialize in creating personalized experiences based on your interests, budget, and timeframe. Contact us to discuss your dream Sri Lankan adventure.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <summary className="p-6 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-300">
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
