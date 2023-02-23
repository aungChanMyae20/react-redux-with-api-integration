import axios from 'axios';
import { decryptUserInfo } from '../helper/utils';
// import { AnyAction } from '@reduxjs/toolkit';

const configuration = {
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(configuration);
const authAxiosInstance = axios.create(configuration);

const getToken = () => {
  const authInfo = decryptUserInfo();
  return `Bearer ${authInfo?.token}`;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  }
);

axiosInstance.interceptors.response.use(
  undefined,
  (error) => {
    return Promise.reject(error);
  }
);

export {
  authAxiosInstance,
  axiosInstance
}