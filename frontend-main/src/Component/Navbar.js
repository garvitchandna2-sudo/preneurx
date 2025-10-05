import React from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const onLoginClick = () => navigate("/login");
  const onBackClick = () => navigate("/"); // 👈 back to previous page

  const isLoginPage = location.pathname === "/login";

  return (
    <header className="navbar">
      <div className="left-section">
        <Link to="/">
          <img src={logo} alt="PreneurX Logo" className="logomy" />
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
                <Link to="/about">Our Mission</Link>

        <Link to="/rule">Rules</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/team">Team</Link>

      </nav>

      <div className="right-section">
        {isLoginPage ? (
          <button onClick={onBackClick} className="login-btn">Back</button>
        ) : (
          <button onClick={onLoginClick} className="login-btn">Login</button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
