import React from 'react';

import { Row, Col } from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2019
              {' '}
              <a
                className="font-weight-bold ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                Sandru Sebastian & Paul Iusztin
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
