import { authAxiosInstance } from '..';
import { LoginProps } from "../../interfaces/auth";

const login = (data: LoginProps) => {
  return authAxiosInstance.post('/login', data);
}

const AuthService = {
  login
};

export default AuthService;