import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { EmployeeProps } from "../../interfaces/employee";
import EmployeesService from "../../api/employees";
import { ListProps, PageInfoProps } from "../../interfaces/commons";
import { getDecadeReports } from "../reports/reportsSlice";

export interface EmployeesState {
  employees: EmployeeProps[]
  pageInfo: PageInfoProps
}

const initialState: EmployeesState = {
  employees: [],
  pageInfo: {
    page: 1,
    size: 10,
  }
}

export const getAllEmployees = createAsyncThunk (
  "employees/all",
  async (data:ListProps, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.getAllEmployees(data);
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const addNewEmployee = createAsyncThunk (
  "employee/new",
  async (data: EmployeeProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await EmployeesService.createNewEmployee(data);
      response.status === 200 && await dispatch(getDecadeReports())
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const updateEmployee = createAsyncThunk (
  "employee/edit",
  async (data: EmployeeProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await EmployeesService.updateEmployee(data);
      response.status === 200 && await dispatch(getDecadeReports())
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const removeEmployee = createAsyncThunk (
  "employee/remove",
  async ( id : string, { rejectWithValue, dispatch }) => {
    try {
      const response = await EmployeesService.removeEmployee(id);
      response.status === 200 && await dispatch(getDecadeReports())
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearEmployees: (state) => {
      state.employees = []
    },
  },
  extraReducers: {
    // @ts-expect-error
    [getAllEmployees.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [getAllEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees = action.payload.data;
      state.pageInfo = action.payload.pageInfo;
    },
    // @ts-expect-error
    [getAllEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // @ts-expect-error
    [addNewEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [addNewEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      // state.employees = [ ...state.employees, action.payload ]
      state.pageInfo.total = action.payload.total;
    },
    // @ts-expect-error
    [addNewEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // @ts-expect-error
    [updateEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.employees = state.employees.map((item:any) => {
        if (item.id === updated.id) {
          return updated;
        }
        return item;
      });
    },
    // @ts-expect-error
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // @ts-expect-error
    [removeEmployee.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [removeEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.pageInfo = action.payload.total
    },
    // @ts-expect-error
    [removeEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
});

export const { clearEmployees } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectPageInfo = (state: RootState) => state.employees.pageInfo;

export default employeesSlice.reducer;