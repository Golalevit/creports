import { ReportState } from '@store/report/report.types';
import { createSlice } from '@reduxjs/toolkit';
import { getProjects, getReport } from '@store/report/report.actions';

const initialState: ReportState = {
  projects: [],
  projectsLoading: false,
  report: undefined,
  reportLoading: false,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.projectsLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, res) => {
      state.projectsLoading = false;
      state.projects = res.payload;
    });

    builder.addCase(getReport.pending, (state) => {
      state.reportLoading = true;
    });
    builder.addCase(getReport.fulfilled, (state, res) => {
      state.reportLoading = false;
      state.report = res.payload;
    });
  },
});

export const reportReducer = reportSlice.reducer;
