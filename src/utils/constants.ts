const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const USER = 'USER';

const MOBILE_BREAKPOINT = 640;

const ENDPOINTS = {
  users: '/v1/user',
  login: '/v1/auth/login',
  register: '/v1/auth/register',
  refresh: '/v1/auth/refresh',
  validateEmail: '/v1/auth/validate-email',
};

const ERROR_CODES = {
  accessTokenExpired: 'BAD_ACCESS_TOKEN',
};

const constants = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
  MOBILE_BREAKPOINT,
  ENDPOINTS,
  ERROR_CODES,
};

export default constants;
