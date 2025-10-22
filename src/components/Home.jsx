import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const UserId = localStorage.getItem("UserId");
  if (UserId) {
    console.log("User is logged in with ID:", UserId);
  }
  return (
    <div className="container text-center mt-5">
      <h1>
        Welcome to{" "}
        <span className="text-primary"> Expense Tracker Application</span>
      </h1>
      <p className="text-muted">
        track your expenses efficiently and effectively
      </p>

      {UserId ? (
        <>
          <Link to="/dashboard" className="btn btn-warning mx-2">
            <i className="fas fa-tachometer-alt me-2"></i>go to dashboard
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup" className="btn btn-primary mx-2">
            <i className="fas fa-user-plus me-2"></i>go to signup
          </Link>
          <Link to="/login" className="btn btn-success mx-2">
            <i className="fas fa-sign-in-alt me-2"></i>go to login
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
