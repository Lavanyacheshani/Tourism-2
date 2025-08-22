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
      <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
              Meet Our Team
            </h2>
            <div className="flex justify-center">
              <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mb-6 animate-grow-in"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: 'Jaan Gunasekara',
                role: 'Founder & CEO',
                image: '/about/a.jpeg',
                bio: (
                  <>
                    Our master storyteller who brings Sri Lankan history and culture to life with every tour.<br />
                  </>
                ),
              },
              {
                name: 'Malik Tariq',
                role: 'Head of Operations - Asian Region',
                image: '/about/malik.jpeg',
                bio: (
                  <>
                    Leading operations across Pakistan, Russia, Kazakhstan, Turkey, Georgia and other Asian countries.<br />
                    <span className="font-semibold text-gray-700">Email:</span> <a href="mailto:pakcaspian@gmail.com" className="text-emerald-600 underline">pakcaspian@gmail.com</a><br />
                    <span className="font-semibold text-gray-700">Mobile:</span> <a href="tel:+923335704520" className="text-emerald-600 underline">+92 333 5704520</a>
                  </>
                ),
              },
              {
                name: 'Marta Szatten',
                role: 'Head of Operations - European Region',
                image: '/about/marta.jpeg',
                bio: (
                  <>
                    Managing operations throughout Poland, Germany, Italy and all EU countries.<br />
                    <span className="font-semibold text-gray-700">Email:</span> <a href="mailto:martaszatten@o2.pl" className="text-emerald-600 underline">martaszatten@o2.pl</a><br />
                    <span className="font-semibold text-gray-700">Mobile:</span> <a href="tel:+48505073713" className="text-emerald-600 underline">+48 505 073 713</a>
                  </>
                ),
              }
            ].map((member, index) => (
              <div
                key={index}
                className="text-center animate-scale-in bg-white/90 rounded-3xl shadow-xl p-10 hover:shadow-emerald-200 transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-8 flex justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-emerald-100"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
