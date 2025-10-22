
import React, { use } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState ,useEffect} from "react";
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
   
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://expense-app-backend-ibdf.onrender.com/api/add_expense/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, UserId: userId }),
      });

      const res = await response.json();
      if (response.status === 201) {
        toast.success(res.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } 
      else {
        const result = await response.json();
        toast.error(result.message);
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
          <i className="fas fa-plus me-2"></i>Add Expense
        </h2>
        <p className="text-muted">
           track Your New  expenses Here
        </p>
      </div>

      <form
        onSubmit={handlesubmit}
        className="p-4 border rounded  shadow  mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="">
          <label className="from-label">Expense Date</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              value={data.FullName}
              name="ExpenseDate"
              placeholder=""
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="">
          <label className="from-label">Expense Item</label>
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
          <label className="from-label">Expense Cost </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-rupee-sign"></i>
            </span>
            <input
              type="text"
              value={data.ExpenseCost}
              name="ExpenseCost"
              placeholder="Enter ammount spent"
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

export default AddExpense