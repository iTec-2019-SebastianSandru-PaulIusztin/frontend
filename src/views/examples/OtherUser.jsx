import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Media, Row } from 'reactstrap';
import { connect } from 'react-redux';
import OtherUserHeader from '../../components/Headers/OtherUserHeader';
import { auth, shops } from '../../redux';

class OtherUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const id = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];

    if (id !== 'details') {
      dispatch(shops.getSellerShop(id))
    }
    else {
    }
  }


    renderItem = () => (
      <div>
        <Media className="align-items-center">

          <img
            alt="..."
            src={ require('../../assets/img/theme/bootstrap.jpg') }
          />
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            <div style={ { paddingBottom: '8px' } }>
              <h3 className="mb-0">owner</h3>
            </div>
            <div style={ { paddingBottom: '8px' } }>
              <h3 className="mb-0">price</h3>
            </div>
            <div style={ { paddingBottom: '8px' } }>
              <h3 className="mb-0">detaliaf</h3>
            </div>
            <Input
              placeholder="How many"
              type="number"
            />
          </div>

        </Media>

        <Button
          color="secondary"
          type="button"
        >
                Add to cart
        </Button>


      </div>

    )

    renderCard = () => (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Other person username</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="primary"
                href="#pablo"
                onClick={ (e) => e.preventDefault() }
                size="sm"
              >
                                View User
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {this.renderItem()}
        </CardBody>
      </Card>
    );

    render() {
      return (
        <>
          <OtherUserHeader />
          <Container className="mt--7" fluid>

            {this.renderCard()}
          </Container>
        </>
      );
    }
}

function mapStateToProps(state) {
  return {
    shop: shops.getSellerCartProducts(state)
  }
}

export default connect()(OtherUser);
