import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/authension'
import ExpenseTracker from './pages/expenseTracker/expenseTracker'

function App() {
  return (
    <div className='App'>
    <Router>
       <Routes>
       <Route path="/" exact element={<Auth />} />
       <Route path="/expenseTracker" exact element={<ExpenseTracker />} />
       </Routes>
    </Router>
    </div>
  )
}

export default App
