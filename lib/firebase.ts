// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5tVFSDyvPacGr8c7469FNu2mpnEtkOyQ",
  authDomain: "wwjd-e695d.firebaseapp.com",
  projectId: "wwjd-e695d",
  storageBucket: "wwjd-e695d.firebasestorage.app",
  messagingSenderId: "97096199362",
  appId: "1:97096199362:web:7616dd5131ef3741af5f5b",
  measurementId: "G-54YCDKEMKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);