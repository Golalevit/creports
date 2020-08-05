// import React from 'react';

import { ReportPage } from '@pages/report-page';
import { LoginPage } from '@pages/login';

import { LoginGuard } from '@/guards/login.guard';

import { PAGES } from './pages';

export const routes = [
  {
    path: PAGES.LOGIN_PAGE,
    component: LoginPage,
  },
  {
    path: PAGES.REPORT_PAGE,
    guards: [
      new LoginGuard(),
    ],
    component: ReportPage,
    exact: true,
  },
];
