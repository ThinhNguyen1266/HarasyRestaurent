import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/404.css";

function Pagenotfound() {
  return (
    <div className="Pagenotfound-container">
      <h1>
        SORRY, IT SEEMS YOU WERE TRYING TO ACCESS A PAGE THAT DOESN'T EXIST
      </h1>
      <p>
        Please check the spelling of the URL you were trying to access and try
        again.
      </p>
      <Link to="/" className="back-button">
        BACK TO HOMEPAGE
      </Link>
    </div>
  );
}

export default Pagenotfound;
