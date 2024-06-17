const API_PREFIX_ADMIN = "/admin";
const API_PREFIX_COMMON = "/common";

// auth
const LOGIN_URL = '/auth/sign-in';
const LOGOUT_URL = '/auth/sign-out';
const SESSION_URL = '/session';

// dashboard
const EXTERNAL_URL = "/external";

// introduction
const INTRODUCTION_URL = "/introduction";
const NOTICE_URL = '/notice';

// others
const OTHERS_URL = "/others";
const WEB_SITE_URL = '/web-site';

const URL_INFO = {
  // PAGE 정의
  PAGE: {
    NOTICE: INTRODUCTION_URL + NOTICE_URL,
    WEB_SITE_URL: OTHERS_URL + WEB_SITE_URL
  },

  // API URL 정의
  API_V1: {
    // auth
    LOGIN_URL: LOGIN_URL,
    LOGOUT_URL: LOGOUT_URL,
    SESSION_URL: SESSION_URL,

    // dashboard
    EXTERNAL: API_PREFIX_COMMON + EXTERNAL_URL,

    // introduction
    NOTICE: API_PREFIX_COMMON + NOTICE_URL,
    ADMIN_NOTICE: API_PREFIX_ADMIN + NOTICE_URL,

    // others
    WEB_SITE: API_PREFIX_COMMON + WEB_SITE_URL,
    ADMIN_WEB_SITE: API_PREFIX_ADMIN + WEB_SITE_URL
  },

  // 외부 URL
  EXTERNAL: {
    // weather
    OPEN_WEATHER_IMAGE: "https://openweathermap.org/img/wn/"
  }
};

export default URL_INFO;
