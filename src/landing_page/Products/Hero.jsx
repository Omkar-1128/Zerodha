import React from "react";
import "./style.css";

function Hero() {
  return (
    <div className="container">
      <div className="Hero text-center container">
        <h2>Zerodha Products</h2>
        <p className="HeroP1 fs-5 my-3">
          Sleek, modern, and intuitive trading platforms
        </p>
        <p className="HeroP2">
          Check out our{" "}
          <a style={{ color: "#387ed1", textDecoration: "none" }} href="#">
            investment offerings <i class="fa-solid fa-arrow-right"></i>
          </a>
        </p>
      </div>
      <hr />
    </div>
  );
}

export default Hero;
