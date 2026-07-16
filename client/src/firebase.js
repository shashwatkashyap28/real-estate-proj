// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-2c399.firebaseapp.com",
  projectId: "mern-state-2c399",
  storageBucket: "mern-state-2c399.firebasestorage.app",
  messagingSenderId: "1001121265243",
  appId: "1:1001121265243:web:8bc1aa4e8bfdc860b0717e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);