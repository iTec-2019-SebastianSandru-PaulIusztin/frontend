import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListSelected: true,
      isGridSelected: false,
      isMapSelected: false
    };
  }

  onSelectList = (_) => {
    this.setState({ isListSelected: true, isGridSelected: false, isMapSelected: false });
    this.props.onChangeTab('list');
  };

    onSelectGrid = (_) => {
      this.setState({ isListSelected: false, isGridSelected: true, isMapSelected: false });
      this.props.onChangeTab('grid');
    };


  onSelectMap = (_) => {
    this.setState({ isListSelected: false, isGridSelected: false, isMapSelected: true });
    this.props.onChangeTab('map');
  };


    render() {
      return (
        <>
          <div className="header bg-gradient-teal pb-8 pt-5 pt-md-8">
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                <Row>
                  <Col lg="6" xl="3">
                    <Card
                      className="card-stats mb-4 mb-xl-0"
                      style={ !this.state.isListSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.5)', cursor: "pointer" } : {cursor: "pointer"} }
                      onClick={ this.onSelectList }
                    >
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                                            View
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                            LIST VIEW
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card
                      className="card-stats mb-4 mb-xl-0"
                      style={ !this.state.isGridSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.5)', cursor: "pointer" } : {cursor: "pointer"} }
                      onClick={ this.onSelectGrid }
                    >
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                                            View
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                            GRID VIEW
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card
                        className="card-stats mb-4 mb-xl-0"
                        style={ !this.state.isMapSelected ? { backgroundColor: 'rgba(255, 255, 255, 0.5)', cursor: "pointer" } : {cursor: "pointer"} }
                        onClick={ this.onSelectMap }
                    >
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                            >
                              View
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                            MAP VIEW
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-map-pin" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </>
      );
    }
}

export default Header;
