import React, { FC } from 'react';
import {
  BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';

import { Layout } from '@layout/index';
import { LoginPage } from '@pages/login';
import { ExtendedRouter } from '@wellyes/react-router-extended';
import { PAGES, prefix } from './pages';

export const BrowserRouter: FC = () => (
  <Router>
    <Switch>
      <ExtendedRouter path={PAGES.LOGIN_PAGE} component={LoginPage} />
      <Route path={`${prefix}/*`} component={Layout} />
      <Redirect exact from="/" to={PAGES.REPORT_PAGE} />
    </Switch>
  </Router>
);
