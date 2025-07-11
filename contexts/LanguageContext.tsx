'use client'

import React, { createContext, useContext, useState } from "react";

const defaultLanguages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
];

const LanguageContext = createContext({
  t: (key: string) => key,
  currentLanguage: "en",
  changeLanguage: (code: string) => {},
  languages: defaultLanguages,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const t = (key: string) => key; // Replace with real translation logic if needed
  const changeLanguage = (code: string) => setCurrentLanguage(code);
  return (
    <LanguageContext.Provider value={{ t, currentLanguage, changeLanguage, languages: defaultLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}; 