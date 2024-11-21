import React from "react";
import { useNavigate } from "react-router-dom";
import img3 from "../assets/img/ittime.jpg";
import "../assets/styles/About.css";

function About() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/venues");
  };

  return (
    <div className="About-container">
      <div className="About-history">
        <div className="About-history-row">
          <div className="About-history-img">
            <img
              src={img3}
              alt="The History of Harasy Restaurant"
              className="img-fluid About-img-item"
            />
          </div>
          <div className="About-history-text">
            <h2 className="About-history-title">Our History</h2>
            <p className="About-description">
              The story of Harasy Restaurant begins with a passion for culinary
              excellence and a dream to bring European fine dining to Vietnam.
              Since opening its first doors, Harasy has become a symbol of
              elegance and unparalleled taste, cherished by food enthusiasts and
              families alike. Each location continues to honor its roots by
              blending tradition with innovation, creating unforgettable dining
              experiences for every guest.
            </p>
            <div className="About-quote">
              <p className="quote-description">
                "Harasy Restaurant was born from a deep respect for culinary
                heritage and a vision to bring timeless European flavors to life
                in Vietnam. Each dish represents a journey through history,
                innovation, and a commitment to excellence that has defined our
                story since day one."
              </p>
              <p className="quote-author">Chef Thinh Nguyen</p>
            </div>
            <button className="About-btn" onClick={handleButtonClick}>
              View Locations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
