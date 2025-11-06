import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import "./Profile.css"; // ⬅️ add this line
import { API_BASE_URL } from "../config/api.js";

function Profile({ username, Logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/getUserDetails`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch user details");
      const data = await res.json();
      const u = Array.isArray(data) ? data[0] ?? null : data?.user ?? data ?? null;
      if (!u) throw new Error("No user found");
      setUserDetails(u);
    } catch (e) {
      setError(e?.message || "Unable to load user details");
      setUserDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileClick = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Allow mobile drawer to open profile modal via event
  useEffect(() => {
    const openProfile = () => {
      setIsProfileOpen(true);
      fetchUserDetails();
    };
    window.addEventListener("openProfileModal", openProfile);
    return () => window.removeEventListener("openProfileModal", openProfile);
  }, []);

  return (
    <div ref={dropdownRef} className="prof-wrap">
      <button
        className="prof-trigger"
        onClick={handleProfileClick}
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
      >
        <div className="prof-avatar">
          {username?.slice(0, 2).toUpperCase()}
        </div>
        <span className="prof-username" title={username}>
          {username}
        </span>
        <i className={`fa-solid fa-chevron-${isDropdownOpen ? "up" : "down"} prof-caret`} />
      </button>

      {isDropdownOpen && (
        <ul className="prof-menu" role="menu" aria-label="Profile menu">
          <li role="menuitem">
            <button
              className="prof-menu-item"
              onClick={async () => {
                setIsDropdownOpen(false);
                setIsProfileOpen(true);
                await fetchUserDetails();
              }}
            >
              <i className="fa-solid fa-user me-2" /> Profile
            </button>
          </li>
          <li role="menuitem">
            <button className="prof-menu-item">
              <i className="fa-solid fa-gear me-2" /> Settings
            </button>
          </li>
          <li role="menuitem">
            <button className="prof-menu-item danger" onClick={Logout}>
              <i className="fa-solid fa-right-from-bracket me-2" /> Logout
            </button>
          </li>
        </ul>
      )}

      <Modal
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setError("");
        }}
        title="Your Profile"
      >
        {isLoading ? (
          <div className="prof-loading">Loading…</div>
        ) : error ? (
          <div className="prof-error">{error}</div>
        ) : (
          <div className="prof-card">
            <div className="prof-header">
              <div className="prof-avatar-lg">
                {(userDetails?.fullname || username || "?")
                  ?.slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="prof-heading">
                <div className="prof-name">
                  {userDetails?.fullname || username || "-"}
                </div>
                <div className="prof-badge">Member</div>
              </div>
            </div>

            <div className="prof-grid">
              <div className="label">Full name</div>
              <div className="value">{userDetails?.fullname || "-"}</div>

              <div className="label">Username</div>
              <div className="value">
                {userDetails?.username || username || "-"}
              </div>

              <div className="label">Email</div>
              <div className="value">{userDetails?.email || "-"}</div>

              <div className="label">Mobile</div>
              <div className="value">{userDetails?.mobileNo || "-"}</div>

              <div className="label">Joined</div>
              <div className="value">
                {userDetails?.createdAt
                  ? new Date(userDetails.createdAt).toLocaleDateString()
                  : "-"}
              </div>

              <div className="label">Status</div>
              <div className="value ok">Active</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Profile;
