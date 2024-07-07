// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3OQuN-P5OqgonRG1nCtYGh5289OcykOE",
  authDomain: "mysteps-61e61.firebaseapp.com",
  projectId: "mysteps-61e61",
  storageBucket: "mysteps-61e61.appspot.com",
  messagingSenderId: "598193091207",
  appId: "1:598193091207:web:f54459c5db4b317d74be22",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
