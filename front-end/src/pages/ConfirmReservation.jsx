import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  FaLocationDot,
  FaRegCalendar,
  FaRegClock,
  FaRegUser,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/ConfirmReservation.css";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useReservationApi from "../hooks/api/userReservationApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";
const ConfirmReservation = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const params = new URLSearchParams(location.search);
  const branchId = params.get("branchid");
  const branch = params.get("branch");
  const time = params.get("time");
  const guest = params.get("guests");
  const branchLocation = params.get("location");
  const date = params.get("date");
  const [formData, setFormData] = useState({
    email: user?.email || "", // Điền trước nếu user đã đăng nhập
    fullname: user?.fullName || "", // Điền trước nếu user đã đăng nhập
  });
  const { cusCreateReservation } = useReservationApi();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: cusCreateReservation,
    onError: (error) => {
      console.error(`Failed to update reservation status: ${error.message}`);
    },
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
  const [type, setType] = useState(1);
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleConfirmReservation = () => {

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.fullname) newErrors.fullname = "Full name is required.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions.";

    setErrors(newErrors);
    console.log("acc", user );

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
      const reservationData = {
        branchId: branchId,
        customerId: user.customerId,
        date: date,
        time: time,
        amountGuest: guest,
        typeId: type,
      };
      mutation.mutate(reservationData, {
        onSuccess: () => {
          alert("Reservation confirmed successfully!");
          navigate("/"); // Navigate to the Home page after the alert is acknowledged
        },
        onError: (error) => {
          console.error("Error confirming reservation:", error.message);
          alert("Failed to confirm reservation.");
        },
      });
  }};
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
                    <Form.Group controlId="type">
                      <Form.Control
                        as="select"
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <option value={1}>GENERAL</option>
                        <option value={2}>BIRTHDAY</option>
                        <option value={3}>WEDDING</option>
                      </Form.Control>
                    </Form.Group>
                    <div className="required-label">Required:</div>
                    <Form.Group
                      controlId="termsAccepted"
                      className="checkbox-group"
                    >
                      <Form.Check
                        type="checkbox"
                        label="I agree to the restaurant's terms and conditions."
                        checked={formData.termsAccepted || false}
                        onChange={handleInputChange}
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
