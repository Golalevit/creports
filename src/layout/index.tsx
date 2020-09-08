import React, { FC, useState } from 'react';
import {
  Drawer, ListItem, ListItemText, List, Collapse, ListSubheader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PAGES, prefix } from '@router/pages';
import { Switch, useHistory } from 'react-router-dom';
import { routes } from '@router/router-paths';
import { ExtendedRouter } from '@wellyes/react-router-extended';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export const Layout: FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<string>(window.location.pathname);
  const [open, setOpen] = useState<boolean>(window.location.pathname !== '/app/report');

  const useStylesListItem = makeStyles({
    root: {
      paddingLeft: 25,
    },
  });
  const useStylesDrawer = makeStyles({
    paper: {
      width: 200,
    },
  });

  const classesDrawer = useStylesDrawer();
  const classesListItem = useStylesListItem();

  return (
    <>
      <Drawer
        classes={classesDrawer}
        variant="permanent"
      >
        <List
          className="sidebar"
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              CReports
            </ListSubheader>
          )}
        >
          <ListItem
            button
            selected={selectedTab === `${prefix}/report`}
            onClick={() => {
              setSelectedTab(`${prefix}/report`);
              history.push(PAGES.REPORT_PAGE);
            }}
          >
            <ListItemText primary="Client Reports" />
          </ListItem>
          <ListItem
            button
            onClick={() => setOpen(!open)}
          >
            <ListItemText primary="Repository Stats" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                selected={selectedTab === `${prefix}/repositories`}
                onClick={() => {
                  setSelectedTab(`${prefix}/repositories`);
                  history.push(PAGES.REPOSITORIES_PAGE);
                }}
                button
                classes={classesListItem}
              >
                <ListItemText primary="Stats" />
              </ListItem>
              <ListItem
                selected={selectedTab === `${prefix}/users`}
                onClick={() => {
                  setSelectedTab(`${prefix}/users`);
                  history.push(PAGES.USERS_PAGE);
                }}
                button
                classes={classesListItem}
              >
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem
                selected={selectedTab === '/projects'}
                onClick={() => {
                  setSelectedTab('/projects');
                }}
                button
                classes={classesListItem}
              >
                <ListItemText primary="Projects" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Switch>
          {routes.map((route) => (
              <ExtendedRouter
                key={route.path}
                path={route.path}
                component={route.component}
                {...route}
              />
          ))}
      </Switch>
    </>
  );
};
