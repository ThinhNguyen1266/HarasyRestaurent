import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Register.css";
import useAccountApi from "../hooks/api/useAccountApi";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function Register() {
  const { Register } = useAccountApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    dob: "",
    fullName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email" && value) {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Please enter a valid email address",
      }));
    }
  };

  const saveRegisMutate = useMutation({
    mutationFn: Register,
    onSuccess: () => {
      toast.success(" Registed successfully!");
      navigate("/otp", { state: { email: formData.email } });
    },
    onError: (error) => {
      toast.error(`Failed to regist : ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    handleRegis();
  };
  const handleRegis = async () => {
    const { dobMonth, dobDay, dobYear } = formData;
    const formattedDob =
      dobMonth && dobDay && dobYear
        ? `${dobYear}-${dobMonth.padStart(2, "0")}-${dobDay.padStart(2, "0")}`
        : "";

    const payload = {
      username: formData.username,
      password: formData.password,
      phone: formData.phone,
      dob: formattedDob,
      email: formData.email,
      fullName: formData.fullName,
    };
    console.log("Payload sent to API regis:", JSON.stringify(payload, null, 2));
    try {
      // Perform the mutation
      await saveRegisMutate.mutateAsync(payload); // Using mutateAsync for async/await
      setIsLoading(false); // Stop loading on success
    } catch (error) {
      setIsLoading(false); // Stop loading on error
    }
  };

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

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className="text-white p-1">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>PHONE NUMBER</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formFullName">
                  <Form.Label>FULLNAME</Form.Label>
                  <Form.Control
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formUsername">
                  <Form.Label>USERNAME</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDOB">
                  <Form.Label>DATE OF BIRTH</Form.Label>
                  <Row className="custom-dob">
                    {" "}
                    <Col>
                      <Form.Select
                        name="dobDay"
                        value={formData.dobDay}
                        id="dobDay"
                        onChange={handleChange}
                      >
                        <option value="">Day</option>
                        {[...Array(31)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select
                        name="dobMonth"
                        id="dobMonth"
                        value={formData.dobMonth}
                        onChange={handleChange}
                      >
                        <option value="">Month</option>
                        {[...Array(12)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select
                        name="dobYear"
                        id="dobYear"
                        value={formData.dobYear}
                        onChange={handleChange}
                      >
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
                  disabled={isLoading}
                  variant="warning"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>

              <div className="login-link">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </div>
          </Col>
        </Row>
        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
}

export default Register;
