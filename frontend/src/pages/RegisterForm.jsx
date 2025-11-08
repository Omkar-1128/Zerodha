import React from "react";
import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

export default function RegisterForm() {
  // const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    fullname: "",
    mobileNo: "",
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { fullname, mobileNo, email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
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

  const isValidEmail = (value) => {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return re.test(String(value).toLowerCase());
  };

  const validate = (values) => {
    const errs = {};

    // fullname: required, allow letters, spaces, dot, hyphen
    if (!values.fullname || !values.fullname.trim()) {
      errs.fullname = "Fullname is required.";
    } else if (!/^[\p{L} .'-]+$/u.test(values.fullname.trim())) {
      // \p{L} uses Unicode letters (works in modern browsers/node)
      errs.fullname = "Fullname contains invalid characters.";
    }

    // username: required, min 3 chars
    if (!values.username || !values.username.trim()) {
      errs.username = "Username is required.";
    } else if (values.username.length < 3) {
      errs.username = "Username must be at least 3 characters.";
    }

    // email: required + robust validation
    if (!values.email || !values.email.trim()) {
      errs.email = "Email is required.";
    } else if (!isValidEmail(values.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    // mobileNo: required, digits only, typical 10 digits (adjust to your rules)
    if (!values.mobileNo || !values.mobileNo.trim()) {
      errs.mobileNo = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(values.mobileNo.trim())) {
      errs.mobileNo = "Mobile number must be 10 digits.";
    }

    // password: required, minimum length
    if (!values.password) {
      errs.password = "Password is required.";
    } else if (values.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    // optionally add: must contain digit / uppercase / symbol etc.

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const vals = { fullname, mobileNo, email, password, username };
    const validationErrors = validate(vals);
    setErrors(validationErrors);

    // if any errors, stop and show a toast for the first error (optional)
    const firstErrorKey = Object.keys(validationErrors)[0];
    if (firstErrorKey) {
      handleError(validationErrors[firstErrorKey]);
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/Register`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, token } = data;
      if (success) {
        // Store token in localStorage for cross-site access
        if (token) {
          localStorage.setItem('authToken', token);
          console.log("✅ Token stored in localStorage");
        }
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = "https://dashboard-os.netlify.app";
          // navigate("/Home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Server error. Try again.");
    }

    // clear form
    setInputValue({
      fullname: "",
      mobileNo: "",
      email: "",
      password: "",
      username: "",
    });
    setErrors({});
  };

  // helper to compute bootstrap className (only show validation after attempted submit)
  const fieldClass = (fieldName) =>
    `form-control inputBox ${submitted && errors[fieldName] ? "is-invalid" : ""}`;

  return (
    <>
    <div className="page">
  <main>
      <form id="registerForm" onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-12 col-md-6 loginImage order-2 order-md-1">
            <img src="/Media/images/loginImage.svg" alt="Login Image" />
          </div>
          <div className="col-12 col-md-6 order-1 order-md-2">
            <div
              className="FormContainer d-flex flex-column justify-content-center mt-5"
              style={{ height: "70vh" }}
            >
              <h3 style={{ marginBottom: "25px" }}>Sign Up</h3>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={fieldClass("fullname")}
                  id="fullname"
                  placeholder="Lightning Ace"
                  onChange={handleOnChange}
                  value={fullname}
                  name="fullname"
                />
                <label htmlFor="fullname">Fullname</label>
                {submitted && errors.fullname && (
                  <div className="invalid-feedback">
                    {errors.fullname}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={fieldClass("username")}
                  id="username"
                  placeholder="lightningAce@272"
                  onChange={handleOnChange}
                  value={username}
                  name="username"
                />
                <label htmlFor="username">Username</label>
                {submitted && errors.username && (
                  <div className="invalid-feedback">
                    {errors.username}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={fieldClass("email")}
                  id="email"
                  placeholder="name@example.com"
                  onChange={handleOnChange}
                  value={email}
                  name="email"
                />
                <label htmlFor="email">Email</label>
                {submitted && errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={fieldClass("mobileNo")}
                  id="MobileNo"
                  placeholder="9373xxxxxx"
                  onChange={handleOnChange}
                  value={mobileNo}
                  name="mobileNo"
                />
                <label htmlFor="MobileNo">Mobile No</label>
                {submitted && errors.mobileNo && (
                  <div className="invalid-feedback">
                    {errors.mobileNo}
                  </div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className={fieldClass("password")}
                  id="floatingPassword"
                  onChange={handleOnChange}
                  placeholder="Password"
                  value={password}
                  name="password"
                />
                <label htmlFor="floatingPassword">Password</label>
                {submitted && errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
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

        
      </form>
      </main>
      <footer className="footer">
          <button type="submit" form="registerForm">Sign Up</button>
        </footer>
</div>
      <ToastContainer />
    </>
  );
}
