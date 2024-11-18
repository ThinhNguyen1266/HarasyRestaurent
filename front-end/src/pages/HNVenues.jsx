import React from "react";
import {
  FaEnvelope,
  FaLocationCrosshairs,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../assets/styles/HNVenues.css";

function HNVenues() {
  return (
    <div className="hnvenues-container">
      <div className="hnvenues-header">
        <h1>HA NOI</h1>
        <div className="hnvenues-buttons">
          <Link to="/findtable?branch=ha-noi" className="btn">
            BOOK A TABLE
          </Link>
          <Link to="/menu/hanoi" className="btn">
            VIEW THE MENU
          </Link>
        </div>
      </div>
      <div className="hnvenues-cities">
        <div className="city-info">
          <h2>HA NOI CITY</h2>
          <p>
            <FaLocationDot className="icon" />
            Ha Noi
          </p>
          <p>
            <FaPhone className="icon" />
            1234567890
          </p>
          <p>
            <FaEnvelope className="icon" />
            Email Ha Noi City
          </p>
          <p>
            <FaLocationCrosshairs className="icon" />
            Get directions
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
