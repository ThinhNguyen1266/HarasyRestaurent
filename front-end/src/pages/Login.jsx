import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/Login.css";

function Login() {
  return (
    <div className="login-page">
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col md={12} className="text-center">
            <div className="login-box">
              <Link to="/" className="brand-logo">
                <img
                  src={require("../assets/img/logo.png")}
                  alt="Logo"
                  className="d-inline-block align-top"
                />
              </Link>

              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <div className="forgot-password-link">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>

                <Button
                  className="login-button"
                  variant="warning"
                  type="submit"
                >
                  Log In
                </Button>
              </Form>

              <div className="register-link">
                Need an account? <Link to="/register">Register</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
