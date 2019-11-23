import React from 'react';
import { connect } from 'react-redux';
import { CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap';

export class AddProduct extends React.Component {



  render() {
    return (
      <Form>

        <h6 className="heading-small text-muted mb-4">
                    User information
        </h6>
        <div className="pl-lg-4">

          <Row>
            <Col lg="6">

              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                                    Username
                </label>
                <Input
                  className="form-control-alternative"
                  onChange={ (e) => this.updateName(e) }
                  id="input-username"
                  placeholder="Username"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-email"
                >
                                    Email address
                </label>
                <Input
                  disabled
                  className="form-control-alternative"
                  id="input-email"
                  placeholder="jesse@example.com"
                  type="email"
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
                                    First name
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-first-name"
                  placeholder="First name"
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
                                    Last name
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-last-name"
                  placeholder="Last name"
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
                                    Phone number
                </label>
                <Input
                  className="form-control-alternative"

                  id="input-last-name"
                  placeholder="Last name"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <hr className="my-4" />
      </Form>
    )}
}


export default connect()(AddProduct);
