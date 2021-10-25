import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Users from 'pages/Users';
import User from 'pages/User';
import Login from 'pages/Login';
import ResetPassword from 'pages/ResetPassword';
import PrivateRoute from './PrivateRoutes';
import paths from './paths';

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.LOGIN} component={Login} />
        <Route exact path={paths.RESET_PASSWORD} component={ResetPassword} />
        <PrivateRoute path={paths.ADD_USER} component={User} />
        <PrivateRoute path={paths.MODIFY_USER} component={User} />
        <PrivateRoute path={paths.USERS} component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;