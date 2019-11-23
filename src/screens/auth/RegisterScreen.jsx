import React from 'react';
import Register from '../../views/examples/Register';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }


    onSubmitClicked = (value) => {
    // redux here
      console.log(value);
    };

    render() {
      return <Register onSubmitClicked={ this.onSubmitClicked } />;
    }
}
