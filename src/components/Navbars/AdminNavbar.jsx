import React from 'react';
import { connect } from 'react-redux';
import Geocode from "react-geocode";

import { Link } from 'react-router-dom';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media, Button, Modal, Alert
} from 'reactstrap';
import { auth, products } from '../../redux';

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdvancedSearch: false,
      searchInput: '',
      searchCategory: '',
      searchLocation: '',
      isError: false,
      anonUser: this.props.user === undefined
    };
  }

  renderError = () => (
    <Alert color="warning">
      <strong>Error !</strong>
      {' '}
        Bad credentials !
    </Alert>
  );

  search = (e) => {
    // REDUX HERE
    if (this.state.searchInput === '' && this.state.searchCategory === '' && this.state.searchLocation === '') {
      this.setState({ isError: true });
      setTimeout(() => {
        this.setState({ isError: false });
      }, 3000);
    }
    else {
      this.setState({ isAdvancedSearch: false });
      if(this.state.searchLocation !== '') {
        const { dispatch } = this.props
        Geocode.fromAddress(`${this.state.searchLocation}`).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            dispatch(products.getProducts({latlng: `${lat}#${lng}`}))
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  };

  updateSearchCategory = (e) => {
    this.setState({ searchCategory: e.target.value });

    const { dispatch } = this.props
    dispatch(products.getProducts({category: e.target.value})) 
  };


  updateSearchLocation = (e) => {
    this.setState({ searchLocation: e.target.value });
  };


  updateSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });

    const { dispatch } = this.props
    dispatch(products.getProducts({search: e.target.value}))
  };

  enterAdvancedSearch = () => {
    this.setState({ isAdvancedSearch: true });
  };

  renderModal = () => (
    <Modal
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
      isOpen={ this.state.isAdvancedSearch }
      toggle={ () => this.enterAdvancedSearch }
    >
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-compass-04 ni-3x" />
          <h4 className="heading mt-4">Advanced Search</h4>
          <p>
            Search by Category or by the Location !
          </p>
        </div>
        <FormGroup className="mb-0" style={ {    paddingBottom: '16px' } }>
          <InputGroup className="input-group-alternative">
            <Input value={ this.state.searchCategory } onChange={ (e) => this.updateSearchCategory(e) } placeholder="Category" type="text" />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-0">
          <InputGroup className="input-group-alternative">
            <Input value={ this.state.searchLocation } onChange={ (e) => this.updateSearchLocation(e) } placeholder="Location" type="text" />
          </InputGroup>
        </FormGroup>
      </div>
      <div className="modal-footer">
        <Button onClick={ () => this.search() } className="btn-white" color="default" type="button">
          Search
        </Button>
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={ () => this.cancelModal() }
        >
          Close
        </Button>
      </div>
    </Modal>
  );

  cancelModal = () => {
    this.setState({ isAdvancedSearch: false });
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch(auth.logout());
    this.props.history.replace('/auth/login');
  }

  render() {
    return (
      <>
        {this.state.isAdvancedSearch ? this.renderModal() : null}
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">

          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />

                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onKeyPress={ (event) => {
                      if (event.key === 'Enter') {
                        this.search();
                      }
                    } }
                    value={ this.state.searchInput }
                    onChange={ (e) => this.updateSearchInput(e) }
                    placeholder="Search"
                    type="text"
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i onClick={ this.enterAdvancedSearch } className="fas fa-search-location" style={ { cursor: 'pointer' } } />

                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={ require('../../assets/img/theme/team-4-800x800.jpg') }
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Sebastian Sandru
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  {this.state.anonUser ? (null) : (
                    <DropdownItem to="/admin/user-profile" tag={ Link }>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                  )}

                  <DropdownItem divider />
                  {this.state.anonUser ? (null) : (
                    <DropdownItem href="#pablo" onClick={ (e) => e.preventDefault() }>
                      <i className="ni ni-user-run" />
                      <span onClick={ this.logout }>
Logout
                      </span>
                    </DropdownItem>
                  )}

                  {this.state.anonUser ? (
                    <DropdownItem href="#pablo" onClick={ (e) => e.preventDefault() }>
                      <i className="ni ni-email-83" />
                      <span onClick={ (e) => this.props.history.replace('/auth/register') }>
Register
                      </span>
                    </DropdownItem>
                  ) : (null)}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {this.state.isError ? this.renderError() : null}

          </Container>
        </Navbar>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: auth.getCurrentUser(state)
  };
}


export default connect(mapStateToProps)(AdminNavbar);
