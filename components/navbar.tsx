'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './language-selector';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const pathname = usePathname();
  const { currentLanguage, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLanguageOpen) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLanguageOpen]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  ];

  const navLinks = [
    { path: '/', label: t('Home') },
    { path: '/about', label: t('About') },
    { path: '/destinations', label: t('Destinations') },
    { path: '/packages', label: t('Tours') },
    { path: '/activities', label: t('Activities') },
    { path: '/blog', label: t('Blog') },
    { path: '/contact', label: t('Contact') },
  ];

  const isHomePage = pathname === '/';

  const getNavbarClasses = () => {
    if (isScrolled) {
      return 'bg-white/95 backdrop-blur-xl shadow-soft-lg border-b border-emerald-100/50';
    }
    if (isHomePage) {
      return 'bg-transparent';
    }
    return 'bg-white/95 backdrop-blur-xl shadow-soft-lg border-b border-emerald-100/50';
  };

  const getTextColor = (isActive: boolean) => {
    if (isScrolled || !isHomePage) {
      return isActive ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600';
    }
    return isActive ? 'text-emerald-300' : 'text-white hover:text-emerald-300';
  };

  const getLogoTextColor = () => {
    if (isScrolled || !isHomePage) {
      return 'text-gray-900';
    }
    return 'text-white drop-shadow-text';
  };

  const getLogoSubtextColor = () => {
    if (isScrolled || !isHomePage) {
      return 'text-emerald-600';
    }
    return 'text-emerald-300';
  };

  const getMobileButtonColor = () => {
    if (isScrolled || !isHomePage) {
      return 'text-gray-900 hover:bg-emerald-50';
    }
    return 'text-white hover:bg-white/10';
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsLanguageOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${getNavbarClasses()}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group ml-3">
            <div className="relative">
              <Compass className="h-8 w-8 text-emerald-600 group-hover:rotate-180 transition-transform duration-500 drop-shadow-glow" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3" style={{ color: '#FFD700' }} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl lg:text-2xl font-bold transition-all duration-300 ${getLogoTextColor()}`}>Planet Holiday</span>
              <span className={`text-xs font-medium tracking-wider ${getLogoSubtextColor()}`}>{t('DISCOVER SRILANKA')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative font-medium transition-all duration-300 hover:scale-105 group ${getTextColor(pathname === link.path)}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full ${
                  pathname === link.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            {/* Language Switcher */}
            <LanguageSelector />
            {/* Enhanced CTA Button */}
            <Link
              href="/contact"
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="relative z-10">{t('bookNow')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-0 group-hover:opacity-30" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${getMobileButtonColor()}`}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass-effect rounded-2xl mt-4 shadow-soft-lg border border-white/20 overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                    pathname === link.path
                      ? 'text-emerald-600 bg-emerald-50/80 shadow-inner-glow'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Language Switcher */}
              <div className="px-4 py-3">
                <div className="text-sm font-medium text-gray-600 mb-2">Language</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block mx-3 mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl text-center font-medium shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {t('Book Now')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;