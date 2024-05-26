import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/authension'
import ExpenseTracker from './pages/expenseTracker/expenseTracker'
import ExpenseList from './pages/expenseTracker/expenseList';

function App() {
  return (
    <div className='App'>
    <Router>
       <Routes>
       <Route path="/" exact element={<Auth />} />
       <Route path="/expenseTracker" exact element={<ExpenseTracker />} />
       <Route path="/expenseList" exact element={<ExpenseList />} />
       </Routes>
    </Router>
    </div>
  )
}

export default App
