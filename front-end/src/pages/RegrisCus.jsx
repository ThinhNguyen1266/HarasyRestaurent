import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import "../assets/styles/RegrisCus.css";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import useQuickRegis from "../hooks/api/useQuickRegis";

const RegrisCus = () => {
  const { quickRegis } = useQuickRegis();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    return fullName.trim() !== "" && fullNameRegex.test(fullName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Please enter a valid email address",
      }));
    } else if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullName: validateFullName(value)
          ? ""
          : "Full name must contain only letters and spaces",
      }));
    }
  };

  const saveBranchMutate = useMutation({
    mutationFn: quickRegis,
    onSuccess: () => {
      toast.success("Customer registered successfully!");
      setFormData({ fullName: "", email: "" }); 
    },
    onError: (error) => {
      toast.error(`Failed to register customer: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }
    if (!validateFullName(formData.fullName)) {
      validationErrors.fullName =
        "Full name must contain only letters and spaces";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true); 
    RegisNewCus();
  };

  const RegisNewCus = async () => {
    const payload = {
      email: formData.email,
      fullName: formData.fullName,
    };
    console.log("Payload sent to API regis:", JSON.stringify(payload, null, 2));
    try {
      
      await saveBranchMutate.mutateAsync(payload); 
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
    }
  };

  return (
    <div className="background-quickregris-container">
      <div className="blur-overlay">
        <h1 className="text-white text-center mb-4">Registration</h1>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label className="text-white p-1">Email</Form.Label>
            <Form.Control
              className="quickregris-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label className="text-white p-1">Full Name</Form.Label>
            <Form.Control
              className="quickregris-input"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 quickregis-button"
            disabled={isLoading}
            style={{ backgroundColor: isLoading ? "#d07c1c" : "#d07c1c" }}
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
              "Submit"
            )}
          </Button>
        </Form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RegrisCus;
