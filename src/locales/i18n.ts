import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "src/locales/en/translation.json";
import translationKO from "src/locales/ko/translation.json";

const resources = {
  en: {
    translation: translationEN
  },
  ko: {
    translation: translationKO
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
    fallbackLng: "ko", // 번역 파일에서 찾을 수 없는 경우 기본 언어
    interpolation: {
      escapeValue: false // react는 xss 보호를 제공하므로 설정이 필요없다.
    }
  });

export default i18n;