import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      auth.currentUser ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

export default PrivateRoute;