import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ABOUT_EN from './locales/en-us/about.json';
import HOME_EN from './locales/en-us/home.json';
import ABOUT_PT from './locales/pt-br/about.json';
import HOME_PT from './locales/pt-br/home.json';
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    about: ABOUT_EN,
    home: HOME_EN
  },
  fr: {},
  ptBr: {
    about: ABOUT_PT,
    home: HOME_PT
  }
};

i18n
.use(I18nextBrowserLanguageDetector)
.use(initReactI18next)
.init({
  resources: resources,
  fallbackLng: 'ptBr',
  debug: true
});

export default i18n;
