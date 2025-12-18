import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import fr from "~/locales/fr.json";
import en from "~/locales/en.json";
import ja from "~/locales/ja.json";

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr", "es", "de", "ja"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
    resources: {
      fr: {
        common: fr,
      },
      en: {
        common: en,
      },
      ja: {
        common: ja,
      },
    },
  });

export default i18next;
