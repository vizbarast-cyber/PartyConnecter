// Script to deploy Firebase security rules
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 Deploying Firebase Security Rules\n');

const firebaseDir = path.join(__dirname, '..', 'firebase-security-rules');

if (!fs.existsSync(firebaseDir)) {
  console.error('❌ firebase-security-rules directory not found!');
  process.exit(1);
}

try {
  // Check if firebase-tools is installed
  try {
    execSync('firebase --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ Firebase CLI not installed. Install with: npm install -g firebase-tools');
    process.exit(1);
  }

  // Deploy Firestore rules
  console.log('📝 Deploying Firestore rules...');
  const firestoreRules = path.join(firebaseDir, 'firestore.rules');
  if (fs.existsSync(firestoreRules)) {
    execSync(`firebase deploy --only firestore:rules`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Firestore rules deployed');
  } else {
    console.log('⚠️  firestore.rules not found');
  }

  // Deploy Storage rules
  console.log('\n📦 Deploying Storage rules...');
  const storageRules = path.join(firebaseDir, 'storage.rules');
  if (fs.existsSync(storageRules)) {
    execSync(`firebase deploy --only storage`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Storage rules deployed');
  } else {
    console.log('⚠️  storage.rules not found');
  }

  console.log('\n🎉 Firebase rules deployment complete!');
} catch (error) {
  console.error('❌ Error deploying Firebase rules:', error.message);
  console.log('\nMake sure you are logged in: firebase login');
  process.exit(1);
}

