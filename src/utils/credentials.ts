import { User } from 'types';
import constants from './constants';

export const saveCredentials = (
  accessToken: string,
  refreshToken: string,
  user: User,
  rememberMe?: boolean,
) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(constants.ACCESS_TOKEN, accessToken);
  storage.setItem(constants.REFRESH_TOKEN, refreshToken);
  storage.setItem(constants.USER, JSON.stringify(user));
};

export const clearCredentials = () => {
  localStorage.removeItem(constants.ACCESS_TOKEN);
  localStorage.removeItem(constants.REFRESH_TOKEN);
  localStorage.removeItem(constants.USER);

  sessionStorage.removeItem(constants.ACCESS_TOKEN);
  sessionStorage.removeItem(constants.REFRESH_TOKEN);
  sessionStorage.removeItem(constants.USER);
};

export const getUser = () => {
  if (
    !sessionStorage.getItem(constants.USER) &&
    !localStorage.getItem(constants.USER)
  )
    return undefined;
  try {
    return JSON.parse(
      sessionStorage.getItem(constants.USER) ??
        localStorage.getItem(constants.USER) ??
        '{}',
    ) as User;
  } catch (e) {
    return undefined;
  }
};

export const getAccessToken = () =>
  sessionStorage.getItem(constants.ACCESS_TOKEN) ??
  localStorage.getItem(constants.ACCESS_TOKEN) ??
  undefined;

export const getRefreshToken = () =>
  sessionStorage.getItem(constants.REFRESH_TOKEN) ??
  localStorage.getItem(constants.REFRESH_TOKEN) ??
  undefined;
