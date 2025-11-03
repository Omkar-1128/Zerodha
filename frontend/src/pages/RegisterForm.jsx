import React from "react";
import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    fullname: "",
    mobileNo: "",
    email: "",
    password: "",
    username: "",
  });
  const { fullname, mobileNo, email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/Register",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/Home");
          // window.location.href = "http://localhost:5173/"
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      fullname: "",
      mobileNo: "",
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 loginImage">
            <img src="/Media/images/loginImage.svg" alt="Login Image" />
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
                  id="fullname"
                  placeholder="Lightning Ace"
                  onChange={handleOnChange}
                  value={fullname}
                  name="fullname"
                />
                <label htmlFor="fullname">Fullname</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control inputBox"
                  id="username"
                  placeholder="lighningAce@272"
                  onChange={handleOnChange}
                  value={username}
                  name="username"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control inputBox"
                  id="email"
                  placeholder="name@example.com"
                  onChange={handleOnChange}
                  value={email}
                  name="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control inputBox"
                  id="MobileNo"
                  placeholder="9373xxxxxx"
                  onChange={handleOnChange}
                  value={mobileNo}
                  name="mobileNo"
                />
                <label htmlFor="MobileNo">Mobile No</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control inputBox"
                  id="floatingPassword"
                  onChange={handleOnChange}
                  placeholder="Password"
                  value={password}
                  name="password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <p style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <Link to="/Login">
                  <span style={{ color: "#387ed1" }}>Login Here</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <footer className="footer">
          <button type="submit">Sign Up</button>
        </footer>
      </form>
      <ToastContainer />
    </>
  );
}
