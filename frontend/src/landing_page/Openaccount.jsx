import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function Openaccount({ heading, description }) {
  return (
    <div className="container text-center">
      <h2 className="accountHeading">{heading}</h2>
      <p className="accountDescription">{description}</p>

      <Link className="nav-link active" aria-current="page" to="/Signup">
        <button className="mt-3 btn btn-primary accountButton">
          <b>Sign up for free</b>
        </button>
      </Link>
    </div>
  );
}

export default Openaccount;
