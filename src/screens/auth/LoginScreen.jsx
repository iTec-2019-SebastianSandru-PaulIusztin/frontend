import React from 'react';

import { connect } from 'react-redux';
import { auth } from '../../redux';

import Login from '../../views/examples/Login';
import { setToken } from '../../core/localStorage';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const token = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];
    // call redux use token here
    if (token !== 'login') {
      setToken(token);
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
      this.props.history.replace('/admin/index');
    };

    render() {
      return <Login onSubmitClicked={ this.onSubmitClicked } />;
    }
}

export default connect()(RegisterScreen);
