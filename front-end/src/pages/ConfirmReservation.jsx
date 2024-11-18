import { Button, Col, Container, Form, Row } from "react-bootstrap";

import {
  FaLocationDot,
  FaRegCalendar,
  FaRegClock,
  FaRegUser,
} from "react-icons/fa6";

import { Link, useLocation } from "react-router-dom";
import "../assets/styles/ConfirmReservation.css";

const ConfirmReservation = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const branch = params.get("branch");
  const time = params.get("time");

  const branchTitle =
    branch === "ho-chi-minh"
      ? "Reservation at Harasy Ho Chi Minh | Restaurant"
      : "Reservation at Harasy Ha Noi | Restaurant";

  const branchRestaurantInfo =
    branch === "ho-chi-minh"
      ? {
          name: "Harasy Ho Chi Minh | Restaurant",
          address: "456, District 1, Ho Chi Minh City",
        }
      : {
          name: "Harasy Ha Noi | Restaurant",
          address: "123, Hoan Kiem, Ha Noi",
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
                <h2 className="cr-title">{branchTitle}</h2>
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
                    <Form.Group controlId="firstName">
                      <Form.Control type="text" placeholder="First name" />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                      <Form.Control type="text" placeholder="Last name" />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                      <Form.Control type="tel" placeholder="Phone number" />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="occasion">
                      <Form.Control as="select">
                        <option>Birthday</option>
                        <option>Anniversary</option>
                        <option>Business Meeting</option>
                        <option>Other</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="specialRequest">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Add a special request"
                      />
                    </Form.Group>
                    <Form.Group controlId="updates" className="checkbox-group">
                      <Form.Check
                        type="checkbox"
                        label="Yes, I want to get text updates and reminders about my reservations."
                      />
                    </Form.Group>

                    <div className="required-label">Required:</div>

                    <Form.Group controlId="terms" className="checkbox-group">
                      <Form.Check
                        type="checkbox"
                        label="I agree to the restaurant's terms and conditions."
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6} className="info-section">
                  <div className="restaurant-info">
                    <h4>{branchRestaurantInfo.name}</h4>
                    <p>
                      <FaRegCalendar className="icon-spacing" />
                      Monday, October 2
                    </p>
                    <p>
                      <FaRegClock className="icon-spacing" />
                      {time}
                    </p>
                    <p>
                      <FaRegUser className="icon-spacing" /> 2 people
                    </p>
                    <p>
                      <FaLocationDot className="icon-spacing" />
                      {branchRestaurantInfo.address}
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
                <Button className="confirm-btn">Confirm reservation</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConfirmReservation;
