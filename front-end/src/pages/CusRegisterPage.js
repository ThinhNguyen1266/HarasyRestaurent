import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/CusRegister.css"; 

const CusRegisterPage = () => {
  return (
    <div className="register-page">
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col md={12} className="text-center">
            <div className="register-box">
              <div className="formName" style={{ fontSize: "1.5rem" }}>
                NEW CUSTOMER SIGNUP
              </div>

              <Form>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>PHONE NUMBER</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                  />{" "}
                  {/* Placeholder added */}
                </Form.Group>

                <Form.Group controlId="formFullName">
                  <Form.Label>FULLNAME</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                  />{" "}
                  {/* Placeholder added */}
                </Form.Group>

                <Form.Group controlId="formDOB">
                  <Form.Label>DATE OF BIRTH</Form.Label>
                  <Row className="custom-dob">
                    <Col>
                      <Form.Select>
                        <option value="">Month</option>
                        {/* Month options */}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select>
                        <option value="">Day</option>
                        {/* Day options */}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select>
                        <option value="">Year</option>
                        {/* Year options */}
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>

                <Button
                  className="register-button"
                  variant="warning"
                  type="submit"
                >
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CusRegisterPage;
