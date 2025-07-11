"use client";

import React, { useState } from 'react';
import { Calendar, Users, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

interface Tour {
  id: number;
  title: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  highlights: string[];
  included: string[];
  category: string;
}

const TourPackages: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tours: Tour[] = [
    {
      id: 1,
      title: 'Cultural Triangle Explorer',
      image: '/tour/kandydance.jpg',
      duration: '7 Days / 6 Nights',
      rating: 4.9,
      reviews: 234,
      highlights: ['Sigiriya Rock Fortress', 'Anuradhapura Ancient City', 'Dambulla Cave Temple', 'Polonnaruwa Ruins'],
      included: ['Accommodation', 'Meals', 'Transport', 'Guide'],
      category: 'cultural',
    },
    {
      id: 2,
      title: 'Beach & Wildlife Adventure',
      image: '/tour/img-5.jpg',
      duration: '10 Days / 9 Nights',
      rating: 4.8,
      reviews: 189,
      highlights: ['Yala Safari', 'Mirissa Whale Watching', 'Unawatuna Beach', 'Galle Fort'],
      included: ['Luxury Accommodation', 'All Meals', 'Safari Jeep', 'Boat Tours'],
      category: 'adventure',
    },
    {
      id: 3,
      title: 'Hill Country Escape',
      image: '/tour/ella.jpg',
      duration: '5 Days / 4 Nights',
      rating: 4.7,
      reviews: 156,
      highlights: ['Ella Nine Arches', 'Tea Plantation Tours', 'Little Adam\'s Peak', 'Nuwara Eliya'],
      included: ['Boutique Hotels', 'Breakfast', 'Train Tickets', 'Tea Tasting'],
      category: 'nature',
    },
    {
      id: 4,
      title: 'Luxury Ceylon Experience',
      image: '/tour/paragliding.jpg',
      duration: '12 Days / 11 Nights',
      rating: 5.0,
      reviews: 98,
      highlights: ['Private Villa Stays', 'Helicopter Tours', 'Exclusive Experiences', 'Personal Butler'],
      included: ['5-Star Accommodation', 'All Meals', 'Private Transport', 'VIP Services'],
      category: 'luxury',
    },
    {
      id: 5,
      title: 'Adventure Seeker Special',
      image: '/tour/img-1.jpg',
      duration: '8 Days / 7 Nights',
      rating: 4.6,
      reviews: 201,
      highlights: ['White Water Rafting', 'Rock Climbing', 'Surfing Lessons', 'Zip Lining'],
      included: ['Adventure Gear', 'Safety Equipment', 'Expert Instructors', 'Accommodation'],
      category: 'adventure',
    },
    {
      id: 6,
      title: 'Family Fun Package',
      image: '/tour/group-3.jpg',
      duration: '6 Days / 5 Nights',
      rating: 4.8,
      reviews: 167,
      highlights: ['Kid-Friendly Activities', 'Elephant Orphanage', 'Beach Time', 'Cultural Shows'],
      included: ['Family Rooms', 'Child Meals', 'Activities', 'Baby Equipment'],
      category: 'family',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Tours' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'nature', label: 'Nature' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'family', label: 'Family' },
  ];

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  const toursPerSlide = 3;
  const maxSlides = Math.ceil(filteredTours.length / toursPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCurrentTours = () => {
    const startIndex = currentSlide * toursPerSlide;
    return filteredTours.slice(startIndex, startIndex + toursPerSlide);
  };

  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
            Curated Tour Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Handpicked experiences designed to showcase the very best of Sri Lanka, from cultural wonders to natural beauty.
            </p>
          </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentSlide(0);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-200 text-emerald-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Tour Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentTours().map((tour, index) => (
              <div
                key={tour.id}
                className="bg-emerald-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-emerald-700">{tour.rating}</span>
                  </div>
            </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tour.reviews} reviews</span>
            </div>
          </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-emerald-900 mb-2">Highlights</h4>
                    <div className="space-y-1">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-900">
                          <MapPin className="w-3 h-3 text-primary-600" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                      {tour.highlights.length > 3 && (
                        <div className="text-sm text-emerald-600">
                          +{tour.highlights.length - 3} more highlights
            </div>
          )}
        </div>
                </div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-full font-semibold shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-colors duration-300"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {maxSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {maxSlides > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
    </div>
    </motion.section>
  );
};

export default TourPackages;
