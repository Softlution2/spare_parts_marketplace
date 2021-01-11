import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en.json";
import translationZH from "./locales/zh.json";
import translationAR from "./locales/ar.json";
import translationFR from "./locales/fr.json";

const fallbackLng = ["en"];
const availableLanguages = ["en", "zh", "ar", "fr", "pt", "sw"];

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  },
  ar: {
    translation: translationAR
  },
  fr: {
    translation: translationFR
  },
  pt: {
    translation: translationFR
  },
  sw: {
    translation: translationFR
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
