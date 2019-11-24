
import React from 'react';
import { connect } from 'react-redux';

import {
  Badge, Card, CardFooter, CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Media, Pagination, PaginationItem, PaginationLink, Row, Table,
  UncontrolledDropdown
} from 'reactstrap';
import Header from '../../components/Headers/Header';
import SimpleHeader from '../../components/Headers/SimpleHeader';

import { shops, payments } from '../../redux';

class Shopcart extends React.Component {
  constructor(props) {
    super(props);
    // name, owner, price, location, storeName
    this.state = {
      items: [
      ],
      totalPrice: 0
    };
  }

  componentDidMount() {
    this.setState({ totalPrice: this.getTotalPriceOfItems() });
  }

  buy = () => {
    const { dispatch, prod } = this.props
    const payload = {
      payment_products: prod.map((item) => ({ product_id: item.id,  counter: Math.floor(Math.random() * item.quantity * 0.40)}) )
    }
    dispatch(payments.createPayment(payload))
  }

  createItemInTable({ name, owner, price, location, storeName, quantity }, index) {
    return (
      <tr key={ index }>
        {/** IMAGE AND NAME * */}

        <th scope="row">
          <Media className="align-items-center">
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
        <td>{`${price}lei`}</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {location}
          </Badge>
        </td>
        <td>
          {/** NAME AND STORE * */}
          { `${owner} ${storeName}`}
        </td>

        {/**       DROP DOWN * */}
        <td>
          {/** NAME AND STORE * */}
          { `${quantity}`}
        </td>
      </tr>
    );
  }

  getTotalPriceOfItems() {
    let price = 0;
    const { prod } = this.props;

    if (prod) {
      for (const item of prod) {
        price += item.price;
      }
    }
    return price;
  }

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
                  {this.props.prod && this.props.prod.map((item, index) => this.createItemInTable({ ...item }, index))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="..." />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    );

    render() {
      return (
        <>
          {' '}
          <SimpleHeader buy={ this.buy } totalPrice={ this.state.totalPrice } onChangeTab={ this.onOtherThingSelected } />

          {this.renderTable()}
        </>
      );
    }
}

function mapStateToProps(state) {
  const prod = shops.getCurrentCartProducts(state);
  const mappedProducts = [];

  if(prod) {
    for (const key in prod) {
      const item = prod[key].product
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
  }

  return {
    prod: mappedProducts
  };
}

export default connect(mapStateToProps)(Shopcart);
