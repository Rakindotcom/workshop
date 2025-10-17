// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALt3vSi6x86MVmHDeUizKh-tltqW2Kl0E",
  authDomain: "jahid-hasan-milu.firebaseapp.com",
  projectId: "jahid-hasan-milu",
  storageBucket: "jahid-hasan-milu.firebasestorage.app",
  messagingSenderId: "426137656751",
  appId: "1:426137656751:web:6571831cd618a6700d235a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;