import React from 'react';

// reactstrap components
import { Button, Container, Row, Col, Card, Form } from 'reactstrap';
import CardBody from 'reactstrap/es/CardBody';
import CardHeader from 'reactstrap/es/CardHeader';
import CardFooter from 'reactstrap/es/CardFooter';
import { connect } from 'react-redux';
import {auth, shops} from "../../redux";
import * as payments from "../../redux/payments";

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: []
    };
  }

  componentDidMount() {
    console.log(this.props.payments);
    this.setState({payments: this.props.payments});
  }

  renderHistoryItem(payment, index) {
    return (
      <div>

        <h6 className="heading-small text-muted mb-4">
          {`Shipment ${index} with quantity ${payment.payment_products.length} has ${payment.status} status`}
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
                <Card style={ { marginTop: '16px',    width: 'max-content'} } className="bg-secondary shadow">
                  <CardHeader>
                    <h3 className="mb-0">Shipment </h3>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    {this.props.payments !== undefined ? (this.props.payments.map((item,index)=> (
                      this.renderHistoryItem(item, index)
                      ))) : null}
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
  const payment = payments.getEntities(state);
  const mappedProducts = [];
  if (payment) {
    for (const key in payment) {
      const item = payment[key]
      if (item) {
        mappedProducts.push({
          ...item
        });
      }
    }
  }
  console.log(mappedProducts);
  return {
    payments: mappedProducts
  };
}

export default connect(mapStateToProps)(UserHeader);
