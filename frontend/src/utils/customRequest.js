import axios from 'axios';
import { isTokenValid } from './validateJwt';
import { JWT_TOKEN_KEY } from './constants';
import { useNavigate } from 'react-router-dom';

export const useCustomRequest = () => {
  const navigate = useNavigate();

  const customRequest = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  const getToken = () => localStorage.getItem(JWT_TOKEN_KEY);

  customRequest.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (isTokenValid(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  customRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        const token = localStorage.getItem(JWT_TOKEN_KEY);

        if (!isTokenValid(token)) {
          localStorage.removeItem(JWT_TOKEN_KEY);
          navigate('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return customRequest;
};
