// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWyBKFmRXwfYt9UaJloUB_VQT8U9hnCJc",
  authDomain: "e-commerce-5711.firebaseapp.com",
  projectId: "e-commerce-5711",
  storageBucket: "e-commerce-5711.firebasestorage.app",
  messagingSenderId: "257023649736",
  appId: "1:257023649736:web:f10816ea250e05782782fd",
  measurementId: "G-EGB2G3RTV3",
  databaseURL:"https://e-commerce-5711-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);