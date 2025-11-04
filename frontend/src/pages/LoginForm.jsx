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
  const [errors, setErrors] = useState({});
  const { username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // clear specific error while typing (optional UX)
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
      position: "bottom-left",
    });

  // simple validation rules for login
  const validate = (values) => {
    const errs = {};
    if (!values.username || !values.username.trim()) {
      errs.username = "Username or email is required.";
    } else if (values.username.trim().length < 3) {
      errs.username = "Please enter valid username or email";
    }

    if (!values.password) {
      errs.password = "Password is required.";
    } else if (values.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vals = { username, password };
    const validationErrors = validate(vals);
    setErrors(validationErrors);

    const firstKey = Object.keys(validationErrors)[0];
    if (firstKey) {
      handleError(validationErrors[firstKey]);
      return;
    }

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
      username: "",
      password: "",
    });
    setErrors({});
  };

  const fieldClass = (fieldName) =>
    `form-control inputBox ${errors[fieldName] ? "is-invalid" : ""}`;

  return (
    <>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                  className={fieldClass("username")}
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={username}
                  name="username"
                  onChange={handleOnChange}
                  // keep required for semantics; browser won't show popup because of noValidate
                  required
                />
                <label htmlFor="floatingInput">Enter email or username</label>
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  {errors.username || "Please Enter a username."}
                </div>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className={fieldClass("password")}
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleOnChange}
                />
                <label htmlFor="floatingPassword">Password</label>
                <div className="invalid-feedback">
                  {errors.password || "Please Enter a password."}
                </div>
              </div>

              <p style={{ marginTop: "10px" }}>
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
