
import React from 'react';

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
import Header from "../../components/Headers/Header";
import SimpleHeader from "../../components/Headers/SimpleHeader";

class Shopcart extends React.Component {
  constructor(props) {
    super(props);
    // name, owner, price, location, storeName
    this.state = {
      items: [
        // {
        //   name: 'nume1-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 12,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.737465,
        //   lng: 21.192758
        // },
        // {
        //   name: 'nume2-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 1,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.747066,
        //   lng: 21.269838
        // },
        // {
        //   name: 'nume3-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 2,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.761322,
        //   lng: 21.279116
        // },
        // {
        //   name: 'nume4-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 3,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.765037,
        //   lng: 21.231543
        // },
        // {
        //   name: 'nume5-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 5,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.765037,
        //   lng: 21.231543
        // },
        // {
        //   name: 'nume6-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 9,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.765037,
        //   lng: 21.231543
        // },
        // {
        //   name: 'nume7-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 1,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.765037,
        //   lng: 21.231543
        // },
        // {
        //   name: 'nume8-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 1,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.765037,
        //   lng: 21.231543
        // },
        // {
        //   name: 'nume9-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 1,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.765037,
        //   lng: 21.231543
        // },
        // {
        //   name: 'nume10-produs',
        //   owner: 'numeOnwer',
        //   price: 121,
        //   quantity: 1,
        //   location: '341fsafsdf',
        //   storeName: 'fadsfasdfasdfSTORE',
        //   lat: 45.762037,
        //   lng: 21.231513
        // }
      ],
        totalPrice: 0
    };
  }

  componentDidMount() {
      this.setState({totalPrice: this.getTotalPriceOfItems()});
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

  getTotalPriceOfItems(){
      let price = 0;
      for(const item of this.state.items){
          price+=item.price;
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
                  {this.state.items.map((item, index) => this.createItemInTable({ ...item }, index))}
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
          <>        <SimpleHeader totalPrice={this.state.totalPrice} onChangeTab={ this.onOtherThingSelected } />

              {this.renderTable()}
          </>
      );
    }
}

export default Shopcart;
