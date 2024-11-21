import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/Login.css";
import useAccountApi from "../hooks/api/useAccountApi";

function ChangePasswork() {
  const [newPass, setnewPass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] =useState("")
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { changePassWord } = useAccountApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!newPass.trim() || !password.trim()) {
      setError("Both new and old password are required.");
      return;
    }

    const user = {
      newPass,
      password,
      confirmPass
    };
    console.log(user);
    
    const response = await changePassWord(user);
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
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                  <Form.Control
                    type="text"
                    placeholder="confirmPass"
                    value={confirmPass}
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formUsername">
                  <Form.Control
                    type="text"
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e) => {
                      setnewPass(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>

                {error && <div className="error-message">{error}</div>}

                <Button
                  className="login-button"
                  variant="warning"
                  type="submit"
                >
                  Change password
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChangePasswork;
