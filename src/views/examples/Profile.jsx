import React from 'react';
import { connect } from 'react-redux';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';
import UserHeader from '../../components/Headers/UserHeader';
import { auth } from '../../redux';
// core components

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      address: {
        country: '',
        county: '',
        city: '',
        street: ''
      }
    };
    console.log(this.props.user);
  }

  onSaveClicked = () => {
    console.log(this.state);
    // dispatch here
  }

  updateName = (e) => {
    this.setState({ name: e.target.value });
  };

  updatePhoneNumber = (e) => {
    this.setState({ phoneNumber: e.target.value });
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


  render() {
    const { user } = this.props;
    return (
      <>
        <UserHeader />

        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={ (e) => e.preventDefault() }
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => this.updateName(e)}
                              defaultValue={ user.first_name }
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              id="input-email"
                              defaultValue={ user.email }
                              placeholder="jesse@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={ user.first_name.split(' ')[0] }
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={ user.first_name.split(' ')[1] }
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Phone number
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={ user.phone }
                              onChange={(e) => this.updatePhoneNumber(e)}

                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Street
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => this.updateAddressStreet(e)}

                              defaultValue={ user.address.street }
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => this.updateAddressCountry(e)}

                              defaultValue={ user.address.country }
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                            County
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => this.updateAddressCounty(e)}

                              defaultValue={ user.address.county }
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => this.updateAddressCity(e)}

                              defaultValue={ user.address.city }
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: auth.getCurrentUser(state)
  };
}

export default connect(mapStateToProps)(Profile);
