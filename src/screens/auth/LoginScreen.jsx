import React from 'react';
import Login from '../../views/examples/Login';
import { setToken } from '../../core/localStorage';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

 /* componentWillMount() {
    if (this.props.is_loggedin !== undefined) {
      if (this.props.is_loggedin) {
        this.props.history.replace('/admin/index');
      }
      else {
        this.setState({ isError: true });
      }
    }
  }
*/
  componentWillReceiveProps (newProps) {
    if( newProps.is_loggedin !== this.props.is_loggedin ) {
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

  componentDidMount() {
    const token = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];
    // call redux use token here
    if (token !== 'login') {
      setToken(token);
    }
  }


    onSubmitClicked = (value) => {
      // redux here

    };

    render() {
      return <Login isError={ this.state.isError } onSubmitClicked={ this.onSubmitClicked } />;
    }
}
