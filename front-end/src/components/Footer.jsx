import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../assets/styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ul className="footer-nav">
              <li>
                <Link to="/register">SIGN UP</Link>
              </li>
              <li>
                <Link to="#">CAREERS</Link>
              </li>
              <li>
                <Link to="#">FAQS</Link>
              </li>
              <li>
                <Link to="#">CONTACT</Link>
              </li>
            </ul>
            <div className="footer-policies">
              <Link to="#">Accessibility</Link> |
              <Link to="#"> Privacy Policy</Link> |
              <Link to="#"> Terms & Conditions</Link>
            </div>
          </div>

          <div className="col-md-6 text-md-right">
            <div className="footer-social">
              <a href="#" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
            </div>
            <div className="footer-copyright">
              <p>Harasy Restaurants &copy;Copyright 2024</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
