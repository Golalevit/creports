import actionCreatorFactory from 'typescript-fsa';
import { createDefaultFetchWorker } from '@utils/builder/default-actions';
import { ProjectsResponce, ReportResponce } from './types';
import { ErrorResponse } from '../types';

const actionCreator = actionCreatorFactory('REPORT');

export const getProjects = actionCreator.async<object, ProjectsResponce[], ErrorResponse>('GET_PROJECTS');
export const getReport = actionCreator.async<object, ReportResponce, ErrorResponse>('GET_REPORT');
export const sendEmail = actionCreator.async<object, any, ErrorResponse>('SEND_EMAIL');

export const getProjectsWorker = createDefaultFetchWorker(getProjects, '/projects', 'get');
export const getReportWorker = createDefaultFetchWorker(getReport, '/report', 'post');
export const sendEmailWorker = createDefaultFetchWorker(sendEmail, '/mail', 'post');
