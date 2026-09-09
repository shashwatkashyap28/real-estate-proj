import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mern-state-2c399.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mern-state-2c399",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mern-state-2c399.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1001121265243",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1001121265243:web:8bc1aa4e8bfdc860b0717e",
};

// Check if Firebase API key is present
export const isFirebaseConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== '');

// Initialize Firebase safely (avoiding duplicate app initialization during Vite HMR)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);