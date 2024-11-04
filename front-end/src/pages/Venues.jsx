import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Venues.css";

function Venues() {
  return (
    <div className="venues-container">
      <div className="venues-header">
        <h1>OUR LOCATIONS</h1>
      </div>
      <div className="venues-cities">
        <Link to="/venues/hanoi" className="city-link">
          <div className="city">
            <div className="city-image hanoi-image"></div>
            <div className="city-name">HA NOI</div>
          </div>
        </Link>
        <Link to="/venues/hcm" className="city-link">
          <div className="city">
            <div className="city-image hcm-image"></div>
            <div className="city-name">HO CHI MINH</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Venues;
