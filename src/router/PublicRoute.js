import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      !auth.currentUser ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/profile" />
      )
    }
  />
);

export default PublicRoute;