// src/firebase.js

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your config (this is correct!)
const firebaseConfig = {
  apiKey: "AIzaSyB1qIGjBodnInzQrdqSep8czsUiWdxE-e4",
  authDomain: "blog-cms-898ab.firebaseapp.com",
  projectId: "blog-cms-898ab",
  storageBucket: "blog-cms-898ab.firebasestorage.app",
  messagingSenderId: "641737869580",
  appId: "1:641737869580:web:b3accccdeaa4c289a96129"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services to use them in other files
export const db = getFirestore(app);   // For Firestore database
export const auth = getAuth(app);      // For authentication
