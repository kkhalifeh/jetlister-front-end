import React from "react";
import auth from "./auth";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/user-form",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;
