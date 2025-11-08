import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./TopMenu.css";
import Profile from "./Profile";
import MobileNavDrawer from "./MobileNavDrawer";
import { API_BASE_URL } from "../config/api.js";

function Menu() {
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const toggleNavDrawer = () => {
    window.dispatchEvent(new CustomEvent("closeWatchlist"));
    setIsNavOpen((v) => !v);
  };

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
      try {
        // Small delay to allow cookie to be processed
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log("🔍 Verifying authentication...");
        
        const { data } = await axios.post(
          `${API_BASE_URL}/verify`,
          {},
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("✅ Verification response:", data);
        const { status, user } = data || {};
        
        if (status && user) {
          console.log("✅ Verification successful for:", user);
          setUsername(user);
          setIsVerifying(false);
        } else {
          console.error("❌ Verification failed - no valid session");
          setIsVerifying(false);
          removeCookie("token");
          window.location.href = "https://zerodha-272.netlify.app/Login";
        }
      } catch (error) {
        console.error("❌ Verification error:", error.response?.data || error.message);
        setIsVerifying(false);
        removeCookie("token");
        window.location.href = "https://zerodha-272.netlify.app/Login";
      }
    };
    verifyCookie();
  }, [removeCookie]);

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div>Verifying authentication...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Please wait</div>
      </div>
    );
  }

  const Logout = () => {
    removeCookie("token");
    window.location.href = "https://zerodha-272.netlify.app/Register";
  };

  const pillClass = (idx) => `menu-pill ${selectedMenu === idx ? "is-active" : ""}`;

  return (
    <div className="menu-container">
      <span className="menu-logo">
        <img src="logo.png" alt="Logo" />
      </span>
      <button
        className="menu-toggle"
        onClick={toggleNavDrawer}
        aria-label="Open Menu"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

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
      </div>
      {/* Visible on desktop; hidden on mobile via CSS */}
      <div className="menu-profile">
        <Profile username={username} Logout={Logout} />
      </div>
      <MobileNavDrawer
        open={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        username={username}
        onLogout={Logout}
      />
    </div>
  );
}

export default Menu;
