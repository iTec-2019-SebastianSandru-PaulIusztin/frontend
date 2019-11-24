import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Media,
  Row
} from 'reactstrap';
import { connect } from 'react-redux';
import OtherUserHeader from '../../components/Headers/OtherUserHeader';
import { auth } from '../../redux';

class OtherUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    console.log('fdsfasd');
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const id = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];

    if (id !== 'details') {
    }
    else {
    }
  }

    renderGridItem = ({ name, owner, price, location, storeName }, index) => (
      <Col key={ index } className="col-sm" style={ { padding: 24 } }>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h1 className="mb-0">{name}</h1>
          </CardHeader>
          <Media className="align-items-center">

            <img
              alt="..."
              src={ require('../../assets/img/theme/bootstrap.jpg') }
            />
            <div style={ { display: 'flex', flexDirection: 'column' } }>
              <div style={ { paddingBottom: '8px' } }>
                <h3 className="mb-0">{owner}</h3>
              </div>
              <div style={ { paddingBottom: '8px' } }>
                <h3 className="mb-0">{`${price} lei / Kg`}</h3>
              </div>
              <div style={ { paddingBottom: '8px' } }>
                <h3 className="mb-0">{`${storeName} ,${location}`}</h3>
              </div>
            </div>
          </Media>
        </Card>
      </Col>
    );

    transformForGridRecursive(list, isTakingTwo, result = []) {
      if (list.length === 0) {
        return result;
      }
      if (isTakingTwo) {
        const newList = [];
        newList.push(list.shift());
        if (list.length > 0) newList.push(list.shift());
        result.push(newList);
        this.transformForGridRecursive(list, !isTakingTwo, result);
      }
      else {
        const newList = [];
        newList.push(list.shift());
        if (list.length > 0) newList.push(list.shift());
        if (list.length > 0) newList.push(list.shift());
        result.push(newList);
        this.transformForGridRecursive(list, !isTakingTwo, result);
      }
    }

    renderGrid = () => {
      const newList = [];
      const stateItems = [...this.props.shop.products];
      this.transformForGridRecursive(stateItems, true, newList);
      let itemId = 0;
      return (
        <Container>
          {this.state.isError ? this.renderError() : null}

          {newList.map((list, firstIndex) => (
            <Row key={ firstIndex }>
              {list.map((item, index) => this.renderGridItem({ ...item }, itemId++))}
            </Row>
          ))}
        </Container>
      );
    };

    renderItem = () => (
      <div>
        <Media className="align-items-center">

          <img
            alt="..."
            src={ require('../../assets/img/theme/bootstrap.jpg') }
          />
          <div style={ { display: 'flex', flexDirection: 'column', margin: 'auto', width: '50vh' } }>
            <div style={ { paddingBottom: '8px' } }>
              <h1 className="mb-0">Paul Iusztin</h1>
            </div>
            <div style={ { paddingBottom: '8px' } }>
              <h4 className="mb-0">100 RON</h4>
            </div>
            <div style={ { paddingBottom: '8px' } }>
              <h4 className="mb-2">detaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliafdetaliaf</h4>
            </div>
            <Input
              placeholder="How many"
              className="mb-5"
              type="number"
            />
            <Button

              color="danger"
              type="button"
            >
                  Add to cart
            </Button>

          </div>

        </Media>


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
          <CardFooter className="bg-white border-0">
              <Row className="align-items-center">
                  <Col xs="8">
                      <h3 className="mb-0">User Other items </h3>
                  </Col>
              </Row>
          </CardFooter>
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

export default connect()(OtherUser);
