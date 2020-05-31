import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/pages/Home";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};
