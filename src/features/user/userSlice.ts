import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EmployeeProps, EmployeeInitialValues } from '../../interfaces/employee';
import UserService from '../../api/user';

export interface UserState {
  user: EmployeeProps
}

const initialState: UserState = {
  user: EmployeeInitialValues
}

export const getUserMe = createAsyncThunk(
  "user/me",
  async ({ data }:any, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserInfo(data);
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.user = EmployeeInitialValues
    }
  },
  extraReducers: {
    // @ts-expect-error
    [getUserMe.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [getUserMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    // @ts-expect-error
    [getUserMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

export const { clearUserInfo } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;