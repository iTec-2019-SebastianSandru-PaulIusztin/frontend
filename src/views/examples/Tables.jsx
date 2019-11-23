
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
  UncontrolledTooltip, Input, Col
} from 'reactstrap';
// core components
import Header from '../../components/Headers/Header';


class Tables extends React.Component {
  constructor(props) {
    super(props);
    // name, owner, price, location, storeName
    this.state = {
      items: [
        {
          name: 'nume1-produs',
          owner: 'numeOnwer',
          price: 121,
          location: '341fsafsdf',
          storeName: 'fadsfasdfasdfSTORE'
        },
        {
          name: 'nume1-produs',
          owner: 'numeOnwer',
          price: 121,
          location: '341fsafsdf',
          storeName: 'fadsfasdfasdfSTORE'
        },
        {
          name: 'nume1-produs',
          owner: 'numeOnwer',
          price: 121,
          location: '341fsafsdf',
          storeName: 'fadsfasdfasdfSTORE'
        },
        {
          name: 'nume1-produs',
          owner: 'numeOnwer',
          price: 121,
          location: '341fsafsdf',
          storeName: 'fadsfasdfasdfSTORE'
        },
        {
          name: 'nume1-produs',
          owner: 'numeOnwer',
          price: 121,
          location: '341fsafsdf',
          storeName: 'fadsfasdfasdfSTORE'
        }
      ],
      isListSelected: true
    };
  }

  createItemInTable({ name, owner, price, location, storeName }) {
    console.log('fsdfsd', this.state.items);
    return (
        <tr>
          {/** IMAGE AND NAME * */}

          <th scope="row">
            <Media className="align-items-center">
              <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={ (e) => e.preventDefault() }
              >
                <img
                    alt="..."
                    src={ require('../../assets/img/theme/bootstrap.jpg') }
                />
              </a>
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
            <Input
                placeholder="How many"
                type="number"
            />
          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={ (e) => e.preventDefault() }
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                    href="#pablo"
                    onClick={ (e) => e.preventDefault() }
                >
                  Add to cart
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
    );
  }


  onOtherThingSelected = (isListSelected) => {
    if (isListSelected) {
      this.setState({ isListSelected: true });
      console.log(this.state.items);

    }
    else {
      this.setState({ isListSelected: false });
      console.log(this.state.items);

    }
  };

  renderTable = () => (
    <Container className="mt--7" fluid>
      {/* Table */}
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
                {this.state.items.map((item) => this.createItemInTable({ ...item }))}
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

  renderGridItem = ({ name, owner, price, location, storeName }) => (
    <Col className="col-sm" style={ { padding: 24 } }>
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="mb-0">One of three columns</h3>
        </CardHeader>
        <Media className="align-items-center">

          <img
            alt="..."
            src={ require('../../assets/img/theme/bootstrap.jpg') }
          />
          <Media>
            <span className="mb-0 text-sm">
              name
            </span>
          </Media>
        </Media>
      </Card>
    </Col>
  );

  transformForGridRecursive(list, isTakingTwo, result = []) {
    if (list.length === 0) {
      console.log(result);
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
    const stateItems = [...this.state.items];
    this.transformForGridRecursive(stateItems, true, newList);
    return (
      <Container className="mt--7" fluid>
        {newList.map((list) => (
          <Row>
            {list.map((item) => this.renderGridItem({ ...item }))}
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
        { this.state.isListSelected ? (this.renderTable()
        ) : (this.renderGrid())
        }
      </>
    );
  }
}

export default Tables;
