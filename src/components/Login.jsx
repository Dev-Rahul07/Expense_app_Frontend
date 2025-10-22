import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  

  const handlesubmit = async (e) => {   
    e.preventDefault();
    try {
        const response = await fetch("https://expense-app-backend-ibdf.onrender.com/api/login/",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        if(response.status === 200){
            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
            console.log(response);
            const r = await response.json();
            console.log(r);
            
            localStorage.setItem('UserId',r.userId);
            localStorage.setItem('UserName',r.userName);
        }
        else{
            const res = await response.json();
            toast.error(res.message || "Login Failed");
        }
    
    } 
    catch (error) {
        console.error("Error", error);
        toast.error("somthing went Wrong...");
    }
    
  };

   return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        {/* Header */}
        <h2 className="padding b-4">
          <i className="fas fa-sign-in-alt me-2"></i>Login
        </h2>
        <p className="text-muted mb-4">
          Enter your credentials to access your account
        </p>

        
        <form
          onSubmit={handlesubmit}
          className="border p-4 rounded shadow bg-white"
          style={{ minWidth: "300px" }}
        >
          <div className="form-group mb-3 text-start">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={handleChange}
              name="Email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={handleChange}
              name="Password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Toasts */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
