// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA30f4xVfSp7Etbhqrub6TwB-sfYk5qwlY",
  authDomain: "workshop-464e9.firebaseapp.com",
  projectId: "workshop-464e9",
  storageBucket: "workshop-464e9.firebasestorage.app",
  messagingSenderId: "532063368015",
  appId: "1:532063368015:web:296bf8bb33b2d1e918cb3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;