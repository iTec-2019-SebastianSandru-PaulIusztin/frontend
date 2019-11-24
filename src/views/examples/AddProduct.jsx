import React from 'react';
import { connect } from 'react-redux';
import {Button, CardBody, Col, Form, FormGroup, Input, Row} from 'reactstrap';
import Files from "react-files";

const vegetables = [
  'artichoke',
  'aubergine (eggplant)',
  'asparagus',
  'legumes',
  'alfalfa sprouts',
  'azuki beans (or adzuki)',
  'bean sprouts',
  'black beans',
  'black-eyed peas',
  'borlotti bean',
  'broad beans',
  'chickpeas, garbanzos, or ceci beans',
  'green beans',
  'lima beans or Butter bean',
  'mung beans',
  'navy beans',
  'pinto beans',
  'runner beans',
  'split peas',
  'soy beans',
  'peas',
  'mangetout or snap peas',
  'broccoflower (a hybrid)',
  'broccoli (calabrese)',
  'brussels sprouts',
  'cabbage',
  'kohlrabi',
  'Savoy Cabbage',
  'Red Cabbage',
  'Pointed, or Sweetheart, Cabbage',
  'cauliflower',
  'celery',
  'endive',
  'fiddleheads',
  'frisee',
  'fennel',
  'greens',
  'beet greens (chard)',
  'bok choy',
  'chard (beet greens)',
  'collard greens',
  'kale',
  'mustard greens',
  'spinach',
  'herbs and spices',
  'anise',
  'basil',
  'caraway',
  'coriander (also known as cilantro)',
  'chamomile',
  'dill',
  'fennel',
  'lavender',
  'lemon Grass',
  'marjoram',
  'oregano',
  'parsley',
  'rosemary',
  'sage',
  'thyme',
  'lettuce',
  'arugula',
  'mushrooms (actually a fungus, not a plant)',
  'nettles',
  'New Zealand spinach',
  'okra',
  'onions',
  'Chives',
  'Garlic',
  'Leek',
  'onion',
  'shallot',
  'scallion (spring onion UK, green onion US)'
];


class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      subCategory: '',
      imgSrc: require('../../assets/img/theme/team-4-800x800.jpg'),
      price: '',
      quantity: ''
    };
  }


  createProduct = (e) => {
    //redux here
    console.log(this.state)
  }


  updateCategory = (e) => {
    this.setState({ category: e.target.value });
  }

  onFilesChange = (files) => {
    this.setState({ imgSrc: files[0].preview.url });
  }

  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  }

  updatePrice = (e) => {
    this.setState({ price: e.target.value });
  }

  updateQuantity = (e) => {
    this.setState({ subCategory: e.target.value });
  }

  updateSubcategory = (e) => {
    this.setState({ quantity: e.target.value });
  }

  render() {
    return (
      <Form>

        <h6 className="heading-small text-muted mb-4">
                    Product Information
        </h6>
        <div className="pl-lg-4">

          <Row>
            <Col lg="6">

              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                                    Category
                </label>
                <Input
                  className="form-control-alternative"
                  onChange={ (e) => this.updateCategory(e) }
                  id="input-username"
                  placeholder="Username"
                  type="select"
                >
                  <option>Tomatoes</option>
                  {vegetables.map((item, index) =><option key = {index}>{item}</option> )}
                </Input>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-email"
                >
                                    Subcategory
                </label>
                <Input
                  className="form-control-alternative"
                  onChange={ (e) => this.updateSubcategory(e) }

                  id="input-email"
                  placeholder="Subcategory"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-first-name"
                >
                                    Price per kilogram
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-first-name"
                  onChange={ (e) => this.updatePrice(e) }

                  placeholder="Price/kg"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-last-name"
                >
                                    Quantity
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-last-name"
                  onChange={ (e) => this.updateQuantity(e) }

                  placeholder="Quantity"
                  type="text"
                />
              </FormGroup>
            </Col>
            <div style={{margin:'auto',display: 'flex',alignItems: 'center', flexDirection: 'column'}}>
                <img
                    style={{maxWidth: '400px'}}
                    alt="..."
                    className="rounded-circle"
                    src={ this.state.imgSrc }
                />
                <Files
                style={ {
                  textAlign: 'center',
                  paddingTop: '5vh',
                  paddingBottom: '5vh'
                } }
                className="files-dropzone"
                onChange={ this.onFilesChange }
                onError={ this.onFilesError }
                accepts={ ['image/png', '.pdf', 'audio/*'] }
                multiple
                maxFiles={ 3 }
                maxFileSize={ 10000000 }
                minFileSize={ 0 }
                clickable
            >
              Drop files here or click to upload
            </Files>
            </div>

          </Row>
        </div>
        <Button
            color="secondary"
            type="button"
            onClick={(e)=> this.createProduct()}
        >
          Add Product
        </Button>
      </Form>
    );
  }
}


export default connect()(AddProduct);
