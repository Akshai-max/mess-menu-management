import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Replace these values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDNLOERkg2n7DdX2jjbxI6-LdVVWp9ECNM",
    authDomain: "eco-friendly-app-6f373.firebaseapp.com",
    projectId: "eco-friendly-app-6f373",
    storageBucket: "eco-friendly-app-6f373.firebasestorage.app",
    messagingSenderId: "260668819785",
    appId: "1:260668819785:web:0895d65d3b5035d7627298",
    measurementId: "G-P0L3K7LNH0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
