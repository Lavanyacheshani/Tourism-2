"use client";
import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/60">
      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-white via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/80 rounded-3xl shadow-xl p-10 md:p-16">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-emerald-700 mb-6 tracking-tight">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2015, Planet Holiday emerged from a passion for sharing Sri Lanka's incredible beauty with the world. What started as a small family business has grown into the island's premier tour operator, but we've never lost sight of our core values: authentic experiences, personal service, and sustainable tourism.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Every journey we craft tells a story – of ancient kingdoms and modern adventures, of pristine beaches and misty mountains, of warm smiles and unforgettable moments. We don't just show you Sri Lanka; we help you feel its heartbeat.
              </p>
              <div className="flex gap-6">
                <div className="flex-1 text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-md">
                  <div className="text-3xl font-extrabold text-emerald-600 mb-1">10,000+</div>
                  <div className="text-sm text-gray-500">Happy Travelers</div>
                </div>
                <div className="flex-1 text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-md">
                  <div className="text-3xl font-extrabold text-emerald-600 mb-1">9 Years</div>
                  <div className="text-sm text-gray-500">Of Excellence</div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right flex justify-center">
              <img
                src="/contact/1.jpg"
                alt="About Us"
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-emerald-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
              Why Choose Us
            </h2>
            <div className="flex justify-center">
              <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mb-6 animate-grow-in"></span>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium animate-fade-in-up mb-2">
              <span className="bg-white/70 px-3 py-1 rounded-xl shadow-sm">We're not just another tour company. Here's what makes us different.</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center hover:shadow-emerald-200 transition-shadow duration-300 animate-scale-in">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Born and raised in Sri Lanka, we know every hidden gem and secret spot
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center hover:shadow-emerald-200 transition-shadow duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Award Winning</h3>
              <p className="text-gray-600">
                Recognized for excellence in sustainable tourism and customer service
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center hover:shadow-emerald-200 transition-shadow duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Travel</h3>
              <p className="text-gray-600">
                Committed to preserving Sri Lanka's natural beauty for future generations
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center hover:shadow-emerald-200 transition-shadow duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Touch</h3>
              <p className="text-gray-600">
                Every tour is personalized to create memories that last a lifetime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind your perfect Sri Lankan adventure
            </p>
          </div>

          {/* Team Member */}
          <div className="flex justify-center">
            <motion.div
              className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-md w-full transform hover:scale-105 transition-all duration-500"
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="relative">
                <img
                  src="/about/a.jpeg"
                  alt="Jaan Gunasekara"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Jaan Gunasekara</h3>
                <p className="text-emerald-600 font-semibold mb-4">Founder & CEO</p>
                <p className="text-gray-600 leading-relaxed">
                  Our master storyteller who brings Sri Lankan history and culture to life with every tour.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default About;
