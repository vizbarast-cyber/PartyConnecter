// Firebase Web SDK Configuration (Expo Compatible)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration from your google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyCtFX0O7ieq-gv8Cot3gVFG2PSaXxMrDRw",
  authDomain: "party-connect-q8z7m3.firebaseapp.com",
  projectId: "party-connect-q8z7m3",
  storageBucket: "party-connect-q8z7m3.firebasestorage.app",
  messagingSenderId: "982593123040",
  appId: "1:982593123040:android:235aa9b2b57af41867d685",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, db, storage };
export default app;
