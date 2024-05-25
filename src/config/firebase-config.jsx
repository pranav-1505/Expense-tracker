// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9s3bapInQKG0hwIsG7BVTtbqhF0fUgC4",
  authDomain: "expensetracker-b58b5.firebaseapp.com",
  projectId: "expensetracker-b58b5",
  storageBucket: "expensetracker-b58b5.appspot.com",
  messagingSenderId: "9008781822",
  appId: "1:9008781822:web:f6f44893e7783d7d6fc8af",
  measurementId: "G-XXLYZTHM4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

