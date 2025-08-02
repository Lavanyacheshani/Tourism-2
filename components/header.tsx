'use client'

import React, { useEffect, useState } from "react";
import { Play, Sparkles, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playVideo, setPlayVideo] = useState(false); // New state
  const { t } = useLanguage();

  const slides = [
    {
      image: "/hero/1.jpg",
      title: "Welcome to Planet Holiday",
      subtitle: "Discover Sri Lanka's beauty and adventure",
      accent: "The Pearl of the Indian Ocean awaits",
    },
    {
      image: "/hero/2.jpg",
      title: "Ancient Wonders",
      subtitle: "Explore centuries-old temples and cultural heritage",
      accent: "Where history comes alive",
    },
    {
      image: "/hero/3.jpg",
      title: "Wild Adventures",
      subtitle: "Encounter exotic wildlife in pristine national parks",
      accent: "Nature's greatest spectacle",
    },
  ];

  useEffect(() => {
    if (!playVideo) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides.length, playVideo]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background: Either video or image slides */}
      {playVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/hero/1.mp4"
        />
      ) : (
        slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 animate-parallax"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-sapphire-900/20" />
          </div>
        ))
      )}

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            <Sparkles
              className="w-2 h-2 text-white"
              style={{
                filter: `hue-rotate(${Math.random() * 120}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full animate-float-delayed blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-sapphire-400/10 to-ceylon-400/10 rounded-full animate-float blur-2xl" />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-gradient-to-br from-lotus-400/10 to-ruby-400/10 rounded-full animate-bounce-gentle blur-lg" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-2 sm:px-4 max-w-xs sm:max-w-2xl lg:max-w-6xl mx-auto">
          {/* Accent Text */}
          <div className="mb-4 animate-fade-in-down">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white/90">
              <MapPin className="w-4 h-4" />
              {playVideo ? "Discover Planet Holiday" : slides[currentSlide].accent}
            </span>
          </div>

          {/* Title */}
          <h1 className="heading-primary text-3xl sm:text-5xl lg:text-9xl mb-4 sm:mb-6 animate-fade-in-up break-words">
            {playVideo ? "Your Adventure Starts Here" : slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-xl lg:text-2xl mb-8 sm:mb-12 animate-fade-in-up opacity-90 font-light max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            {playVideo
              ? "Experience Sri Lanka like never before through vibrant visuals."
              : slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-sapphire-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500"
            >
              <span className="relative z-10">{t("Explore Tours")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-sapphire-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            <motion.button
              onClick={() => setPlayVideo(true)}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 glass-effect text-white px-10 py-4 rounded-full text-lg font-semibold border border-white/30 hover:bg-white/20 transition-all duration-500"
            >
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>{t("Watch Video")}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {!playVideo && (
        <div className="absolute bottom-16 sm:bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative overflow-hidden transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-glow"
                  : "w-3 h-3 bg-white/30 hover:bg-white/50"
              } rounded-full`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 animate-shimmer" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-gentle cursor-pointer hover:text-emerald-300 transition-colors duration-300 group"
      >
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm font-medium opacity-80 group-hover:opacity-100">
            Scroll Down
          </span>
          <div className="w-6 sm:w-8 h-8 sm:h-12 border-2 border-white/50 rounded-full flex justify-center group-hover:border-emerald-300">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-bounce group-hover:bg-emerald-300" />
          </div>
        </div>
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 animate-rotate-slow opacity-20 hidden sm:block">
        <div className="w-16 h-16 sm:w-32 sm:h-32 border border-white/30 rounded-full" />
      </div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 animate-wave opacity-20 hidden sm:block">
        <div className="w-12 h-12 sm:w-24 sm:h-24 border-2 border-white/30 rotate-45" />
      </div>
    </motion.section>
  );
};

export default Header;
