import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ManageExpense = () => {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("UserId");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    ExpenseDate: "",
    ExpenseItem: "",
    ExpenseCost: "",
  });

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `https://expense-app-backend-ibdf.onrender.com/api/manage_expense/${UserId}`
      );
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to load expenses");
    }
  };

  useEffect(() => {
    if (!UserId) {
      navigate("/login");
    } else {
      fetchExpenses();
    }
  }, [UserId, navigate]);

  // Handle form changes (integer-only for ExpenseCost)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ExpenseCost") {
      // Only allow digits
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Open edit modal
  const handleEdit = (expense) => {
    setEditingExpense(expense.id);
    setFormData({
      ExpenseDate: expense.ExpenseDate,
      ExpenseItem: expense.ExpenseItem,
      ExpenseCost: expense.ExpenseCost,
    });
  };

  // Save edited expense
  const handleSave = async () => {
    if (formData.ExpenseCost === "" || parseInt(formData.ExpenseCost) === 0) {
      toast.error("Expense Cost must be a non-zero integer");
      return;
    }

    try {
      const response = await fetch(
        `https://expense-app-backend-ibdf.onrender.com/api/edit_expense/${editingExpense}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            ExpenseCost: parseInt(formData.ExpenseCost), // ensure integer
          }),
        }
      );

      if (response.ok) {
        toast.success("Expense updated!");
        fetchExpenses();
        setEditingExpense(null);
      } else {
        toast.error("Failed to update expense");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating expense");
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const response = await fetch(
        `https://expense-app-backend-ibdf.onrender.com/api/delete_expense/${id}/`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("Expense deleted!");
        fetchExpenses();
      } else {
        toast.error("Failed to delete expense");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting expense");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">
          <i className="fas fa-wallet me-2"></i>Manage Expenses
        </h2>
        <p className="text-secondary fs-5">
          Track, edit, or delete your expenses easily 🧾
        </p>
      </div>

      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <table className="table table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Cost (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((ele) => (
                  <tr key={ele.id}>
                    <td>{ele.ExpenseDate}</td>
                    <td>{ele.ExpenseItem}</td>
                    <td>{ele.ExpenseCost}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(ele)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(ele.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted py-4">
                    <i className="fas fa-info-circle me-2"></i>No Expenses Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingExpense && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-edit me-2"></i>Edit Expense
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingExpense(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Expense Date</label>
                  <input
                    type="date"
                    name="ExpenseDate"
                    className="form-control"
                    value={formData.ExpenseDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Expense Item</label>
                  <input
                    type="text"
                    name="ExpenseItem"
                    className="form-control"
                    placeholder="Enter Expense Item"
                    value={formData.ExpenseItem}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Expense Cost</label>
                  <input
                    type="text" // text instead of number
                    name="ExpenseCost"
                    className="form-control"
                    placeholder="Enter Amount"
                    value={formData.ExpenseCost}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingExpense(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

