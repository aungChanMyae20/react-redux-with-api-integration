import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import AuthService from '../../api/auth';
import { encryptUserInfo } from '../../helper/utils';
import { getUserMe } from '../user/userSlice';

export interface AuthState {
  auth: {
    isLoggedIn: boolean
    id: string
  }
}

const initialState: AuthState = {
  auth: {
    isLoggedIn: false,
    id: ''
  }
}

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ data }:any, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.login(data);
      if (response.data.token) {
        encryptUserInfo(response.data);
        await dispatch(getUserMe({ data: response.data.id }))
      }
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.auth.isLoggedIn = true
    },
    loggedOut: (state) => {
      state.auth.isLoggedIn = false
    }
  },
  extraReducers: {
    // @ts-expect-error
    [userLogin.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth.isLoggedIn = true;
      state.auth.id = action.payload.id;
    },
    // @ts-expect-error
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    }
  }
});

export const { loggedIn, loggedOut } = authSlice.actions;

export const selectStoreAuth = (state: RootState) => state.auth;

export default authSlice.reducer;