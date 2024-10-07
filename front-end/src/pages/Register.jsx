import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/Register.css";

function Register() {
  return (
    <div className="register-page">
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col md={12} className="text-center">
            <div className="register-box">
              <Link to="/" className="brand-logo">
                <img
                  src={require("../assets/img/logo.png")}
                  alt="Logo"
                  className="d-inline-block align-top"
                />
              </Link>

              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>EMAIL</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>PHONE NUMBER</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="formFullName">
                  <Form.Label>FULLNAME</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="formUsername">
                  <Form.Label>USERNAME</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="formDOB">
                  <Form.Label>DATE OF BIRTH</Form.Label>
                  <Row className="custom-dob">
                    {" "}
                    {/* Thêm lớp custom-dob */}
                    <Col>
                      <Form.Select>
                        <option value="">Month</option>
                        {[...Array(12)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select>
                        <option value="">Day</option>
                        {[...Array(31)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select>
                        <option value="">Year</option>
                        {[...Array(100)].map((_, index) => {
                          const year = new Date().getFullYear() - index;
                          return (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          );
                        })}
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

              <div className="login-link">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
