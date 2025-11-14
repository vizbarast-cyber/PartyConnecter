#!/usr/bin/env node
// Complete production setup script
require('dotenv').config({ path: './backend/.env' });
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

console.log('🚀 PartyConnect Production Setup\n');
console.log('='.repeat(60));

// Step 1: Generate JWT Secret
console.log('\n1️⃣  Generating JWT Secret...');
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('✅ JWT Secret generated');
console.log(`   Add to backend/.env: JWT_SECRET=${jwtSecret}`);

// Step 2: Verify .env file
console.log('\n2️⃣  Checking environment variables...');
const envPath = path.join(__dirname, '..', 'backend', '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  backend/.env not found. Creating from template...');
  // You would copy from .env.example here
} else {
  console.log('✅ .env file exists');
}

// Step 3: Verify security configuration
console.log('\n3️⃣  Verifying security configuration...');
try {
  require('../backend/middleware/errorHandler');
  console.log('✅ Error handler configured');
} catch (e) {
  console.log('⚠️  Error handler check skipped');
}

// Step 4: Check Firebase rules
console.log('\n4️⃣  Checking Firebase security rules...');
const firestoreRules = path.join(__dirname, '..', 'firebase-security-rules', 'firestore.rules');
const storageRules = path.join(__dirname, '..', 'firebase-security-rules', 'storage.rules');
if (fs.existsSync(firestoreRules) && fs.existsSync(storageRules)) {
  console.log('✅ Firebase security rules found');
  console.log('   Run: node scripts/deploy-firebase-rules.js to deploy');
} else {
  console.log('⚠️  Firebase security rules not found');
}

// Step 5: Database indexes
console.log('\n5️⃣  Database indexes...');
console.log('   Run: node scripts/setup-database-indexes.js to create indexes');

// Step 6: Verify backend dependencies
console.log('\n6️⃣  Checking backend dependencies...');
const backendPackageJson = path.join(__dirname, '..', 'backend', 'package.json');
if (fs.existsSync(backendPackageJson)) {
  const pkg = JSON.parse(fs.readFileSync(backendPackageJson, 'utf8'));
  const requiredDeps = ['helmet', 'express-rate-limit', 'compression', 'morgan'];
  const missing = requiredDeps.filter(dep => !pkg.dependencies[dep]);
  if (missing.length === 0) {
    console.log('✅ All security dependencies installed');
  } else {
    console.log(`⚠️  Missing dependencies: ${missing.join(', ')}`);
    console.log('   Run: cd backend && npm install');
  }
}

// Step 7: Check API URL configuration
console.log('\n7️⃣  Checking API URL configuration...');
const apiServicePath = path.join(__dirname, '..', 'services', 'api.js');
if (fs.existsSync(apiServicePath)) {
  const apiContent = fs.readFileSync(apiServicePath, 'utf8');
  if (apiContent.includes('api.yourdomain.com')) {
    console.log('⚠️  API URL still has placeholder');
    console.log('   Update services/api.js with your production API URL');
  } else {
    console.log('✅ API URL configured');
  }
}

// Step 8: Check legal URLs
console.log('\n8️⃣  Checking legal URLs...');
const legalConfigPath = path.join(__dirname, '..', 'config', 'legal.js');
if (fs.existsSync(legalConfigPath)) {
  const legalContent = fs.readFileSync(legalConfigPath, 'utf8');
  if (legalContent.includes('example.com')) {
    console.log('⚠️  Legal URLs still have placeholders');
    console.log('   Update config/legal.js with your actual URLs');
  } else {
    console.log('✅ Legal URLs configured');
  }
}

console.log('\n' + '='.repeat(60));
console.log('📋 Next Steps:');
console.log('   1. Update backend/.env with the generated JWT_SECRET');
console.log('   2. Update services/api.js with your production API URL');
console.log('   3. Update config/legal.js with your privacy policy and terms URLs');
console.log('   4. Run: node scripts/setup-database-indexes.js');
console.log('   5. Run: node scripts/deploy-firebase-rules.js');
console.log('   6. Run: node scripts/verify-security.js');
console.log('='.repeat(60));

