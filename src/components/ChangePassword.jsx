import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [data, setData] = useState({
    currentPassword: "",
    newpassword: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const UserName = localStorage.getItem("UserName");

    if (!data.newpassword) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      const response = await fetch(
        `https://expense-app-backend-ibdf.onrender.com/api/change_password/${UserName}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newpassword: data.newpassword }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Password changed successfully 😊");
        setData({ currentPassword: "", newpassword: "" });
      } else {
        toast.error(result.message || "Error changing password ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong 😓");
    }
  };

  const handleForgotPassword = async () => {
    const UserName = localStorage.getItem("UserName");

    try {
      const response = await fetch(
        `https://expense-app-backend-ibdf.onrender.com/api/forgot_password/${UserName}/`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      const result = await response.json();

      if (response.ok) {
        toast.info(`Your current password is: ${result.current_password}`);
      } else {
        toast.error(result.message || "Error fetching password ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong 😓");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        className="p-4 bg-white shadow rounded"
        style={{ width: "100%", maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-4">Change Password</h2>

        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            placeholder="Enter current password"
            value={data.currentPassword}
            onChange={handleInput}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newpassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newpassword"
            name="newpassword"
            placeholder="Enter new password"
            value={data.newpassword}
            onChange={handleInput}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary w-50">
            Change
          </button>
          <button
            type="button"
            className="btn btn-secondary w-50"
            onClick={handleForgotPassword}
          >
            Forgot
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ChangePassword;
