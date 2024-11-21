import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  FaLocationDot,
  FaRegCalendar,
  FaRegClock,
  FaRegUser,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/ConfirmReservation.css";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
const ConfirmReservation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const params = new URLSearchParams(location.search);
  const branch = params.get("branch");
  const time = params.get("time");
  const guest = params.get("guest");
  const branchLocation = params.get("location");
  const date = params.get("date");
  const [formData, setFormData] = useState({
    email: user?.email || "", // Điền trước nếu user đã đăng nhập
    fullname: user?.fullName || "", // Điền trước nếu user đã đăng nhập
  });

  const [errors, setErrors] = useState({
    email: "",
    fullname: "",
    termsAccepted: "",
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [id]: "" });
  };

  const handleConfirmReservation = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.fullname) newErrors.fullname = "Full name is required.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions.";

    setErrors(newErrors);

    // Nếu không có lỗi, tiến hành xác nhận đặt bàn
    if (Object.keys(newErrors).length === 0) {
      console.log("Reservation Confirmed", {
        email: formData.email,
        fullname: formData.fullname,
        branch,
        date,
        time,
        guest,
      });
      alert("Reservation confirmed successfully!");
    }
  };
  return (
    <div className="cr-page">
      <Container
        fluid
        className="h-100 d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col md={12} className="text-center">
            <div className="cr-logo">
              <Link to="/">
                <img
                  src={require("../assets/img/logo.png")}
                  alt="Logo"
                  className="d-inline-block align-top"
                />
              </Link>
            </div>
            <div className="cr-box">
              <div className="cr-header">
                <h2 className="cr-title">{branch}</h2>
                <div className="cr-steps">
                  <h3 className="cr-steps-title">
                    <span>1. FIND A TABLE</span>
                    &nbsp;&nbsp;
                    <span className="active-step">2. YOUR DETAILS</span>
                  </h3>
                </div>
                <hr className="cr-steps-divider" />
              </div>

              <Row>
                <Col md={6} className="form-section">
                  <Form>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!!user}
                      />
                      {errors.email && (
                        <div className="error-text">{errors.email}</div>
                      )}
                    </Form.Group>
                    <Form.Group controlId="fullname">
                      <Form.Control
                        type="text"
                        placeholder="Fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        disabled={!!user} // Khóa trường nếu user đã đăng nhập
                      />
                      {errors.fullname && (
                        <div className="error-text">{errors.fullname}</div>
                      )}
                    </Form.Group>
                    <Form.Group controlId="occasion">
                      <Form.Control as="select">
                        <option>GENERAL</option>
                        <option>BIRTHDAY</option>
                        <option>WEDDING</option>
                      </Form.Control>
                    </Form.Group>
                    <div className="required-label">Required:</div>
                    <Form.Group controlId="terms" className="checkbox-group">
                      <Form.Check
                        type="checkbox"
                        label="I agree to the restaurant's terms and conditions."
                      />
                      {errors.termsAccepted && (
                        <div className="error-text">{errors.termsAccepted}</div>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6} className="info-section">
                  <div className="restaurant-info">
                    <h4>{branch}</h4>
                    <p>
                      <FaRegCalendar className="icon-spacing" />
                      {date}
                    </p>
                    <p>
                      <FaRegClock className="icon-spacing" />
                      {time}
                    </p>
                    <p>
                      <FaRegUser className="icon-spacing" /> {guest} people
                    </p>
                    <p>
                      <FaLocationDot className="icon-spacing" />
                      {branchLocation}
                    </p>

                    <hr className="cr-info-divider" />
                    <h5 className="orange-text">
                      Important dining information
                    </h5>
                    <p>
                      We have a 15 minute grace period. Please call us if you
                      are running later than 15 minutes after your reservation
                      time.
                    </p>
                    <p>
                      We may contact you about this reservation, so please
                      ensure your email and phone number are up to date.
                    </p>
                    <h5 className="orange-text">A note from the restaurant</h5>
                    <p>
                      Dress Code: Smart Casual. No athletic/gym wear or flip
                      flops.
                    </p>
                  </div>
                </Col>
              </Row>
              <div className="confirm-btn-container">
                <Button
                  className="confirm-btn"
                  onClick={handleConfirmReservation}
                >
                  Confirm reservation
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConfirmReservation;
