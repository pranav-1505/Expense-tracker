import React, { useEffect, useState } from 'react'
import { query, collection,  orderBy,  where, onSnapshot} from 'firebase/firestore';
import { db } from "../config/firebase-config"
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTranscation = () => {
    const[transcation, setTranscation] =useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
      });
    const transactionCollectionRef = collection(db, "Transcation");

    const { userID } =useGetUserInfo()

    const getTranscation = async ()=>{
        let unsubscribe;
try{
   const queryTranscation = query(
    transactionCollectionRef, 
    // where("userID", "==", userID),
    orderBy("createdAt"),
);
unsubscribe = onSnapshot(queryTranscation, (snapshot)=>{

        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
            const data = doc.data()
            const id = doc.id

            docs.push({...data, id});

            if (data.transcationType === "expense") {
                totalExpenses += Number(data.transcationAmount);
              } else {
                totalIncome += Number(data.transcationAmount);
              }
        });
      setTranscation(docs)
      let balance = totalIncome - totalExpenses;
      setTransactionTotals({
        balance,
        expenses: totalExpenses,
        income: totalIncome,
      });
    })
  
}
catch(err){
    console.log(err)
}
return () => unsubscribe();
    };
    useEffect(()=>{
        getTranscation()
    }, [])

  return { transcation, transactionTotals  }
}
