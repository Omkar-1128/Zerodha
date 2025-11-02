import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container">
      <div className="HeroInfo">
        <h2>Open a free demat and trading account online</h2>
        <p>
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </p>
      </div>

      <div className="row d-flex justify-content-evenly">
        <div className="col-xl-4">
          <img
            className="HeroImage"
            height={351}
            width={504}
            src="/Media/images/sigupPageHero.svg"
            alt=""
          />
        </div>
        <div className="col-xl-4">
          <h3 className="accountHeading">Signup now</h3>
          <p className="accountDescription">
            Or track your existing application
          </p>
          {/* <div class="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              +91
            </span>
            <input
              type="text"
              className="MobileInput"
              placeholder="Enter your mobile number"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div> */}
          <Link to="/Login">
            <button className="mt-3 btn btn-primary accountButton">
              <b>Login</b>
            </button>
          </Link>
         
          <p>
            Not have an account? {" "}
            <Link to="/Register">
            <span style={{ color: "#387ed1" }} >
              Sign Up Here
            </span>
            </Link>
          </p>
          <p style={{ fontSize: "12px" }}>
            By proceeding, you agree to the Zerodha{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              terms
            </a>{" "}
            &{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              privacy policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
