import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/HCMVenues.css";

function HCMVenues() {
  return (
    <div className="hcmvenues-container">
      <div className="hcmvenues-header">
        <h1>HO CHI MINH</h1>
        <div className="hcmvenues-buttons">
          <Link to="/findtable?branch=ho-chi-minh" className="btn">
            BOOK A TABLE
          </Link>
          <Link to="/menu/hcm" className="btn">
            VIEW THE MENU
          </Link>
        </div>
      </div>
      <div className="hcmvenues-cities"></div>
    </div>
  );
}

export default HCMVenues;
