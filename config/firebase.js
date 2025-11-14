// Firebase Web SDK Configuration (Expo Compatible)
import { initializeApp, getApps } from 'firebase/app';
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

// Initialize Firebase (only if not already initialized)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth
let auth;
try {
  auth = getAuth(app);
  // Ensure auth is ready
  if (!auth) {
    throw new Error('Auth not initialized');
  }
} catch (error) {
  console.error('Firebase Auth initialization error:', error);
  // Create a minimal auth object to prevent crashes
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
  };
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
} catch (error) {
  console.error('Firestore initialization error:', error);
}

// Initialize Storage
let storage;
try {
  storage = getStorage(app);
} catch (error) {
  console.error('Storage initialization error:', error);
}

export { auth, db, storage };
export default app;
