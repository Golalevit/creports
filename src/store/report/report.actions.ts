import { createDefaultThunk } from '@utils/default-thunk';
import axiosInstance from '@utils/axios';
import { ReportInterface } from '@models/interfaces/report';
import { EmailInterface } from '@models/interfaces/email';
import { ProjectsResponse, ReportResponse } from './report.types';

export const sendEmail = createDefaultThunk<any, EmailInterface>(
  'report/send-email',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/mail', email);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const getProjects = createDefaultThunk<ProjectsResponse[]>(
  'report/get-projects',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<ProjectsResponse[]>('/projects');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getReport = createDefaultThunk<ReportResponse, ReportInterface>(
  'report/get-report',
  async (report, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/report', report);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
