import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-border">
        <div className="container">
          <Link to="/">
            <img
              className="nav-image"
              src="/Media/images/logo.svg"
              alt="Logo"
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Pricing">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <button className="d-block nav-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
