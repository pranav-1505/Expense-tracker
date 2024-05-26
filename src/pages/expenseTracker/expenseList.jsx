import React from 'react'
import { useGetTranscation } from '../../hooks/useGetTranscation';
import { useNavigate } from 'react-router-dom';
import "../../pages/expenseTracker/style.css";
 const ExpenseList = () => {
    const navigate = useNavigate();
    const { transcation } = useGetTranscation();

     const backToMain =()=>{
        navigate("/expenseTracker");
     }
  return (
    <>
    <button className='backToMain' onClick={backToMain}>Back</button>
    <div className='transcation'>
    <h3>Transcation</h3>
    <ul className='trnslist'>
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
export default ExpenseList