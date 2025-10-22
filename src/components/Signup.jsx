import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://expense-app-backend-ibdf.onrender.com/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (response.status === 201) {
        toast.success("Signup Successful! Please login");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } 
      else {
        const result = await response.json();
        toast.error(result.message || 'signup failed');
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("somthing went Wrong...");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2>
          <i className="fas fa-user-plus me-2"></i>Signup
        </h2>
        <p className="text-muted">
          Create your Account to start tracking expenses
        </p>
      </div>

      <form
        onSubmit={handlesubmit}
        className="p-4 border rounded  shadow  mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="">
          <label className="from-label">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              value={data.FullName}
              name="FullName"
              placeholder=""
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="">
          <label className="from-label">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="text"
              value={data.Email}
              name="Email"
              placeholder=""
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="from-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              value={data.Password}
              name="Password"
              placeholder=""
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn btn-primary w-100">Signup</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
