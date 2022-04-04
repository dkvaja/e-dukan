// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjCOu_I-IecF0ZykI1wlOsiXD7_bpJ9-M",
  authDomain: "e-dukan-51528.firebaseapp.com",
  projectId: "e-dukan-51528",
  storageBucket: "e-dukan-51528.appspot.com",
  messagingSenderId: "837346465074",
  appId: "1:837346465074:web:b47a1957659e6cace0332b",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
