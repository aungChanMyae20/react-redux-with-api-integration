import { axiosInstance } from "..";

const getUserInfo = (id: string) => {
  return axiosInstance.get(`/users/user?id=${id}`);
}

const UserService = {
  getUserInfo
};

export default UserService;