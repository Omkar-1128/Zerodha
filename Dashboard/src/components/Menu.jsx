import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import Profile from "./Profile";

function Menu() {
  const [selectedMenu , setSelectedMenu] = useState(0);

  const handleMenuClicks = (index) => {
    setSelectedMenu(index);
  }

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["token"]);
    const [username, setUsername] = useState("");
    useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          // navigate("/Home");
          window.location.href = "http://localhost:5174/";
        }
        const { data } = await axios.post(
          "http://localhost:8080/verify",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
            })
          : (removeCookie("token"), window.location.href = "http://localhost:5173/login");
      };
      verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
      removeCookie("token");
      // navigate("/signup");
      window.location.href = "http://localhost:5173/Register";
    };

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
        < Profile username={username} Logout={Logout}/>
      </div>
    </div>
  );
};

export default Menu;
