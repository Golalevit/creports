import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ExtendedRouter } from '@wellyes/react-router-extended';

import { routes } from './router-paths';
import { PAGES } from './pages';

export const BrowserRouter: FC = () => (
  <Router>
    <Switch>
      {routes.map((route) => (
        <ExtendedRouter key={route.path} redirectUrl={PAGES.LOGIN_PAGE} {...route} />
      ))}
      <Redirect exact from="/" to={PAGES.REPORT_PAGE} />
    </Switch>
  </Router>
);
