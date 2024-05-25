import React from 'react';
import {auth, provider} from "../../config/firebase-config";
import {signInWithPopup} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import ExpenseTracker from '../../pages/expenseTracker/expenseTracker'
const { isAuth } = useGetUserInfo();

const authension = () => {
const navigate = useNavigate();

const signInWithGoogle = async () => {
 const results = await signInWithPopup (auth, provider);
 const authInfo ={
  userId: results.user.uid,
  name: results.user.displayName,
  profilePhoto: results.user.photoURL,
  isAuth:true,
 }
 localStorage.setItem("auth", JSON.stringify(authInfo))
 navigate("/expenseTracker")
}
if (isAuth) {
  return <Navigate to="/expenseTracker" />;
}
  return (
    <div className="login-page">
      <p>Sign in with Google to continue</p>
      <button className='login_btn' onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}

export default authension