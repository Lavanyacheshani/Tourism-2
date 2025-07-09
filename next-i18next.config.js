module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "de", "pl"],
    localeDetection: true,
  },
  fallbackLng: {
    default: ["en"],
  },
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
