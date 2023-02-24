import { axiosInstance } from "..";

const getDecadeReports = () => {
  return axiosInstance.get(`/users/decade-reports`);
}

const ReportsServices = {
  getDecadeReports,
}

export default ReportsServices;