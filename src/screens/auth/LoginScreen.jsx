import React from 'react';
import Login from '../../views/examples/Login';
import {setToken} from "../../core/localStorage";

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const token = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];
    // call redux use token here
    if(token !== 'login') {
      setToken(token);
    }
  }

    onSubmitClicked = (value) => {
      // redux here
      console.log(value);
      this.props.history.replace('/admin/index');
    };

    render() {
      return <Login onSubmitClicked={ this.onSubmitClicked } />;
    }
}
