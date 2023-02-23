import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { EmployeeProps } from "../../interfaces/employee";
import EmployeesService from "../../api/employees";

export interface EmployeesState {
  employees: EmployeeProps[]
}

const initialState: EmployeesState = {
  employees: [],
}

export const getAllEmployees = createAsyncThunk (
  "employees/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.getAllEmployees();
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const addNewEmployee = createAsyncThunk (
  "employee/new",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.createNewEmployee(data);
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const updateEmployee = createAsyncThunk (
  "employee/edit",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.updateEmployee(data);
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const removeEmployee = createAsyncThunk (
  "employee/remove",
  async ( data : any, { rejectWithValue }) => {
    try {
      const response = await EmployeesService.removeEmployee(data);
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
      state.employees = [ ...state.employees, action.payload ]
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
      console.log('updated', updated);
      state.employees = state.employees.map((item:any) => {
        console.log(item.id === updated.id)
        if (item.id === updated.id) {
          console.log('ai');
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

export default employeesSlice.reducer;