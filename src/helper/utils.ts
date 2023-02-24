import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
// import jwtDecode from 'jwt-decode';
// import dayjs from 'dayjs';
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// import utc from 'dayjs/plugin/utc';

import { KEY } from '../helper/consts';

// encrypt user info
export const encryptUserInfo = (token: string) => {
  const authDataForLocalStorage = AES.encrypt(JSON.stringify(token), KEY);
  localStorage.setItem('auth', authDataForLocalStorage.toString());
};

// decrypt user info
export const decryptUserInfo = () => {
  const authData = localStorage.getItem('auth')?.toString();
  if (authData) {
    const decryptedAuthData = AES.decrypt(authData, KEY);
    return JSON.parse(decryptedAuthData?.toString(CryptoJS.enc.Utf8));
  }
  return null;
};

// Check if token is alive
// export const isAuthExpired = () => {
//   const authInfo = decryptUserInfo();
//   const expiresAt: any = authInfo?.token ? jwtDecode(authInfo?.token) : null;

//   return dayjs.utc().isSameOrAfter(dayjs.unix(expiresAt?.exp));
// };