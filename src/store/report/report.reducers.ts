import { defaultReducerActionCreator } from '@utils/builder/default-reducer';
import { Action } from '@utils/builder/types';
import { ReportState } from './types';
import {
  getProjects,
  getReport,
} from './report.actions';

const initialState: ReportState = {
  projects: [],
  projectsLoading: false,
  report: undefined,
  reportLoading: false,
};

export const reportReducer = (state = initialState, action: Action): ReportState => {
  const { type }: any = action;
  const states = {
    ...defaultReducerActionCreator(getProjects, state, action, { dataMask: 'projects', errorMask: 'projectsError', loadingMask: 'projectsLoading' }),
    ...defaultReducerActionCreator(getReport, state, action, { dataMask: 'report', loadingMask: 'reportLoading', errorMask: 'reportError' }),
  };
  return states[type] || state;
};
