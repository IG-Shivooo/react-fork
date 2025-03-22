// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png"; // Add logo in assets folder

function Navbar() {
  const [username, setUsername] = useState(null);
  const location = useLocation(); // Listen to route changes

  useEffect(() => {
    // Update the username from localStorage on every route change
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUsername = storedUser ? storedUser.username : null;
    setUsername(storedUsername);
  }, [location]);

  // Display first letter of the username if available, otherwise show a default icon
  const userIcon = username ? username.charAt(0).toUpperCase() : "👤";

  return (
    <nav className="navbar">
      {/* Left Section - Logo + Text */}
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/" className="logo-text">
          Skill Bridge
        </Link>
      </div>

      {/* Right Section - Links + Icon */}
      <div className="nav-links">
        <Link to="/register" className="btn register-btn">
          Register
        </Link>
        <Link to="/login" className="btn login-btn">
          Login
        </Link>
        <div className="user-icon">
          <Link to="/dashboard">
            <div className="icon-circle">{userIcon}</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
