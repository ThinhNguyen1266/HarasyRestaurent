import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/OTP.css";

const OTP = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit input to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    // Add logic to validate OTP
  };

  return (
    <div className="otp-page">
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col md={12} className="text-center">
            <div className="otp-box">
              <Link to="/" className="brand-logo">
                <img
                  src={require("../assets/img/logo.png")}
                  alt="Logo"
                  className="d-inline-block align-top"
                />
              </Link>
              {/* Title and Subtitle */}
              <h2 className="otp-title">Enter OTP</h2>
              <p className="otp-subtitle">
                Please enter the 6-digit OTP sent to your email.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="otpInput">
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleChange}
                    className="otp-input"
                  />
                </Form.Group>
                <Button className="otp-button" variant="warning" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OTP;
