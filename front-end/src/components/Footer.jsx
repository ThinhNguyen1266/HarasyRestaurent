import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../assets/styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ul className="footer-nav">
              <li>
                <a href="#">SIGN UP</a>
              </li>
              <li>
                <a href="#">CAREERS</a>
              </li>
              <li>
                <a href="#">FAQS</a>
              </li>
              <li>
                <a href="#">ABOUT</a>
              </li>
              <li>
                <a href="#">CONTACT</a>
              </li>
            </ul>
            <div className="footer-policies">
              <a href="#">Accessibility</a> |<a href="#"> Privacy Policy</a> |
              <a href="#"> Cookie Policy</a> |
              <a href="#"> Terms & Conditions</a>
            </div>
          </div>

          <div className="col-md-6 text-md-right">
            <div className="footer-social">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
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
