const API_PREFIX_ADMIN = "/admin";
const API_PREFIX_COMMON = "/common";

// auth
const LOGIN_URL = '/auth/sign-in';
const LOGOUT_URL = '/auth/sign-out';
const SESSION_URL = '/session';

// common
const FILE_URL = '/file';

// dashboard
const EXTERNAL_URL = "/external";

// introduction
const INTRODUCTION_URL = "/introduction";
const NOTICE_URL = '/notice';

// blog
const FEED_URL = "/feed";
const BLOG_URL = "/blog";

// others
const OTHERS_URL = "/others";
const WEB_SITE_URL = '/web-site';

// my page
const LOGIN_HISTORY_URL = "/login-history";
const ACCESS_HISTORY_URL = "/access-history";

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

    // common
    FILE: API_PREFIX_COMMON + FILE_URL,

    // dashboard
    EXTERNAL: API_PREFIX_COMMON + EXTERNAL_URL,

    // introduction
    NOTICE: API_PREFIX_COMMON + NOTICE_URL,
    ADMIN_NOTICE: API_PREFIX_ADMIN + NOTICE_URL,

    // life
    FEED: API_PREFIX_COMMON + FEED_URL,
    ADMIN_FEED: API_PREFIX_ADMIN + FEED_URL,
    BLOG: API_PREFIX_COMMON + BLOG_URL,
    ADMIN_BLOG: API_PREFIX_ADMIN + BLOG_URL,

    // others
    WEB_SITE: API_PREFIX_COMMON + WEB_SITE_URL,
    ADMIN_WEB_SITE: API_PREFIX_ADMIN + WEB_SITE_URL,

    // my page
    LOGIN_HISTORY: API_PREFIX_COMMON + LOGIN_HISTORY_URL,
    ACCESS_HISTORY: API_PREFIX_COMMON + ACCESS_HISTORY_URL
  },

  // 외부 URL
  EXTERNAL: {
    // weather
    OPEN_WEATHER_IMAGE: "https://openweathermap.org/img/wn/"
  }
};

export default URL_INFO;
