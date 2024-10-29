import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../assets/styles/Nav.css";
import Profile from "./Profile";
import { logout } from "../services/authRequest";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function NavigationBar() {
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(accessToken, dispatch, navigate);
  };

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="custom-navbar mb-3">
          <Container fluid>
            <Link to="/" className="navbar-brand">
              <img
                src={logo}
                alt="Logo"
                width="130"
                className="d-inline-block align-top"
              />
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Harasy
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="nav-center">
                  <Link to="/venues" className="nav-link">
                    VENUES
                  </Link>
                  <Link to="/menu" className="nav-link">
                    MENU
                  </Link>
                  <Link to="/contacts" className="nav-link">
                    CONTACTS
                  </Link>
                  <Link to="/about" className="nav-link">
                    ABOUT US
                  </Link>
                </Nav>
                <Nav className="nav-button justify-content-end">
                  <Link to="/login" className="reservations">
                    RESERVATIONS
                  </Link>
                  <Profile />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <button onClick={handleLogout}>Logout</button>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
export default NavigationBar;
