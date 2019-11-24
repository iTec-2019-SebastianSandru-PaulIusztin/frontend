import React from 'react';

// reactstrap components
import { Button, Container, Row, Col, Card, Form } from 'reactstrap';
import CardBody from 'reactstrap/es/CardBody';
import CardHeader from 'reactstrap/es/CardHeader';
import CardFooter from 'reactstrap/es/CardFooter';
import { connect } from 'react-redux';
import {auth} from "../../redux";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHistoryItem({ shipMentName, status }, index) {
    return (
      <div>

        <hr className="my-4" />
        <h6 className="heading-small text-muted mb-4">
          {`Shipment ${index} with name "${shipMentName}" is still ${status}`}
        </h6>

      </div>
    );
  }

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
                <h1 className="display-2 text-white">{`Hello ${this.props.userName}`}</h1>
                <Button
                  color="info"
                  href="#pablo"
                  onClick={ (e) => this.props.onSave() }
                >
                  Edit profile
                </Button>
                <Card style={ { marginTop: '16px' } } className="bg-secondary shadow">
                  <CardHeader>
                    <h3 className="mb-0">Shipment </h3>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <h4 className="heading-small text-muted mb-4">
                      Shipment Name
                    </h4>
                    {[{shipMentName: 'Shipmentul 1', status: 'Pending'},{shipMentName: 'Shipmentul 2', status: 'Active'}].map((item,index)=> (
                      this.renderHistoryItem(item, index)
                      ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Container>
        </div>
      </>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: auth.getCurrentUser(state)
  };
}

export default connect(mapStateToProps)(UserHeader);
