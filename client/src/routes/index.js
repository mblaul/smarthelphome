import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Auth from "./Auth";

function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


export default () => (
  <Router>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Route exact path="/auth" render={props => <Auth {...props} />} />
      <PrivateRoute authenticated={this.state.authenticated} path='/invoices' component={Invoices} />
    </Switch>
  </Router>
);
