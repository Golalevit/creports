// import React from 'react';

import { ReportPage } from '@pages/report-page';
import { LoginPage } from '@pages/login';
import { RepositoryPage } from '@pages/repository-page';
import { UsersPage } from '@pages/users-page';

import { LoginGuard } from '@guards/login.guard';

import { PAGES } from './pages';

export const routes = [
  {
    path: PAGES.LOGIN_PAGE,
    component: LoginPage,
  },
  {
    path: PAGES.REPORT_PAGE,
    guards: [new LoginGuard()],
    component: ReportPage,
    exact: true,
  },
  {
    path: PAGES.REPOSITORIES_PAGE,
    guards: [new LoginGuard()],
    component: RepositoryPage,
    exact: true,
  },
  {
    path: PAGES.USERS_PAGE,
    guards: [new LoginGuard()],
    component: UsersPage,
    exact: true,
  },
];
