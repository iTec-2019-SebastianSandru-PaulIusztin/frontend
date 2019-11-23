import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import SimpleHeader from '../../components/Headers/SimpleHeader';
import ShopHeader from '../../components/Headers/ShopHeader';
import { auth } from '../../redux';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCreation: false,
      address: {
        country: '',
        county: '',
        city: '',
        street: ''
      },
      storeName: ''
    };
  }

    onStoreSaveClick = () => {
       // dispatch here
        console.log(this.state);
    };

    updateStoreName = (e) => {
      this.setState({ storeName: e.target.value });
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

  onNewStoreClick = () => {
    this.setState({ storeCreation: !this.state.storeCreation });
  };

  onStoreCancelClick = () => {
    this.setState({ storeCreation: false });
  }

  renderStoreCreation() {
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">My Store</h3>
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
                          Store information
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                                          Store Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue={this.state.storeName}
                      onChange={(e) => this.updateStoreName(e)}
                      id="input-username"
                      placeholder="Username"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <hr className="my-4" />
            {/* Address */}
            <h6 className="heading-small text-muted mb-4">
                          Location information
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                                          Country
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue={this.state.address.country}
                      onChange={(e) => this.updateAddressCountry(e)}
                      id="input-address"
                      placeholder="Country"
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
                                          County
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue="New York"
                      id="input-city"
                      defaultValue={this.state.address.county}
                      onChange={(e) => this.updateAddressCounty(e)}
                      placeholder="County"
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
                      id="input-country"
                      defaultValue={this.state.address.city}
                      onChange={(e) => this.updateAddressCity(e)}
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
                                          Street
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-country"
                      defaultValue={this.state.address.street}
                      onChange={(e) => this.updateAddressStreet(e)}
                      placeholder="Country"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button onClick={ this.onStoreSaveClick }className="my-4" color="primary" type="button">
                              Create
              </Button>
              <Button onClick={ this.onStoreCancelClick } className="my-4" color="secondary" type="button">
                              Cancel
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }

  render() {
    return (
      <>
        <ShopHeader onNew={ this.onNewStoreClick } />
        {this.state.storeCreation ? (
          <Container className="mt--7" fluid>
            {this.renderStoreCreation()}
          </Container>
        ) : (null)}

      </>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: auth.getCurrentUser(state)
  };
}


export default connect(mapStateToProps)(Products);
