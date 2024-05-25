import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

const useAddTranscation = () => {
    const transactionCollectionRef = collection(db, "Transcation");
    const { userId } = useGetUserInfo();
    const addTransaction = async ({
        description,
        transcationAmount,
        transcationType
    }) =>{
        await addDoc(transactionCollectionRef,{
            userId: userId || "",
            description,
            transcationAmount,
            transcationType,
            createdAt: serverTimestamp()
        });
    };
  return {addTransaction}
}

export default useAddTranscation