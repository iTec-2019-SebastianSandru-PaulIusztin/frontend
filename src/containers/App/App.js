import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../assets/vendor/nucleo/css/nucleo.css';
import '../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/css/argon-dashboard-react.css';
import AdminLayout from '../admin/Admin';
import AuthLayout from '../auth/Auth';
// import "assets/css/argon-dashboard-react.min.css";
// import "assets/css/argon-dashboard-react.css.map";

import { auth } from '../../redux';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={ (props) => <AdminLayout { ...props } /> } />
        <Route path="/auth" render={ (props) => <AuthLayout { ...props } /> } />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  );
}

export default connect()(App);
