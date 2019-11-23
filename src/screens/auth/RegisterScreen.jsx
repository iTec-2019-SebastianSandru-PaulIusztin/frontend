import React from 'react';
import Register from '../../views/examples/Register';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

    onSubmitClicked = (value) => {
      const { name, password } = value;
      const payload = {
        email: name,
        password1: password,
        password2: password
      };
    };

    render() {
      return <Register onSubmitClicked={ this.onSubmitClicked } />;
    }
}
