import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "../navbar.css";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const historyRoute = useNavigate();

  // const 

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const handleLogout = () =>{
    axios.get('/auth/signout')
    localStorage.removeItem('jwt')
    historyRoute(`/`)
    window.location.reload()
    console.log("User is signed out")
  }

  const presentToken = localStorage.getItem('jwt')

  return (
    <nav className="nav">
      <Link to="/" className="nav__brand">
        travelLog
      </Link>
      <ul className={ active }>
        { presentToken ?
        <>
          <li className="nav__item">
          <Link to="/" onClick={ handleLogout } id="nav__link">
            Sign Out
          </Link>
        </li>
        <li className="nav__item">
        <Link to="/dashboard" id="nav__link">
          Dashboard
        </Link>
        </li>
      </>
        :
        <>
        <li className="nav__item">
          <Link to="/signin" onClick={ navToggle } className="nav__link">
            Sign In
          </Link>
          </li>
          <li className="nav__item">
            <Link to="/signup" onClick={ navToggle } className="nav__link">
            Register
          </Link>
        </li>
        </>
        }
      </ul>
      <div onClick={ navToggle } className={ icon }>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;