import React, { FC, useState } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { PAGES } from '@router/pages';
import {
  Switch, useHistory,
} from 'react-router-dom';
import { routes } from '@router/router-paths';
import { ExtendedRouter } from '@wellyes/react-router-extended';

export const Layout: FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState(window.location.pathname);
  const onChange = (event, newValue) => {
    history.push(newValue);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs onChange={onChange} value={selectedTab}>
          <Tab label="Client Reports" value={PAGES.REPORT_PAGE} />
          <Tab label="Repository Stats" value={PAGES.REPOSITORIES_PAGE} />
        </Tabs>
      </AppBar>
      <Switch>
        {routes.map((route) => (
          <ExtendedRouter key={route.path} path={route.path} component={route.component} />
        ))}
      </Switch>
    </>
  );
};
