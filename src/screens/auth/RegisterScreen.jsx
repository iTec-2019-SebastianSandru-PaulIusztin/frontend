import React from 'react';
import Register from '../../views/examples/Register';
import { setToken } from '../../core/localStorage';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmed: false
    };
  }

  componentDidMount() {
    const token = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];
    // call redux use token here
    if (token !== 'register') {
      console.log(token);
      this.setState({ isConfirmed: true });
    }
    else {
      this.setState({ isConfirmed: false });
    }
  }

  onSubmitClickedPhase1 = (value) => {
    // redux here
    console.log(value);
  };

    onSubmitClickedPhase2 = (value) => {
    // redux here
      console.log(value);
    };

    render() {
      return <Register isConfirmed={ this.state.isConfirmed } onSubmitClickedPhase1={ this.onSubmitClickedPhase1 } onSubmitClickedPhase2={ this.onSubmitClicked } />;
    }
}
