import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, Alert
} from 'reactstrap';
import { NameValidator, PasswordValidator } from '../../core/validators';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      isError: false
    };
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  updateName = (e) => {
    this.setState({ name: e.target.value });
  };

  onSubmitClicked = () => {
    if (!PasswordValidator(this.state.password) || !NameValidator(this.state.name)) {
      this.setState({ isError: true });
      window.scrollTo(0, 0)
      setTimeout(() => this.setState({ isError: false }), 4000);
    }
    else {
      this.props.onSubmitClicked(this.state);
    }
  };

  renderError = () => (<Alert color="warning">
    <strong>Error !</strong> Bad credentials !
  </Alert>);

  render() {
    const { username, password, isError } = this.state;

    return (
      <>
        <Col lg="5" md="7">
          {isError ? this.renderError() : null}
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Login to your account</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ username } onChange={ this.updateName } placeholder="Email" type="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ password } onChange={ this.updatePassword } placeholder="Password" type="password" />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button onClick={ this.onSubmitClicked } className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="/register"
                onClick={ (e) => e.preventDefault() }
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={ (e) => e.preventDefault() }
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
