import React from 'react';
import { connect } from 'react-redux';

import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from 'reactstrap';
import { auth } from '../../redux';

let ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false
  };

  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }

  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes) => routes.map((prop, key) => {
    const { user } = this.props;
    if (user === undefined){
      if (prop.path === '/login' || prop.path === '/register' || prop.path === '/products' ||
        prop.path === '/user-profile' || prop.path === '/details' || prop.path === '/shop/cart') {
    }else {
        return (
            <NavItem key={ key }>
              <NavLink
                  to={ prop.layout + prop.path }
                  tag={ NavLinkRRD }
                  onClick={ this.closeCollapse }
                  activeClassName="active"
              >
                <i className={ prop.icon } />
                {prop.name}
              </NavLink>
            </NavItem>
        );
      }
    } else if ((user.is_seller !== undefined || user.is_seller !== null) && user.is_seller) {
      if (prop.path === '/login' || prop.path === '/details' || prop.path === '/register') {

      }
      else {
        return (
          <NavItem key={ key }>
            <NavLink
              to={ prop.layout + prop.path }
              tag={ NavLinkRRD }
              onClick={ this.closeCollapse }
              activeClassName="active"
            >
              <i className={ prop.icon } />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    }
    else if (prop.path === '/login' ||  prop.path === '/register' || prop.path === '/products' || prop.path === '/details' ) {

    }
    else {
      return (
        <NavItem key={ key }>
          <NavLink
            to={ prop.layout + prop.path }
            tag={ NavLinkRRD }
            onClick={ this.closeCollapse }
            activeClassName="active"
          >
            <i className={ prop.icon } />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    }
  });

  logout = () => {
    const { dispatch } = this.props;
    dispatch(auth.logout());
    this.props.history.replace('/auth/login');
  }

  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    }
    else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: '_blank'
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={ this.toggleCollapse }
          >
            <span className="navbar-toggler-icon" />
          </button>
          <h1 className="text-success">Trocify.ro</h1>
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav />
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={ Link }>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={ (e) => e.preventDefault() }>
                  <i className="ni ni-user-run" />
                  <span onClick={ this.logout }>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={ this.state.collapseOpen }>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <h1 className="text-success">Trocify.ro</h1>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={ this.toggleCollapse }
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

function mapStateToProps(state) {
  return {
    user: auth.getCurrentUser(state)
  };
}

export default connect(mapStateToProps)(Sidebar);
