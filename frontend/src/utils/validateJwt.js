import { jwtDecode } from 'jwt-decode';
import { JWT_TOKEN_KEY } from './constants';

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};

export const hasValidToken = () => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  return !isTokenExpired(token);
};

export const isTokenValid = (token) => {
  return !isTokenExpired(token);
};
