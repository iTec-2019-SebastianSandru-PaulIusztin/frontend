import React from 'react';

import { connect } from 'react-redux';
import { auth } from '../../redux';

import Login from '../../views/examples/Login';
import {setToken} from "../../core/storage";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.is_loggedin !== this.props.is_loggedin) {
      if (newProps.is_loggedin !== undefined) {
        if (newProps.is_loggedin) {
          this.props.history.replace('/admin/index');
        }
        else {
          this.setState({ isError: true });
        }
      }
    }
  }

    onSubmitClicked = (value) => {
      const { dispatch } = this.props;
      const { name, password } = value;
      const payload = {
        email: name,
        password
      };

      dispatch(auth.login(payload));
    };

    render() {
      const { is_loggedin, history } = this.props;
      let isError = false;

      if (is_loggedin !== undefined) {
        if (is_loggedin) {
          history.replace('/admin/index');
        }
        else {
          isError = true;
        }
      }

      return <Login isError={ isError } onSubmitClicked={ this.onSubmitClicked } />;
    }
}

function mapStateToProps(state) {
  return {
    is_loggedin: auth.isLoggedIn(state)
  };
}

export default connect(mapStateToProps)(LoginScreen);
