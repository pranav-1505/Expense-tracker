import React, { useState } from 'react'
import useAddTranscation from "../../hooks/useAddTranscation";
import { useGetTranscation } from '../../hooks/useGetTranscation';
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "../../pages/expenseTracker/style.css";
import { auth } from "../../config/firebase-config";


const ExpenseTracker = () => {
const {addTransaction} = useAddTranscation();
const { transcation, transactionTotals } = useGetTranscation();
const {name,profilePhoto} = useGetUserInfo();
const navigate = useNavigate();
const { balance, income, expenses } = transactionTotals;

const[description, setDescription] = useState("")
const[transcationAmount, setTranscationAmount] = useState(0)
const[transcationType, setTranscationType] = useState("expense")

const onSubmit =(e)=>{
  e.preventDefault()
  addTransaction({description,transcationAmount,transcationType})
  setDescription("")
  setTranscationAmount("")
}
function handleClick() {
  navigate("/expenseList");
}

const signUserOut = async()=>{
  try{
    await signOut(auth)
    localStorage.clear();
    navigate("/");
  } catch(err){
    console.error(err)
  }
}
  return (
    <>
    <div className='expense-Tracker'>
    {
        profilePhoto && <div className='profile'>
        <img className='profile-photo' src={profilePhoto}/>
        <h1 className='main_txt'>{name}'s Expense Tracker</h1>
        <button className='sign-out-button' onClick={signUserOut}>sign out</button>
        </div>
      }
      <div className='main_balance'>
          <div className='Income'>
            <h3>Income</h3>
            <p>${income}</p>
          </div>
          <div className='balance'>
            <h3>Your Balance</h3>
          {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
          </div>
          <div className='expense'>
            <h3>Expenses</h3>
            <p>${expenses}</p>
          </div>
        </div>
        <form className='add-transcation' onSubmit={onSubmit}>
        <label className="custom-field one">
          <input  type="text"
          value={description}
            required 
            onChange={(e)=>setDescription(e.target.value)}
          />
          <span className="placeholder">Enter Text</span>
        </label>
        <label className="custom-field one">
          <input  type="number" 
           value={transcationAmount}
            required 
            onChange={(e)=>setTranscationAmount(e.target.value)}
          />
          <span className="placeholder">Enter Amount</span>
        </label>
          <label htmlFor='expense' className="input-radio-label">
          <input 
          className="input-radio off"
          type="radio"  
          id="expense" 
          value="expense"
          checked={transcationType ==="expense"}
          onChange={(e)=>setTranscationType(e.target.value)}
          />
          Expense</label>
          <label htmlFor='income' className="input-radio-label">
          <input 
          className="input-radio on"
          type="radio"  
          id="income" 
          value="income"
          checked={transcationType ==="income"}
          onChange={(e)=>setTranscationType(e.target.value)}
          />
          Income</label>
          <button type='submit' className='subscribe'>Add</button>
        </form>
        <div className='main_list'>
          <button onClick={handleClick}>Expense List</button>
        </div>
    </div>
    </>
  )
}

export default ExpenseTracker