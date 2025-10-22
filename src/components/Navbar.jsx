import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // for toggle
  const UserId = localStorage.getItem("UserId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserName");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand" to="/">
          <i className="fas fa-wallet me-2"></i>Expense Tracker
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-2"></i>Home
              </Link>
            </li>

            {UserId ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/add-expense">
                    <i className="fas fa-plus me-2"></i>Add Expense
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/manage-expense">
                    <i className="fas fa-file-alt me-2"></i>Manage Expense
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/expense-report">
                    <i className="fas fa-chart-bar me-2"></i>Expense Report
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/change-password">
                    <i className="fas fa-key me-2"></i>Change Password
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm ms-lg-3 mt-2 mt-lg-0"
                  >
                    <i className="fas fa-sign-out-alt me-1"></i>Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <i className="fas fa-user-plus me-2"></i>Signup
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
