import React from "react";
import "../assets/styles/HNVenues.css";

function HNVenues() {
  return (
    <div className="hnvenues-container">
      <div className="hnvenues-header">
        <h1>HA NOI</h1>
      </div>
      <div className="hnvenues-cities">
        <div className="city-info">
          <h2>HA NOI CITY</h2>
          <p>
            <span className="icon">📍</span> Ha noi
          </p>
          <p>
            <span className="icon">📞</span> 1234567890
          </p>
          <p>
            <span className="icon">📧</span> Email Ha Noi City
          </p>
          <p>
            <span className="icon">🗺️</span> Get directions
          </p>
        </div>

        <div className="opening-hours">
          <h2>OPENING HOURS</h2>
          <div className="hours-row">
            <span className="day">MON</span>
            <span className="time">4:30 - 10:00</span>
          </div>
          <div className="hours-row">
            <span className="day">TUE</span>
            <span className="time">4:30 - 10:00</span>
          </div>
          <div className="hours-row">
            <span className="day">THU</span>
            <span className="time">4:30 - 10:00</span>
          </div>
          <div className="hours-row">
            <span className="day">FRI</span>
            <span className="time">4:30 - 10:00</span>
          </div>
          <div className="hours-row">
            <span className="day">SAT</span>
            <span className="time">4:30 - 10:00</span>
          </div>
          <div className="hours-row">
            <span className="day">SUN</span>
            <span className="time">4:30 - 10:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HNVenues;
