import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

class ShopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
    onNewStoreClick = () => {
      this.props.onNew();
    }

  render() {
    return (
      <>
        <div className="header bg-gradient-teal pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div onClick={this.onNewStoreClick} className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card
                      style={{cursor: "pointer"}}
                    className="card-stats mb-4 mb-xl-0"
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                                                        Shop
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {`Add a new store`}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-shopping-bag" />
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

export default ShopHeader;
