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

// Initialize Auth - wait a bit to ensure Firebase is ready
let auth;
try {
  // Small delay to ensure Firebase is fully initialized
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase Auth initialization error:', error);
  // Retry after a short delay
  setTimeout(() => {
    try {
      auth = getAuth(app);
    } catch (retryError) {
      console.error('Firebase Auth retry failed:', retryError);
    }
  }, 100);
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
