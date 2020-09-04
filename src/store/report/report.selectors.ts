import { createSelector } from 'reselect';
import { RootReducer } from '@store/types';

export const getReportState = (state: RootReducer) => state.report;

export const getProjectsData = createSelector(
  getReportState,
  ({ projects, projectsLoading }) => ({ projectsLoading, projects }),
);

export const getReport = createSelector(
  getReportState,
  ({ report, reportLoading }) => ({ report, reportLoading }),
);
