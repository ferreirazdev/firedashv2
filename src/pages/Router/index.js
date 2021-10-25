import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Users from 'pages/Users';
import paths from './paths';

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.USERS} component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;