import React from 'react';
import { connect } from 'react-redux'

import { auth } from '../../redux'

import Register from '../../views/examples/Register';
import { setCredentials } from '../../core/storage';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmed: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props

    const token = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];

    if (token !== 'register') {
      dispatch(auth.verify(token))
      this.setState({ isConfirmed: true });
    }
    else {
      this.setState({ isConfirmed: false });
    }
  }

  onSubmitClickedPhase1 = (value) => {
    const { dispatch } = this.props
    const { email, password } = value

    const payload = {
      email,
      password1: password,
      password2: password 
    }

    setCredentials({ email, password })
    dispatch(auth.signup(payload))
  };

    onSubmitClickedPhase2 = (value) => {
      const { dispatch } = this.props
      dispatch(auth.updateCurrentUser(value))
    };

    render() {
      const { is_signup, history } = this.props

      if(is_signup === true) {
        history.replace('/admin/index');
      }

      return <Register isConfirmed={ this.state.isConfirmed } onSubmitClickedPhase1={ this.onSubmitClickedPhase1 } onSubmitClickedPhase2={ this.onSubmitClickedPhase2 } />;
    }
}

function mapStateToProps(state) {
  return {
    is_signup: auth.isSignUp(state)
  }
}

export default connect(mapStateToProps)(RegisterScreen)
