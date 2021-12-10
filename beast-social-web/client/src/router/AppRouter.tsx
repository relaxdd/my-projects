import React, { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import IRoute from "../types/IRoute";

interface AppRouterProps {
  routes: IRoute[];
  redirect: string;
}

const AppRouter: FC<AppRouterProps> = ({ routes, redirect }) => {
  return (
    <Switch>
      {routes.map((route, id) => (
        <Route path={route.path} exact={route.exact} key={id}>
          <React.Fragment>
            <Helmet>
              <title>{route.title}</title>
            </Helmet>
            <route.component />
          </React.Fragment>
        </Route>
      ))}
      <Redirect to={redirect} />
    </Switch>
  );
};

export default AppRouter;
