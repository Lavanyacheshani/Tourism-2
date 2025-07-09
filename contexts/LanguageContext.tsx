"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: (locale: string) => void
  t: (key: string) => string
  languages: { code: string; name: string; flag: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
]

// Translation data
const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.packages": "Tour Packages",
    "nav.activities": "Activities",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.bookNow": "Book Now",
    "hero.title1": "Discover Sri Lanka",
    "hero.subtitle1": "Experience breathtaking landscapes, rich culture, and warm hospitality",
    "hero.accent1": "The Pearl of the Indian Ocean awaits",
    "hero.title2": "Ancient Wonders",
    "hero.subtitle2": "Explore centuries-old temples and cultural heritage",
    "hero.accent2": "Where history comes alive",
    "hero.title3": "Wild Adventures",
    "hero.subtitle3": "Encounter exotic wildlife in pristine national parks",
    "hero.accent3": "Nature's greatest spectacle",
    "hero.exploreTours": "Explore Tours",
    "hero.watchVideo": "Watch Video",
    "hero.scrollDown": "Scroll Down",
    "hero.stats.travelers": "Happy Travelers",
    "hero.stats.rating": "Average Rating",
    "hero.stats.experience": "Years Experience",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.destinations": "Destinations",
    "nav.packages": "Circuits",
    "nav.activities": "Activités",
    "nav.blog": "Blog",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.bookNow": "Réserver",
    "hero.title1": "Découvrez le Sri Lanka",
    "hero.subtitle1": "Vivez des paysages à couper le souffle, une culture riche et une hospitalité chaleureuse",
    "hero.accent1": "La Perle de l'Océan Indien vous attend",
    "hero.title2": "Merveilles Antiques",
    "hero.subtitle2": "Explorez des temples séculaires et un patrimoine culturel",
    "hero.accent2": "Où l'histoire prend vie",
    "hero.title3": "Aventures Sauvages",
    "hero.subtitle3": "Rencontrez une faune exotique dans des parcs nationaux préservés",
    "hero.accent3": "Le plus grand spectacle de la nature",
    "hero.exploreTours": "Explorer les Circuits",
    "hero.watchVideo": "Regarder la Vidéo",
    "hero.scrollDown": "Faire Défiler",
    "hero.stats.travelers": "Voyageurs Satisfaits",
    "hero.stats.rating": "Note Moyenne",
    "hero.stats.experience": "Années d'Expérience",
  },
  de: {
    "nav.home": "Startseite",
    "nav.destinations": "Reiseziele",
    "nav.packages": "Reisepakete",
    "nav.activities": "Aktivitäten",
    "nav.blog": "Blog",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "nav.bookNow": "Jetzt Buchen",
    "hero.title1": "Entdecken Sie Sri Lanka",
    "hero.subtitle1": "Erleben Sie atemberaubende Landschaften, reiche Kultur und herzliche Gastfreundschaft",
    "hero.accent1": "Die Perle des Indischen Ozeans wartet",
    "hero.title2": "Antike Wunder",
    "hero.subtitle2": "Erkunden Sie jahrhundertealte Tempel und kulturelles Erbe",
    "hero.accent2": "Wo Geschichte lebendig wird",
    "hero.title3": "Wilde Abenteuer",
    "hero.subtitle3": "Begegnen Sie exotischer Tierwelt in unberührten Nationalparks",
    "hero.accent3": "Das größte Spektakel der Natur",
    "hero.exploreTours": "Touren Erkunden",
    "hero.watchVideo": "Video Ansehen",
    "hero.scrollDown": "Nach Unten Scrollen",
    "hero.stats.travelers": "Zufriedene Reisende",
    "hero.stats.rating": "Durchschnittsbewertung",
    "hero.stats.experience": "Jahre Erfahrung",
  },
  pl: {
    "nav.home": "Strona Główna",
    "nav.destinations": "Destynacje",
    "nav.packages": "Pakiety Turystyczne",
    "nav.activities": "Aktywności",
    "nav.blog": "Blog",
    "nav.about": "O nas",
    "nav.contact": "Kontakt",
    "nav.bookNow": "Zarezerwuj Teraz",
    "hero.title1": "Odkryj Sri Lankę",
    "hero.subtitle1": "Doświadcz zapierających dech krajobrazów, bogatej kultury i ciepłej gościnności",
    "hero.accent1": "Perła Oceanu Indyjskiego czeka",
    "hero.title2": "Starożytne Cuda",
    "hero.subtitle2": "Odkryj wielowiekowe świątynie i dziedzictwo kulturowe",
    "hero.accent2": "Gdzie historia ożywa",
    "hero.title3": "Dzikie Przygody",
    "hero.subtitle3": "Spotkaj egzotyczną przyrodę w dziewiczych parkach narodowych",
    "hero.accent3": "Największy spektakl natury",
    "hero.exploreTours": "Odkryj Wycieczki",
    "hero.watchVideo": "Obejrzyj Wideo",
    "hero.scrollDown": "Przewiń w Dół",
    "hero.stats.travelers": "Zadowoleni Podróżnicy",
    "hero.stats.rating": "Średnia Ocena",
    "hero.stats.experience": "Lat Doświadczenia",
  },
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (locale: string) => {
    setCurrentLanguage(locale)
    localStorage.setItem("language", locale)
  }

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t,
    languages,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
