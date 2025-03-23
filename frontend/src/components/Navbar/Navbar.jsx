import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [username, setUsername] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const notificationPanelRef = useRef(null);
  const bellIconRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    // Update the username from localStorage on every route change
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUsername = storedUser ? storedUser.username : null;
    setUsername(storedUsername);
  }, [location]);

  useEffect(() => {
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Only update state if it actually changes
          if (window.scrollY > 15 && !scrolled) {
            setScrolled(true);
          } else if (window.scrollY <= 15 && scrolled) {
            setScrolled(false);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        notificationPanelRef.current && 
        !notificationPanelRef.current.contains(event.target) &&
        bellIconRef.current &&
        !bellIconRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Display first letter of the username if available, otherwise show a default icon
  const userIcon = username ? username.charAt(0).toUpperCase() : "👤";

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Left Section - Logo + Text */}
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/" className="logo-text">
          DevJobs
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="nav-menu">
        <Link to="/find-jobs" className="nav-item">Find Jobs</Link>
        <Link to="/your-projects" className="nav-item">Your Projects</Link>
        <Link to="/saved-jobs" className="nav-item">Saved Jobs</Link>
        <Link to="/resume" className="nav-item">Resume</Link>
      </div>

      {/* Right Section - Notification Bell + Sign In + User Icon */}
      <div className="nav-right">
        {/* Notification Bell Icon */}
        <div className="notification-container" ref={bellIconRef}>
          <div 
            className="notification-bell" 
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} />
          </div>
          
          {/* Notification Panel (Conditionally Rendered) */}
          {showNotifications && (
            <div className="notification-panel" ref={notificationPanelRef}>
              <div className="notification-header">
                <h3>Notifications</h3>
              </div>
              <div className="notification-content">
                <p className="no-notifications">No notifications</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Sign In Button - Only show when no user is logged in */}
        {!username && (
          <Link to="/login" className="sign-in-btn">
            Sign In
          </Link>
        )}
        
        {/* User Icon - Only show when user is logged in */}
        {username && (
          <div className="user-icon">
            <Link to="/dashboard">
              <div className="icon-circle">{userIcon}</div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
