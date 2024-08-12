import axios, { AxiosError } from 'axios';
import constants from './constants';
import {
  clearCredentials,
  getAccessToken,
  getRefreshToken,
  userHasSelectedRemberme,
} from './credentials';

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

async function updateTokenOnRejection(error: AxiosError) {
  if (
    !error.response ||
    !error.config ||
    error.response.status !== 403 ||
    error.config.url === constants.ENDPOINTS.refresh ||
    (error.response.data as { error: string; message: string }).error !==
      constants.ERROR_CODES.accessTokenExpired
  )
    return Promise.reject(error);

  let accessToken: string;
  try {
    const refreshResponse = await request.post(
      constants.ENDPOINTS.refresh,
      {},
      { headers: { Authorization: `Bearer ${getRefreshToken()}` } },
    );
    if (!refreshResponse.data?.data?.accessToken)
      throw new Error('Access token not received');

    accessToken = refreshResponse.data?.data?.accessToken;
  } catch (e) {
    clearCredentials();
    window.location.replace('/login');
    return Promise.reject(error);
  }

  if (userHasSelectedRemberme()) {
    localStorage.setItem(constants.ACCESS_TOKEN, accessToken);
  } else {
    sessionStorage.setItem(constants.ACCESS_TOKEN, accessToken);
  }
  request.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return request(error.config);
}

request.interceptors.response.use(response => response, updateTokenOnRejection);
