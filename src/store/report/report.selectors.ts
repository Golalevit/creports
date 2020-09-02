import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/types';

export const getReportState = (state: RootState) => state.report;

export const getProjectsData = createSelector(
  getReportState,
  ({ projects, projectsLoading }) => ({ projectsLoading, projects }),
);

export const getReport = createSelector(
  getReportState,
  ({ report, reportLoading }) => ({ report, reportLoading }),
);
