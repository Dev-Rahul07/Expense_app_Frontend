import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const UserName = localStorage.getItem("UserName");
  const UserId = localStorage.getItem("UserId");

  const [expenses, setExpenses] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [yesterdayTotal, setYesterdayTotal] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [yearTotal, setYearTotal] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Convert date to YYYY-MM-DD
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `https://expense-app-backend-ibdf.onrender.com/api/manage_expense/${UserId}`
      );
      const data = await response.json();
      setExpenses(data);
      calculateTotals(data);
      prepareChartData(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to load expenses");
    }
  };

  // Calculate totals
  const calculateTotals = (data) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);

    const yearAgo = new Date(today);
    yearAgo.setFullYear(today.getFullYear() - 1);

    let totals = { today: 0, yesterday: 0, week: 0, month: 0, year: 0, overall: 0 };

    data.forEach((item) => {
      const expenseDate = new Date(item.ExpenseDate);
      const amount = parseFloat(item.ExpenseCost) || 0;

      const expenseDay = formatDate(expenseDate);
      const todayDay = formatDate(today);
      const yesterdayDay = formatDate(yesterday);

      totals.overall += amount;
      if (expenseDay === todayDay) totals.today += amount;
      if (expenseDay === yesterdayDay) totals.yesterday += amount;
      if (expenseDate >= weekAgo && expenseDate <= today) totals.week += amount;
      if (expenseDate >= monthAgo && expenseDate <= today) totals.month += amount;
      if (expenseDate >= yearAgo && expenseDate <= today) totals.year += amount;
    });

    setTodayTotal(totals.today);
    setYesterdayTotal(totals.yesterday);
    setWeekTotal(totals.week);
    setMonthTotal(totals.month);
    setYearTotal(totals.year);
    setOverallTotal(totals.overall);
  };

  // Prepare chart data for PieChart
  const prepareChartData = (data) => {
    const chartArray = data.map((item) => ({
      name: item.ExpenseItem,
      value: parseFloat(item.ExpenseCost),
    }));
    setChartData(chartArray);
  };

  useEffect(() => {
    if (!UserId) navigate("/login");
    else fetchExpenses();
  }, [UserId, navigate]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3D67"];

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Welcome, {UserName} 👋</h2>
        <p className="text-muted">Here’s your expense summary:</p>
      </div>

      <div className="row">
        {/* Totals Cards */}
        <div className="col-md-4">
          <div className="card bg-primary text-white text-center p-3 mb-3">
            <h5>Today's Expenses</h5>
            <p>₹{todayTotal}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white text-center p-3 mb-3">
            <h5>Yesterday's Expenses</h5>
            <p>₹{yesterdayTotal}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white text-center p-3 mb-3">
            <h5>This Week</h5>
            <p>₹{weekTotal}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white text-center p-3 mb-3">
            <h5>This Month</h5>
            <p>₹{monthTotal}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-secondary text-white text-center p-3 mb-3">
            <h5>This Year</h5>
            <p>₹{yearTotal}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white text-center p-3 mb-3">
            <h5>Total Spent</h5>
            <p>₹{overallTotal}</p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-5 text-center">
        <h4>💸 Expense Breakdown</h4>
        <PieChart width={400} height={300} className="mx-auto">
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
