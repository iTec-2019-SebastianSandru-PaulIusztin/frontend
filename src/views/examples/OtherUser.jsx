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
import { auth, shops } from '../../redux';

class OtherUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: 0,
    };
  }



  componentDidMount() {
    const { dispatch } = this.props;

    const id = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1];
  console.log(id);
    if (id !== 'details') {
      dispatch(shops.getSellerShop(id.split("=")[0]));
      this.setState({itemID: id.split("=")[1]});
    }
    else {
    }
  }

  goToDetails = (sellerId, id) => {

    console.log('fsadfsadf');
    console.log(this.props.prod);
    this.props.history.replace(`/admin/details/${sellerId}=${id}`);
  };

    renderGridItem = ({ name, owner, price, location, storeName, seller_id, id, imgSrc }, index) => (
      <Col key={ index } className="col-sm" style={ { padding: 24 } }>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h1 className="mb-0">{name}</h1>
          </CardHeader>
          <Media className="align-items-center">

            <img
                style={{cursor: 'pointer'}}
                onClick={ (e) => this.goToDetails(seller_id, id) }
                className="align-items-center"
              src={ imgSrc }>
            </img>
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
      const { shop } = this.props
      if(shop) {
        const { products } = shop
        if(products) {
          const newList = [];
          const stateItems = [...products];
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
            }
      }
    };

    renderItem = () => {
      if(this.props.shop === undefined || this.props.shop.products===undefined){
        return (<></>)
      }
      console.log(this.props.shop.products[5]);
      const itemID = (this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1].split("=")[1]);
      let foundItem;
      for(const item of this.props.shop.products){
        if(item.id === itemID){
          foundItem = item;
          console.log('fdsfasfasdfas')
          break;
        }
      }

      console.log(foundItem);
      return (<div>
        <Media className="align-items-center">

          <img
              alt="..."
              src={require('../../assets/img/theme/bootstrap.jpg')}
          />
          <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', width: '50vh'}}>
            <div style={{paddingBottom: '8px'}}>
              <h1 className="mb-0">Paul Iusztin</h1>
            </div>
            <div style={{paddingBottom: '8px'}}>
              <h4 className="mb-0">100 RON</h4>
            </div>
            <div style={{paddingBottom: '8px'}}>
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


      </div>)

    }

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
            {this.renderGrid()}
          </Container>
        </>
      );
    }
}

function mapStateToProps(state) {
  const apiShop = shops.getSellerCartProducts(state)
  const mappedProducts = [];
  let shop = {}

  if(apiShop && apiShop.products) {
    for (const key in apiShop.products) {
      const item = apiShop.products[key]
      if (item) {
        mappedProducts.push({
          id: item.id,
          name: item.category && item.category.name,
          owner: item.seller.name,
          price: item.price,
          quantity: item.counter,
          location: item.seller.address.city,
          seller_id: item.seller.id,
          storeName: item.store_name,
          lat: item.lat,
          lng: item.lng,
          imgSrc: item.photos[0] ? item.photos[0].photo :require('../../assets/img/theme/bootstrap.jpg')
        });
      }
    }

    shop = {
      ...apiShop,
      products: mappedProducts
    }
  }

  return {
    shop
  }
}

export default connect(mapStateToProps)(OtherUser);
