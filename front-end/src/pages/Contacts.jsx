import React from "react";
import { Link } from "react-router-dom"; 
import "../assets/styles/Contacts.css";

function Contacts() {
  return (
    <div className="Contact-container">
      <div className="Contact-content">
        <h1 className="Contact-heading">CONTACT</h1>
        <p className="Contact-text">
          If you have any questions, please explore our{" "}
          <Link to="/faqs" className="Contact-link">
            FAQs
          </Link>{" "}
          page for quick answers, or feel free to reach out to us directly at{" "}
          <a href="mailto:HarasyRestaurant@gmail.com" className="Contact-email">
            HarasyRestaurant@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Contacts;
