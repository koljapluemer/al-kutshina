import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const useFirestore = () => {
  const writeToCollection = async (collectionName: string, data: Record<string, any>) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (e) {
      console.error("Error adding data: ", e);
      throw e;
    }
  };

  return { writeToCollection };
};
