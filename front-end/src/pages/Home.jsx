import React from "react";
import img1 from "../assets/img/beef.jpg";
import img3 from "../assets/img/ittime.jpg";
import img2 from "../assets/img/loginbg.png";
import img4 from "../assets/img/smoke.png";

import { Link } from "react-router-dom";
import "../assets/styles/HomePage.css";
import CarouselPage from "../components/CarouselPage";

function Home() {
  return (
    <>
      <CarouselPage />
      <div className="container section-1">
        <div className="row">
          <div className="col-md-6 section-1-column-1">
            <h1>DINE WITH US</h1>
            <img src={img1} alt="Dining" className="img-fluid mb-3" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, pharetra
              dictum mus nec malesuada suscipit euismod, faucibus vestibulum
              eros quisque hendrerit facilisis.Lorem ipsum dolor sit amet
              consectetur adipiscing elit, pharetra dictum mus nec malesuada
              suscipit euismod, faucibus vestibulum eros quisque hendrerit
              facilisis.
            </p>
            <Link to="/menu" className="hp-btn-custom">
              SEE THE MENU
            </Link>
          </div>

          <div className="col-md-6 section-1-column-2">
            <h1>
              DISCOVER ABOUT <br />
              OUR RESTAURANT
            </h1>
            <img src={img2} alt="Restaurant" className="img-fluid mb-3" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, pharetra
              dictum mus nec malesuada suscipit euismod, faucibus vestibulum
              eros quisque hendrerit facilisis.Lorem ipsum dolor sit amet
              consectetur adipiscing elit, pharetra dictum mus nec malesuada
              suscipit euismod, faucibus vestibulum eros quisque hendrerit
              facilisis.
            </p>
            <Link to="/about" className="hp-btn-custom">
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>

      <div className="section-2">
        <div className="section-2-container">
          <h2 className="section-2-title">HARASY</h2>
          <div className="section-2-row">
            <div className="section-2-col section-2-col-img">
              <img
                src={img3}
                alt="Opening"
                className="img-fluid mb-3 section-2-img"
              />
            </div>
            <div className="section-2-col section-2-col-text">
              <p className="section-2-description">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, pharetra
                dictum mus nec malesuada suscipit euismod, faucibus vestibulum
                eros quisque hendrerit facilisis.
              </p>
              <p className="section-2-description">
                Aliquam sed dui non est mattis rhoncus id eget quam.
              </p>
              <Link to="/about" className="hp-btn-custom">
                LEARN MORE
              </Link>

              <div className="section-2-quote">
                <p className="quote-description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit,
                  pharetra dictum mus nec malesuada suscipit euismod, faucibus
                  vestibulum eros quisque hendrerit facilisis. Lorem ipsum dolor
                  sit amet consectetur adipiscing elit, pharetra dictum mus nec
                  malesuada suscipit euismod, faucibus vestibulum eros quisque
                  hendrerit facilisis.
                </p>
                <p>
                  <br />
                </p>
                <p className="quote-author">Chef Thinh Nguyen</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-3">
        <div className="section-3-container">
          <div className="section-3-row">
            <div className="section-3-col-img">
              <img src={img4} alt="E-Club Dish" className="section-3-img" />
            </div>

            {/* Cột bên phải chứa nội dung văn bản */}
            <div className="section-3-col-text">
              <h2 className="section-3-title">JOIN THE E-CLUB</h2>
              <p className="section-3-description">
                Join the Harasy Restaurnt E-Club and be the first to learn about
                local events,
                <br /> seasonal-menu offerings, and more.
              </p>
              <Link to="/register" className="hp-btn-custom">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
