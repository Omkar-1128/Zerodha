import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Profile from "./Profile";
import "./TopMenu.css";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

  // map route → active index
  useEffect(() => {
    const path = location.pathname || "/";
    const map = {
      "/": 0,
      "/orders": 1,
      "/holdings": 2,
      "/positions": 3,
      "/funds": 4,
      "/apps": 5,
    };
    setSelectedMenu(map[path] ?? 0);
  }, [location.pathname]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        window.location.href = "http://localhost:5174/";
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:8080/verify",
          {},
          { withCredentials: true }
        );
        const { status, user } = data || {};
        setUsername(user);
        if (!status) {
          removeCookie("token");
          window.location.href = "http://localhost:5173/login";
        }
      } catch {
        removeCookie("token");
        window.location.href = "http://localhost:5173/login";
      }
    };
    verifyCookie();
  }, [cookies, removeCookie, navigate]);

  const Logout = () => {
    removeCookie("token");
    window.location.href = "http://localhost:5173/Register";
  };

  const pillClass = (idx) => `menu-pill ${selectedMenu === idx ? "is-active" : ""}`;

  return (
    <div className="menu-container">
      <span className="menu-logo">
        <img src="logo.png" alt="Logo" />
      </span>

      <div className="menus">
        <ul>
          <li>
            <Link to="/" className={pillClass(0)} aria-current={selectedMenu === 0 ? "page" : undefined}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/orders" className={pillClass(1)} aria-current={selectedMenu === 1 ? "page" : undefined}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/holdings" className={pillClass(2)} aria-current={selectedMenu === 2 ? "page" : undefined}>
              Holdings
            </Link>
          </li>
          <li>
            <Link to="/positions" className={pillClass(3)} aria-current={selectedMenu === 3 ? "page" : undefined}>
              Positions
            </Link>
          </li>
          <li>
            <Link to="/funds" className={pillClass(4)} aria-current={selectedMenu === 4 ? "page" : undefined}>
              Funds
            </Link>
          </li>
          <li>
            <Link to="/apps" className={pillClass(5)} aria-current={selectedMenu === 5 ? "page" : undefined}>
              Apps
            </Link>
          </li>
        </ul>

        <hr />

        <Profile username={username} Logout={Logout} />
      </div>
    </div>
  );
}

export default Menu;
