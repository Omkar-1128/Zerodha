import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <>
      <div className="row">
        <div className="col-6 loginImage">
          <img src="../public/Media/images/loginImage.svg" alt="Login Image" />
        </div>
        <div className="col-6">
          <div
            className="FormContainer d-flex flex-column justify-content-center"
            style={{ height: "70vh" }}
          >
            <h3 style={{ marginBottom: "25px" }}>Sign Up</h3>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control inputBox"
                id="floatingInput"
                placeholder="Lightning Ace"
              />
              <label for="floatingInput">Fullname</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control inputBox"
                id="floatingInput"
                placeholder="lighningAce@272"
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control inputBox"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control inputBox"
                id="floatingInput"
                placeholder="9373xxxxxx"
              />
              <label for="floatingInput">Mobile No</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control inputBox"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <p style={{marginTop: "10px"}}>
              Already have an account?{" "}
              <Link to="/Login">
                <span style={{ color: "#387ed1" }}>Login Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <button>Sign Up</button>
      </footer>
    </>
  );
}
