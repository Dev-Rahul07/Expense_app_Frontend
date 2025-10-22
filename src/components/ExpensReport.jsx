import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ExpenseReport = () => {
  const UserId = localStorage.getItem("UserId");
  const [expenses, setExpenses] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTotal, setFilteredTotal] = useState(null);

  useEffect(() => {
    if (!UserId) return;
    fetch(`https://expense-app-backend-ibdf.onrender.com/api/manage_expense/${UserId}`)
      .then((res) => res.json())
      .then(setExpenses)
      .catch(() => toast.error("Failed to fetch expenses"));
  }, [UserId]);

  const filterByDate = () => {
    if (!fromDate || !toDate) return;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    const total = expenses
      .filter((e) => {
        const d = new Date(e.ExpenseDate);
        return d >= from && d <= to;
      })
      .reduce((sum, e) => sum + parseFloat(e.ExpenseCost || 0), 0);

    setFilteredTotal(total);
  };

  const filteredExpenses = expenses.filter((e) => {
    if (!fromDate || !toDate) return false;
    const d = new Date(e.ExpenseDate);
    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);
    return d >= from && d <= to;
  });

  return (
    <div className="container my-3">
      <h3 className="mb-3">Expense Report</h3>

      <div className="d-flex mb-3">
        <input
          type="date"
          className="form-control me-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control me-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={filterByDate}>
          Search
        </button>
      </div>

      {filteredTotal !== null && (
        <p>
          Total expenses from <b>{fromDate}</b> to <b>{toDate}</b>: ₹
          {filteredTotal}
        </p>
      )}

      {filteredTotal !== null && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e, i) => (
              <tr key={i}>
                <td>{e.ExpenseItem}</td>
                <td>{e.ExpenseCategory}</td>
                <td>₹{e.ExpenseCost}</td>
                <td>{e.ExpenseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseReport;
