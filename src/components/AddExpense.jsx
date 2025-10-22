import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    ExpenseDate: "",
    ExpenseItem: "",
    ExpenseCost: "",
  });

  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ExpenseCost") {
      // Only allow digits (integers)
      if (/^\d*$/.test(value)) {
        setData({ ...data, [name]: value });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.ExpenseCost === "" || parseInt(data.ExpenseCost) === 0) {
      toast.error("Expense Cost must be a non-zero integer");
      return;
    }

    try {
      const response = await fetch(
        "https://expense-app-backend-ibdf.onrender.com/api/add_expense/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            ExpenseCost: parseInt(data.ExpenseCost),
            UserId: userId,
          }),
        }
      );

      const res = await response.json();
      if (response.status === 201) {
        toast.success(res.message);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2>
          <i className="fas fa-plus me-2"></i>Add Expense
        </h2>
        <p className="text-muted">Track your new expenses here</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label">Expense Date</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              value={data.ExpenseDate}
              name="ExpenseDate"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Expense Item</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-shopping-cart"></i>
            </span>
            <input
              type="text"
              value={data.ExpenseItem}
              name="ExpenseItem"
              placeholder="Enter Expense Item (e.g., groceries, transport)"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Expense Cost</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-rupee-sign"></i>
            </span>
            <input
              type="text"
              value={data.ExpenseCost}
              name="ExpenseCost"
              placeholder="Enter amount spent"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn btn-primary w-100">Add Expense</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddExpense;
