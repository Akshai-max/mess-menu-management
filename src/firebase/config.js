import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDvccGkky7MMgLYhm2w6v_JJnZPyyP83Xc",
  authDomain: "mess-menu-management.firebaseapp.com",
  projectId: "mess-menu-management",
  storageBucket: "mess-menu-management.firebasestorage.app",
  messagingSenderId: "614383559660",
  appId: "1:614383559660:web:6c96264ec0064b80f516c9",
  measurementId: "G-278YXRRJEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
