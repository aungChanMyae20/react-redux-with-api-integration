import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DecadeReportsProps } from '../../interfaces/reports';
import ReportsServices from '../../api/reports';

export interface ReportsState {
  decadeReports: DecadeReportsProps
}

const initialState:ReportsState = {
  decadeReports: {}
}

export const getDecadeReports = createAsyncThunk (
  "reports/decade",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ReportsServices.getDecadeReports();
      return response.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearReports: (state) => {
      state.decadeReports = {}
    },
  },
  extraReducers: {
    // @ts-expect-error
    [getDecadeReports.pending]: (state, action) => {
      state.loading = true;
    },
    // @ts-expect-error
    [getDecadeReports.fulfilled]: (state, action) => {
      state.loading = false;
      state.decadeReports = action.payload
    },
    // @ts-expect-error
    [getDecadeReports.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
})

export const { clearReports } = reportsSlice.actions;

export default reportsSlice.reducer;

export const selectDecadeReports = (state: RootState) => state.reports.decadeReports;
