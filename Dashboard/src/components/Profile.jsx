import React, { useState, useEffect, useRef } from "react";

function Profile({ username, Logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => setIsDropdownOpen(!isDropdownOpen);
//   const handleProfileDoubleClick = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      style={{ position: "relative", display: "inline-block", width: "150px" }} 
    >
      <div
        className="d-flex align-items-center profile"
        onClick={handleProfileClick}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div
          className="avatar bg-primary text-white d-flex justify-content-center align-items-center rounded-circle"
          style={{ width: 40, height: 40, fontWeight: "bold", fontSize: 16 }}
        >
          {username?.slice(0, 2).toUpperCase()}
        </div>
        <p className="username ms-2 mb-0"><b>{username}</b></p>
      </div>

      {isDropdownOpen && (
        <ul
          className="dropdown-menu show shadow dropdown-menu-end"
          style={{
            position: "absolute",
            backgroundColor: "white",
            marginTop: 6,
            zIndex: 9999,
            width: "115px",
            borderLeft: "2px solid lightgray",
            borderBottom: "1px solid lightgray",
            borderEndStartRadius: "10px"
          }}
        >
          <li>
            <p className="dropdown-item profile-item" style={{cursor: "pointer", marginBottom: "0px"}}>
                <span><i className="fa-solid fa-user"></i> Profile</span>
            </p>
          </li>
          <li>
            <p className="dropdown-item profile-item" style={{cursor: "pointer", marginBottom: "0px"}}>
              <span><i className="fa-solid fa-gear"></i> Settings</span>
            </p>
          </li>
          <li>
            <p className="dropdown-item text-danger profile-item" onClick={Logout} style={{cursor: "pointer"}}>
              <span><i className="fa-solid fa-right-from-bracket"></i> Logout</span>
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Profile;
