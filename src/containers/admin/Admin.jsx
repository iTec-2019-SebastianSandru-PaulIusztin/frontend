
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import AdminFooter from '../../components/Footers/AdminFooter';
import Sidebar from '../../components/Sidebar/Sidebar';

import routes from '../../routes';

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = (routes) => routes.map((prop, key) => {
    if (prop.layout === '/admin') {
      return (
        <Route
          path={ prop.layout + prop.path }
          component={ prop.component }
          key={ key }
        />
      );
    }
    return null;
  });

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  render() {
    return (
      <>
        <Sidebar
          { ...this.props }
          routes={ routes }
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            { ...this.props }
            brandText={ this.getBrandText(this.props.location.pathname) }
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
