import { useEffect } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
];

export default function LanguageSelector() {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(lang => lang.code).join(','),
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    addScript();
  }, []);

  return (
    <div className="relative group">
      <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors duration-300">
        <Globe className="h-5 w-5 text-emerald-400" />
        <span className="text-sm text-black">Select Language</span>
      </div>
      <div id="google_translate_element" className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-lg rounded-lg p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}