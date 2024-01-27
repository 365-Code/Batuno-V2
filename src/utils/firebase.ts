// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA43aID78H68DNEfUA8-VM9d8FnL3iv2yY",
  authDomain: "batuno-97e1f.firebaseapp.com",
  projectId: "batuno-97e1f",
  storageBucket: "batuno-97e1f.appspot.com",
  messagingSenderId: "994612472025",
  appId: "1:994612472025:web:3b47c25f7a1ba1592476c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app)