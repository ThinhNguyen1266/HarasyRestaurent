import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/OTP.css";
import useAccountApi from "../hooks/api/useAccountApi";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const OTP = () => {
  const { sentOtp } = useAccountApi();
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  console.log(email);

  const [formData, setFormData] = useState({
    email: "",
    token: "",
  });

  const saveOtpMutate = useMutation({
    mutationFn: sentOtp,
    onSuccess: () => {
      toast.success("Valid OTP!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(`Failed to validate OTP: ${error.message}`);
    },
  });

  const SendOtp = async () => {
    const payload = {
      email: email,
      token: formData.token,
    };
    console.log("Payload sent to API otp:", JSON.stringify(payload, null, 2));
    try {
      // Perform the mutation
      await saveOtpMutate.mutateAsync(payload);
    } catch (error) {}
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit input to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        token: value, // Update the token field in formData
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SendOtp();
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
                    value={formData.token}
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
        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
};

export default OTP;
