import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Menu.css";

function Menu() {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>OUR MENUS</h1>
      </div>
      <div className="menu-cities">
        <div className="menu-city">
          <div className="menu-city-image menu-hanoi-image"></div>
          <div className="menu-city-name">HA NOI</div>
          <Link to="/menu/hanoi" className="menu-button">
            VIEW THE MENU
          </Link>
        </div>
        <div className="menu-city">
          <div className="menu-city-image menu-hcm-image"></div>
          <div className="menu-city-name">HO CHI MINH</div>
          <Link to="/menu/hcm" className="menu-button">
            VIEW THE MENU
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
