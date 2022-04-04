import { collection, doc, setDoc } from "firebase/firestore";
import { PRODUCTS, USERS } from "../constants/firebase";
import { auth, db } from "../firebase/config";

export const addUser = (profile) =>
  new Promise((resolve, reject) => {
    const newProfileRef = doc(collection(db, USERS));
    setDoc(newProfileRef, {
      ...profile,
      id: newProfileRef.id,
      createdAt: new Date(),
      createdBy: auth?.currentUser?.uid,
    })
      .then(() => resolve(true))
      .catch((error) => reject(false));
  });

export const addProduct = (product) =>
  new Promise((resolve, reject) => {
    const newProductRef = doc(collection(db, PRODUCTS));
    setDoc(newProductRef, {
      ...product,
      id: newProductRef.id,
      createdAt: new Date(),
      createdBy: auth?.currentUser?.uid,
    })
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
