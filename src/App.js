import React from 'react'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import AddExpense from './components/AddExpense'
import {ManageExpense}  from './components/ManageExpense'
import ChangePassword from './components/ChangePassword'
import ExpensReport from './components/ExpensReport'


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/dashboard'element={<Dashboard/>}/>
        <Route path='/add-expense'element = {<AddExpense/>}/>
        <Route path='/manage-expense' element={<ManageExpense/>}/>
        <Route path='/change-password' element = {<ChangePassword/>}/>
        <Route path='/expense-report' element = {<ExpensReport/>}/>
        
      
      </Routes>
    </Router>
  ) 
}

export default App  