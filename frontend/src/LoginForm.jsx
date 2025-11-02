import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function LoginForm() {
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
            <h3 style={{ marginBottom: "25px" }}>Login</h3>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control inputBox"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Username</label>
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
              Not have an account?{" "}
              <Link to="/Register">
                <span style={{ color: "#387ed1" }}>Sign Up Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <button>Login</button>
      </footer>
    </>
  );
}
