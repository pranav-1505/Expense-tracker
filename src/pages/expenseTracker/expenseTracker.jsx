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
      <h1>{name}'s Expense Tracker</h1>
      <div className='balance'>
        <h3>Your Balance</h3>
        {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
      </div>
      <div className='summary'>
        <div className='Income'>
          <h3>Income</h3>
          <p>${income}</p>
        </div>
        <div className='expense'>
          <h3>Expenses</h3>
          <p>${expenses}</p>
        </div>
      </div>
      <form className='add-transcation' onSubmit={onSubmit}>
        <input
         type="text"
         placeholder='Description'
         value={description}
         required 
         onChange={(e)=>setDescription(e.target.value)}
         />
        <input type="number" 
        placeholder='Amount' 
        value={transcationAmount}
        required   
        onChange={(e)=>setTranscationAmount(e.target.value)}
        />
        <input 
        type="radio"  
        id="expense" 
        value="expense"
        checked={transcationType ==="expense"}
        onChange={(e)=>setTranscationType(e.target.value)}
        />
        <label htmlFor='expense'>Expense</label>
        <input 
        type="radio"  
        id="income" 
        value="income"
        checked={transcationType ==="income"}
        onChange={(e)=>setTranscationType(e.target.value)}
        />
        <label htmlFor='income'>Income</label>
        <button type='submit'>Add</button>
      </form>
      {
        profilePhoto && <div className='profile'>
        <img className='profile-photo' src={profilePhoto}/>
        <button className='sign-out-button' onClick={signUserOut}>sign out</button>
        </div>
      }
    </div>
    <div className='transcation'>
    <h3>Transcation</h3>
    <ul>
      {transcation.map((transcation)=>{
        const {description, transcationAmount, transcationType}  = transcation;
        return(
          <li>
            <h4>{description}</h4>
            <p>
            {""}
            ${transcationAmount} . <label>{transcationType}</label></p>
          </li>
        );
      })}
    </ul>
    </div>
    </>
  )
}

export default ExpenseTracker