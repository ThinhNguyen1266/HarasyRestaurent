import React from "react";
import "../assets/styles/Venues.css";

function Venues() {
  return (
    <div className="venues-container">
      <div className="venues-header">
        <h1>OUR LOCATIONS</h1>
      </div>
      <div className="venues-cities">
        <div className="city">
          <div className="city-image hanoi-image"></div>
          <div className="city-name">HA NOI</div>
        </div>
        <div className="city">
          <div className="city-image hcm-image"></div>
          <div className="city-name">HO CHI MINH</div>
        </div>
      </div>
    </div>
  );
}

export default Venues;
