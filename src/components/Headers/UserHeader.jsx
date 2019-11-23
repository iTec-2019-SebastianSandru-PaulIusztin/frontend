import React from 'react';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header bg-gradient-teal pb-8 pt-5 pt-md-8"
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello Sebastian</h1>
                <Button
                  color="info"
                  href="#pablo"
                  onClick={ (e) => e.preventDefault() }
                >
                  Edit profile
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
