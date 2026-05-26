import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWyBKFmRXwfYt9UaJloUB_VQT8U9hnCJc",
  authDomain: "e-commerce-5711.firebaseapp.com",
  projectId: "e-commerce-5711",
  storageBucket: "e-commerce-5711.firebasestorage.app",
  messagingSenderId: "257023649736",
  appId: "1:257023649736:web:f10816ea250e05782782fd",
  measurementId: "G-EGB2G3RTV3",
  databaseURL: "https://e-commerce-5711-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);
