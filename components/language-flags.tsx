'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Flag from 'react-world-flags';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

type GoogleTranslateElementType = {
  select: () => void;
  setLanguage: (lang: string) => void;
};

const languages = [
  { code: 'en', name: 'English', countryCode: 'GB' },
  { code: 'de', name: 'German', countryCode: 'DE' },
  { code: 'fr', name: 'French', countryCode: 'FR' },
  { code: 'pl', name: 'Polish', countryCode: 'PL' },
  { code: 'ru', name: 'Russian', countryCode: 'RU' },
  { code: 'tr', name: 'Turkish', countryCode: 'TR' },
  { code: 'it', name: 'Italian', countryCode: 'IT' },
  { code: 'zh', name: 'Chinese', countryCode: 'CN' },
  { code: 'ja', name: 'Japanese', countryCode: 'JP' },
];

export default function LanguageFlags() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Prevent duplicate injection
    if (window.google && window.google.translate) {
      setIsScriptLoaded(true);
      return;
    }

    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: languages.map(lang => lang.code).join(','),
              layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
              multilanguagePage: true,
              autoDisplay: false,
            },
            'google_translate_element'
          );
          setIsScriptLoaded(true);
        }
      } catch (e) {
        console.error('Google translate init error', e);
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.id = 'google-translate-script';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      // Do not remove script to avoid re-inject loops; just noop the init
      (window as any).googleTranslateElementInit = undefined;
    };
  }, []);

  return (
    <section className="py-6 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hidden md:block">Choose Your Language</h2>
          <p className="text-gray-600 hidden md:block">Select your preferred language to translate the website</p>
        </div>
        
        <div className="flex md:grid md:grid-cols-4 lg:grid-cols-9 gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 justify-start md:justify-items-center">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 md:flex-shrink flex items-center md:flex-col p-2 md:p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300"
              onClick={() => {
                try {
                  // Try to find the Google Translate dropdown
                  const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
                  if (iframe) {
                    const selectElement = iframe.contentWindow?.document.querySelector('.goog-te-combo') as HTMLSelectElement;
                    if (selectElement) {
                      selectElement.value = lang.code;
                      selectElement.dispatchEvent(new Event('change'));
                      return;
                    }
                  }

                  // Fallback: try to find dropdown directly
                  const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                  if (selectElement) {
                    selectElement.value = lang.code;
                    selectElement.dispatchEvent(new Event('change'));
                  }

                  // Second fallback: use doGTranslate function
                  const doGTranslate = (window as any).doGTranslate;
                  if (typeof doGTranslate === 'function') {
                    doGTranslate('en|' + lang.code);
                  }
                } catch (error) {
                  console.error('Translation error:', error);
                }
              }}
            >
              <div className="w-8 h-6 md:w-12 md:h-8 overflow-hidden rounded shadow-sm">
                <Flag
                  code={lang.countryCode}
                  className="w-full h-full object-cover"
                  alt={`${lang.name} flag`}
                />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 mt-2">{lang.name}</span>
            </motion.button>
          ))}
        </div>

        <div 
          id="google_translate_element" 
          className="opacity-0 h-0 overflow-hidden"
          style={{ position: 'fixed', top: '-9999px', left: '-9999px' }}
        />
      </div>
    </section>
  );
}
