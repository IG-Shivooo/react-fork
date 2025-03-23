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
          DevJobs
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="nav-menu">
        <Link to="/jobs" className="nav-item">Jobs</Link>
        <Link to="/projects" className="nav-item">Projects</Link>
        <Link to="/your-jobs" className="nav-item">Your Jobs</Link>
        <Link to="/resume" className="nav-item">Resume</Link>
        <Link to="/job-alert" className="nav-item">Job Alert</Link>
      </div>

      {/* Right Section - Sign In + User Icon */}
      <div className="nav-right">
        <Link to="/login" className="sign-in-btn">
          Sign In
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
