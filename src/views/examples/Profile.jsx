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
import Files from 'react-files';
import UserHeader from '../../components/Headers/UserHeader';
import { auth } from '../../redux';

// core components

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avatar: '',
      phoneNumber: '',
      imgSrc: require('../../assets/img/theme/team-4-800x800.jpg'),
      address: {
        country: '',
        county: '',
        city: '',
        street: ''
      }
    };
    console.log(this.props.user);
  }

  componentDidMount() {
    this.setData();
  }

  setData = () => {
    const { user } = this.props;
    if (user.address === undefined || user.address === null) {
      const sellerUser = user.seller;
      this.setState({
        phoneNumber: sellerUser.phone,
        name: sellerUser.name,
        address: {
          country: sellerUser.address.country,
          county: sellerUser.address.county,
          city: sellerUser.address.city,
          street: sellerUser.address.street
        }
      });
    }
    else {
      this.setState({
        phoneNumber: user.phone,
        name: user.first_name,
        address: {
          country: user.address.country,
          county: user.address.county,
          city: user.address.city,
          street: user.address.street
        }
      });
    }
  }

  onSaveClicked = () => {
    console.log(this.state);
    // dispatch here
  }

  updateName = (e) => {
    console.log(e.target.value);
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

  onFilesChange = (files) => {
    this.setState({ avatar: files[0], imgSrc: files[0].preview.url });
  }

  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <UserHeader onSave={ this.onSaveClicked } userName={ this.state.name } />

        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={ (e) => e.preventDefault() }>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={ this.state.imgSrc }
                        />
                      </a>

                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between" />
                </CardHeader>
                <CardBody className="pt-0 pt-md-4" />

                <Files
                  style={ {
                    textAlign: 'center',
                    paddingTop: '5vh',
                    paddingBottom: '5vh'
                  } }
                  className="files-dropzone"
                  onChange={ this.onFilesChange }
                  onError={ this.onFilesError }
                  accepts={ ['image/png', '.pdf', 'audio/*'] }
                  multiple
                  maxFiles={ 3 }
                  maxFileSize={ 10000000 }
                  minFileSize={ 0 }
                  clickable
                >
                  Drop files here or click to upload
                </Files>
              </Card>
            </Col>
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
                              onChange={ (e) => this.updateName(e) }
                              value={ this.state.name }

                              defaultValue={ this.state.name }
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
                              defaultValue={ this.state.name.split(' ')[0] }
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
                              defaultValue={ this.state.name.split(' ')[1] }
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
                              defaultValue={  this.state.phoneNumber  }
                              value={ this.state.phoneNumber }

                              onChange={ (e) => this.updatePhoneNumber(e) }

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
                              onChange={ (e) => this.updateAddressStreet(e) }
                              value={ this.state.address.street }

                              defaultValue={ this.state.address.street }
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
                              onChange={ (e) => this.updateAddressCountry(e) }
                              value={ this.state.address.country }

                              defaultValue={ this.state.address.country }
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
                              onChange={ (e) => this.updateAddressCounty(e) }
                              value={ this.state.address.county }

                              defaultValue={ this.state.address.county }
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
                              onChange={ (e) => this.updateAddressCity(e) }
                              value={ this.state.address.city }
                              defaultValue={ this.state.address.county }
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
