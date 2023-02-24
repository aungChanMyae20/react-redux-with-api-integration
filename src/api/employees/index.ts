import { axiosInstance } from "..";
import { ListProps } from "../../interfaces/commons";
import { EmployeeProps } from "../../interfaces/employee";

const getAllEmployees = ({ size, page }:ListProps) => {
  return axiosInstance.get(`/users?size=${size}&page=${page}`);
}

const createNewEmployee = (values: EmployeeProps) => {
  return axiosInstance.post('/users/new', values);
}

const updateEmployee = (values: EmployeeProps) => {
  return axiosInstance.post('/users/update', values);
}

const removeEmployee = (id: string) => {
  return axiosInstance.delete(`/users/remove?id=${id}`);
}

const EmployeesService = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  removeEmployee
}

export default EmployeesService;