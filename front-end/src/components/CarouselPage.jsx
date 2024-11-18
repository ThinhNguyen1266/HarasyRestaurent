import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import img2 from "../assets/img/beef.jpg";
import img1 from "../assets/img/HRS.png";
import img3 from "../assets/img/HRS2.png";
import "../assets/styles/Carousel.css";

function CarouselPage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="carousel-img d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h3>
            Welcome to <br />
            Harasy
          </h3>
          <p>
            World-renowned Michelin-starred Chef Thinh Nguyen iconic
            <br />
            Harasy Restaurant is now open in Ha Noi.
          </p>
          <Link to="/">
            <button className="btn-custom">MAKE A RESERVATION</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h3>
            OUR <br />
            SIGNATURE <br />
            DISHES
          </h3>
          <p>
            Experience our classic Beef Wellington, Lobster Risotto
            <br />
            and more
          </p>
          <Link to="/menu">
            <button className="btn-custom">SEE THE MENU</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img d-block w-100"
          src={img3}
          alt="Thirst slide"
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h3>
            HARASY <br />
            CLUB
          </h3>
          <p>
            Join the Harasy E-Club and be the first to learn about
            <br />
            local events, seasonal menu offerings, and more
          </p>
          <Link to="/login">
            <button className="btn-custom">LOG IN</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPage;
