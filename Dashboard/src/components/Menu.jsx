import React, { useState } from "react";
import {Link} from 'react-router-dom';

function Menu() {
  const [selectedMenu , setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen , setIsProfileDropdownOpen] = useState(false);

  const handleMenuClicks = (index) => {
    setSelectedMenu(index);
  }

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link to={"/"} style={{textDecoration: "none"}} onClick={() => handleMenuClicks(0)}>
              <p className={selectedMenu === 0? menuClass : activeMenuClass}>Dashboard</p>
            </Link>  
          </li>
          <li>
            <Link to={"/orders"} style={{textDecoration: "none"}} onClick={() => handleMenuClicks(1)}>
              <p className={selectedMenu === 1? menuClass : activeMenuClass}>Orders</p>
            </Link>  
          </li>
          <li>
            <Link to={"/holdings"} style={{textDecoration: "none"}} onClick={() => handleMenuClicks(2)}>
              <p className={selectedMenu === 2? menuClass : activeMenuClass}>Holdings</p>
            </Link>  
          </li>
          <li>
            <Link to={"/positions"} style={{textDecoration: "none"}} onClick={() => handleMenuClicks(3)}>
              <p className={selectedMenu === 3? menuClass : activeMenuClass}>Positions</p>
            </Link>  
          </li>
           <li>
            <Link to={"/funds"} style={{textDecoration: "none"}} onClick={() => handleMenuClicks(4)}>
              <p className={selectedMenu === 4? menuClass : activeMenuClass}>Funds</p>
            </Link>  
          </li>
           <li>
            <Link to={"/apps"} style={{textDecoration: "none"}} onClick={() => handleMenuClicks(5)}>
              <p className={selectedMenu === 5? menuClass : activeMenuClass}>Apps</p>
            </Link>  
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">OS</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
