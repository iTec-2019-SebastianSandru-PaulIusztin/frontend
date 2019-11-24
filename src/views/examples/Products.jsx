import React from 'react';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Media,
  Row
} from 'reactstrap';
import ShopHeader from '../../components/Headers/ShopHeader';
import { auth, shops } from '../../redux';
import AddProduct from "./AddProduct";

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
      storeName: '',
      hasStore: false,
      isAddProduct: false,
    };
    console.log(this.props.shop);
  }

    onStoreSaveClick = () => {
      const { dispatch } = this.props;
      const { country, county, city, street } = this.state.address;

      Geocode.fromAddress(`${country || ''} ${county || ''} ${city || ''} ${street || ''}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const newPayload = {
            name: this.state.storeName,
            lat,
            lng
          };

          dispatch(shops.addShop(newPayload));
        },
        (error) => {
          console.error(error);
        }
      );
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

  setAddProductFlag = () => {
    console.log('here')
    this.setState({ isAddProduct: !this.state.isAddProduct });

  };

  onStoreCancelClick = () => {
    this.setState({ storeCreation: false });
  };

  renderGridItem = ({ name, owner, price, location, storeName }, index) => (
      <Col key={ index } className="col-sm" style={ { padding: 24 } }>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h1 className="mb-0">{name}</h1>
          </CardHeader>
          <Media className="align-items-center">

            <img
                alt="..."
                src={ require('../../assets/img/theme/bootstrap.jpg') }
            />
            <div style={ { display: 'flex', flexDirection: 'column' } }>
              <div style={ { paddingBottom: '8px' } }>
                <h3 className="mb-0">{owner}</h3>
              </div>
              <div style={ { paddingBottom: '8px' } }>
                <h3 className="mb-0">{`${price} lei / Kg`}</h3>
              </div>
              <div style={ { paddingBottom: '8px' } }>
                <h3 className="mb-0">{`${storeName} ,${location}`}</h3>
              </div>
            </div>
          </Media>
        </Card>
      </Col>
  );

  transformForGridRecursive(list, isTakingTwo, result = []) {
    if (list.length === 0) {
      return result;
    }
    if (isTakingTwo) {
      const newList = [];
      newList.push(list.shift());
      if (list.length > 0) newList.push(list.shift());
      result.push(newList);
      this.transformForGridRecursive(list, !isTakingTwo, result);
    }
    else {
      const newList = [];
      newList.push(list.shift());
      if (list.length > 0) newList.push(list.shift());
      if (list.length > 0) newList.push(list.shift());
      result.push(newList);
      this.transformForGridRecursive(list, !isTakingTwo, result);
    }
  }

  // [ [1,2], [3,4,5], [1,2] ]
  renderGrid = () => {
    const newList = [];
    const stateItems = [...this.props.shop.products];
    this.transformForGridRecursive(stateItems, true, newList);
    let itemId = 0;
    return (
        <Container>
          {this.state.isError ? this.renderError() : null}

          {newList.map((list, firstIndex) => (
              <Row key={ firstIndex }>
                {list.map((item, index) => this.renderGridItem({ ...item }, itemId++))}
              </Row>
          ))}
        </Container>
    );
  };

  componentDidMount() {
    if(this.props.shop === undefined || this.props.shop === null) {
      this.setState({hasStore: false});
    } else {
      this.setState({hasStore: true, storeName: this.props.shop.name});
    }
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
                      defaultValue={ this.state.storeName }
                      onChange={ (e) => this.updateStoreName(e) }
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
                      defaultValue={ this.state.address.country }
                      onChange={ (e) => this.updateAddressCountry(e) }
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
                      id="input-city"
                      defaultValue={ this.state.address.county }
                      onChange={ (e) => this.updateAddressCounty(e) }
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
                      defaultValue={ this.state.address.city }
                      onChange={ (e) => this.updateAddressCity(e) }
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
                      defaultValue={ this.state.address.street }
                      onChange={ (e) => this.updateAddressStreet(e) }
                      placeholder="Country"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button onClick={ this.onStoreSaveClick } className="my-4" color="primary" type="button">
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
    console.log(this.state.hasStore);
    return (
      <>
        <ShopHeader onNew={ this.onNewStoreClick } storeName={this.state.storeName} hasStore={this.state.hasStore}/>
        {this.state.storeCreation ? (
          <Container className="mt--7" fluid>
            {this.renderStoreCreation()}
          </Container>
        ) : (null)}
        {this.state.hasStore ? (
            <Container className="mt--7" fluid>
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
                          onClick={ (e) => this.setAddProductFlag() }
                          size="large"
                      >
                        + Add a new product
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
              <CardBody>
              {this.state.isAddProduct ? <AddProduct/> : (null)}
              </CardBody>

              <CardFooter className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My Store</h3>
                    </Col>
                  </Row>
                {this.renderGrid()}
              </CardFooter>

              </Card>
            </Container>
        ): null}

      </>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: auth.getCurrentUser(state),
    shop: shops.getCurrentShop(state)
  };
}


export default connect(mapStateToProps)(Products);
