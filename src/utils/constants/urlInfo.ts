const API_PREFIX_ADMIN = "/admin";

// auth
const LOGIN_URL = '/auth/sign-in';
const LOGOUT_URL = '/auth/sign-out';
const SESSION_URL = '/session';

// others
const WEB_SITE_URL = '/web-site';

const URL_INFO = {
  // PAGE 정의

  // API URL 정의
  API_V1: {
    // auth
    LOGIN_URL: LOGIN_URL,
    LOGOUT_URL: LOGOUT_URL,
    SESSION_URL: SESSION_URL,

    // others
    WEB_SITE: WEB_SITE_URL,
    ADMIN_WEB_SITE: API_PREFIX_ADMIN + WEB_SITE_URL
  }
};

export default URL_INFO;
