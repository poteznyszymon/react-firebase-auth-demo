// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9298bmOhwoH4XWinM7Ykkv1tyxeerY50",
  authDomain: "react-login-77b24.firebaseapp.com",
  projectId: "react-login-77b24",
  storageBucket: "react-login-77b24.appspot.com",
  messagingSenderId: "990595226445",
  appId: "1:990595226445:web:22c4674a5eac9159aff504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;