import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/Login.css";
import useAuthApi from "../hooks/api/useAuthApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Both username and password are required.");
      return;
    }

    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    if (!alphanumericPattern.test(username)) {
      setError("Username can only contain letters and numbers.");
      return;
    }

    const user = {
      username,
      password,
    };

    const response = await login(user, dispatch, navigate, location);
    console.log("API Response:", response);

    if (response && response.code === 401) {
      setError("Incorrect username or password.");
    } else if (response && response.code === 200) {
      setError("");
      toast.success(response.message || "Login successful!");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

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

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>

                {error && <div className="error-message">{error}</div>}

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
