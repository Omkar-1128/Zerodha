import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function LoginForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;
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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
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
      username: "",
      password: "",
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
            <h3 style={{ marginBottom: "25px" }}>Login</h3>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control inputBox"
                id="floatingInput"
                placeholder="name@example.com"
                value={username}
                name="username"
                onChange={handleOnChange}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control inputBox"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleOnChange}
              />
              <label htmlFor="floatingPassword">Password</label>
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
        <button type="submit">Login</button>
      </footer>
      </form>
      <ToastContainer />
    </>
  );
}
