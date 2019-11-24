
import React from 'react';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip, Input, Col, Button, Alert
} from 'reactstrap';
// core components
import { connect } from 'react-redux';
import Header from '../../components/Headers/Header';
import Maps from './Map';
import { auth, products, shops } from "../../redux";


class Tables extends React.Component {
  constructor(props) {
    super(props);
    // name, owner, price, location, storeName
    this.state = {
      items: [],
      isListSelected: 'list',
      quantities: [],
      isError: false,
      areButtonsDisabled: this.props.user === undefined
    };
  }

  componentDidMount() {
    const quantities = this.props.prod.map((item) => ({ itemIndex: this.props.prod.indexOf(item), quantity: 0 }));
    this.setState({ quantities: [...quantities] });
  }

  renderError = () => (
    <Alert color="warning">
      <strong>Error !</strong>
      {' '}
        Bad Quantity !
    </Alert>
  );


  getItem = (e, index) => {
    e.preventDefault();

    const item = this.props.prod[index];
    if (item.quantity < parseInt(this.state.quantities[index].quantity, 10)) {
      this.setState({ isError: true });
      window.scrollTo(0, 0);
      setTimeout(() => this.setState({ isError: false }), 4000);
    }
    else {
      const { dispatch } = this.props
      dispatch(shops.addToCart(item))
    }
  };

  goToDetails = (sellerId, id) => {
    console.log('fsadfsadf');
    console.log(this.props.prod);
    this.props.history.replace(`/admin/details/${sellerId}=${id}`);
  };

  createItemInTable({ name, owner, price, location, storeName, seller_id, id }, index) {
    return (
      <tr
        key={ index }
      >
        {/** IMAGE AND NAME * */}

        <th scope="row">
          <Media
              onClick={ (e) => this.goToDetails(seller_id, id ) }
              style={ { cursor: 'pointer' } }
              className="align-items-center">
            <img
                alt="..."
              src={ require('../../assets/img/theme/bootstrap.jpg') }
            />
            <Media>
              <span className="mb-0 text-sm">
                {name}
              </span>
            </Media>
          </Media>
        </th>
        {/** PRICE PER KG* */}
        <td>
          <div onClick={ (e) => this.goToDetails(seller_id, id) }
               style={ { cursor: 'pointer' } }>
          {`${price}lei`}
          </div>
          </td>
        <td>
          <Badge onClick={ (e) => this.goToDetails(seller_id, id ) }
                 style={ { cursor: 'pointer' } }
                 color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {location}
          </Badge>
        </td>
        <td>
          {/** NAME AND STORE * */}
          <div onClick={ (e) => this.goToDetails(seller_id, id ) }
               style={ { cursor: 'pointer' } }>
            {' '}
            { `${owner} ${storeName}`}
          </div>

        </td>

        {/**       DROP DOWN * */}
        <td>
          <Input
            onChange={ (e) => this.updateQuantity(e, index) }
            placeholder="How many"
            type="number"
          />
        </td>
        <td className="text-right">
          <Button
            disabled={ this.state.areButtonsDisabled }
            onClick={ (e) => this.getItem(e, index) }
            color="primary"
            type="button"
          >
              Add to cart
          </Button>
        </td>
      </tr>
    );
  }


  onOtherThingSelected = (isListSelected) => {
    if (isListSelected === 'list') {
      this.setState({ isListSelected: 'list' });
    }
    else if (isListSelected === 'map') {
      this.setState({ isListSelected: 'map' });
    }
    else {
      this.setState({ isListSelected: 'grid' });
    }
  };

  renderTable = () => (
    <Container className="mt--7" fluid>
      {/* Table */}
      {this.state.isError ? this.renderError() : null}

      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Card tables</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Cost/kg</th>
                  <th scope="col">Location</th>
                  <th scope="col">Store and owner</th>
                  <th scope="col">Counter</th>

                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {this.props.prod.map((item, index) => this.createItemInTable({ ...item }, index))}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem className="disabled">
                    <PaginationLink
                      href="#pablo"
                      onClick={ (e) => e.preventDefault() }
                      tabIndex="-1"
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="active">
                    <PaginationLink
                      href="#pablo"
                      onClick={ (e) => e.preventDefault() }
                    >
                        1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={ (e) => e.preventDefault() }
                    >
                        2
                      {' '}
                      <span className="sr-only">(current)</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={ (e) => e.preventDefault() }
                    >
                        3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={ (e) => e.preventDefault() }
                    >
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </div>
      </Row>
    </Container>
  );

  updateQuantity = (e, index) => {
    e.preventDefault();
    const newQuantities = this.state.quantities;
    const foundIndex = newQuantities.findIndex((x) => x.itemIndex === index);
    newQuantities[foundIndex] = { itemIndex: index, quantity: e.target.value };
    this.setState({ quantities: newQuantities });
  };

  renderGridItem = ({ name, owner, price, location, storeName, seller_id}, index) => (
    <Col key={ index } className="col-sm" style={ { padding: 24 } }>
      <Card className="shadow">
        <CardHeader className="border-0">
          <h1 className="mb-0">{name}</h1>
        </CardHeader>
        <Media style={{cursor: 'pointer'}}
               onClick={ (e) => this.goToDetails(seller_id) }
               className="align-items-center">

          <img
            alt="..."
            src={ require('../../assets/img/theme/bootstrap.jpg') }
          />
          <div
              onClick={ (e) => this.goToDetails(seller_id) }
              style={ { display: 'flex', cursor: 'pointer', flexDirection: 'column'  } }>
            <div style={ { paddingBottom: '8px' } }>
              <h3 className="mb-0">{owner}</h3>
            </div>
            <div style={ { paddingBottom: '8px' } }>
              <h3 className="mb-0">{`${price} lei / Kg`}</h3>
            </div>
            <div style={ { paddingBottom: '8px' } }>
              <h3 className="mb-0">{`${storeName} ,${location}`}</h3>
            </div>
            <Input
              onChange={ (e) => this.updateQuantity(e, index) }
              placeholder="How many"
              type="number"
            />
          </div>

        </Media>

        <Button
          onClick={ (e) => this.getItem(e, index) }
          color="secondary"
          disabled={ this.state.areButtonsDisabled }
          type="button"
        >
          Add to cart
        </Button>
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

  // [ [1,2], [3,4,5], [1,2] ]
  renderGrid = () => {
    const newList = [];
    const stateItems = [...this.props.prod];
    this.transformForGridRecursive(stateItems, true, newList);
    let itemId = 0;
    return (
      <Container className="mt--7" fluid>
        {this.state.isError ? this.renderError() : null}

        {newList.map((list, firstIndex) => (
          <Row key={ firstIndex }>
            {list.map((item, index) => this.renderGridItem({ ...item }, itemId++))}
          </Row>
        ))}
      </Container>
    );
  };

  render() {
    return (
      <>

        <Header onChangeTab={ this.onOtherThingSelected } />
        {/* Page content */}

        { this.state.isListSelected === 'list' ? (this.renderTable())
          : (this.state.isListSelected === 'map' ? (<Maps data={ this.props.prod } />) : (this.renderGrid()))
        }
      </>
    );
  }
}

function mapStateToProps(state) {
  const prod = products.getEntities(state);
  const mappedProducts = [];

  for (const key in prod) {
    const item = prod[key];
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
        lng: item.lng
      });
    }
  }

  return {
    user: auth.getCurrentUser(state),
    prod: mappedProducts
  };
}

export default connect(mapStateToProps)(Tables);
