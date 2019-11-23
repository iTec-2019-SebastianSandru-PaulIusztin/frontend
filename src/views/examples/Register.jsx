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
import { EmailValidator, NameValidator, PasswordValidator } from '../../core/validators';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      password: '',
      email: '',
      address: {
        country: '',
        county: '',
        city: '',
        street: ''
      },
      type: '',
      isCompany: false,
      isTargetingCompanies: false,
      isError: false
    };
  }


  renderError = (message) => (
    <Alert color="warning">
      <strong>Error !</strong>
      {' '}
Bad credentials !
    </Alert>
  );

  updateType = (e) => {
    this.setState({ type: e.target.value });
  };

  updateIsCompany= (e) => {
    e.target.value === 'Company' ? this.setState({ isCompany: true })
      : this.setState({ isCompany: false });
  };

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  updateName = (e) => {
    this.setState({ name: e.target.value });
  };

  updatePhoneNumber = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  updateAddressCountry = (e) => {
    this.setState({ address: { ...this.state.address, country: e.target.value } });
  };


  updateAddressCounty = (e) => {
    this.setState({ address: { ...this.state.address, county: e.target.value } });
  };


  updateAddressCity = (e) => {
    this.setState({ address: { ...this.state.address, city: e.target.value } });
  };


  updateAddressStreet = (e) => {
    this.setState({ address: { ...this.state.address, street: e.target.value } });
  };

  updateIsTargetingCompanies = (e) => {
    console.log('HERE', e);
    this.setState({ isTargetingCompanies: !this.state.isTargetingCompanies });
  };

  onSubmitClicked = () => {
    const { isError, name, phoneNumber, password, email, address, type, isTargetingCompanies, isCompany } = this.state;

    if (!PasswordValidator(password) || !NameValidator(name)
        || !EmailValidator(email) || phoneNumber === '' || address.country === '' || address.county === '' || address.city === '' || address.street === '') {
      this.setState({ isError: true });
      window.scrollTo(0, 0);
      setTimeout(() => this.setState({ isError: false }), 4000);
    }
    else {
      this.props.onSubmitClicked(this.state);
    }
  };

  render() {
    const { isError, name, phoneNumber, password, email, address, type, isTargetingCompanies, isCompany } = this.state;
    return (
      <>
        <Col lg="6" md="8">
          {isError ? this.renderError() : null}

          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign up with credentials</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ name } placeholder="Name" type="text" onChange={ this.updateName } />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ email } placeholder="Email" type="email" onChange={ this.updateEmail } />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ password } placeholder="Password" type="password" onChange={ this.updatePassword } />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-chat-round" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ phoneNumber } placeholder="Phone number" type="text" onChange={ this.updatePhoneNumber } />
                  </InputGroup>
                </FormGroup>
                <div className="text-center text-muted mb-4">
                  <small>Address details</small>
                </div>
                <hr className="my-3" />

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-building" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ address.country } onChange={ this.updateAddressCountry } className="form-control-alternative" placeholder="Country" type="text" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-building" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ address.county } onChange={ this.updateAddressCounty } className="form-control-alternative" placeholder="County" type="text" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-building" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ address.city } onChange={ this.updateAddressCity } className="form-control-alternative" placeholder="City" type="text" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-building" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ address.street } onChange={ this.updateAddressStreet } className="form-control-alternative" placeholder="Street" type="text" />
                  </InputGroup>
                </FormGroup>

                <div className="text-center text-muted mb-4">
                  <small>Type</small>
                </div>
                <hr className="my-3" />

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-building" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ isCompany ? 'Company' : 'Private' } placeholder="Buyer/Seller" onChange={ this.updateIsCompany } type="select" name="select" id="exampleSelect">
                      <option>Private</option>
                      <option>Company</option>
                    </Input>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-building" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={ type } placeholder="Buyer/Seller" onChange={ this.updateType } type="select" name="select" id="exampleSelect">
                      <option>Buyer</option>
                      <option>Seller</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                {type === 'Seller' ? (
                  <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                    <input
                      value={ isTargetingCompanies }
                      onChange={ this.updateIsTargetingCompanies }
                      className="custom-control-input"
                      id="customCheck5"
                      type="checkbox"
                    />
                    <label className="custom-control-label" htmlFor="customCheck5">
                        Targeting Companies ?
                    </label>
                  </div>
                ) : null}


                <div className="text-muted font-italic">
                  <small>
                    password strength:
                    {' '}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the
                          {' '}
                          <a href="#pablo" onClick={ (e) => e.preventDefault() }>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button onClick={ this.onSubmitClicked } className="mt-4" color="primary" type="button">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
