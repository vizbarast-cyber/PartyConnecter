// Verify security configuration
require('dotenv').config();

console.log('🔒 Security Configuration Check\n');
console.log('='.repeat(50));

const checks = {
  'JWT_SECRET': {
    value: process.env.JWT_SECRET,
    valid: (val) => val && val.length >= 32,
    message: 'JWT_SECRET must be at least 32 characters',
  },
  'FIREBASE_PRIVATE_KEY': {
    value: process.env.FIREBASE_PRIVATE_KEY ? '***SET***' : null,
    valid: (val) => val !== null,
    message: 'FIREBASE_PRIVATE_KEY must be set',
  },
  'FIREBASE_CLIENT_EMAIL': {
    value: process.env.FIREBASE_CLIENT_EMAIL,
    valid: (val) => val && val.includes('@'),
    message: 'FIREBASE_CLIENT_EMAIL must be set',
  },
  'MONGODB_URI': {
    value: process.env.MONGODB_URI ? '***SET***' : null,
    valid: (val) => val !== null,
    message: 'MONGODB_URI must be set',
  },
  'NODE_ENV': {
    value: process.env.NODE_ENV || 'development',
    valid: (val) => ['development', 'production', 'test'].includes(val),
    message: 'NODE_ENV should be development, production, or test',
  },
  'ALLOWED_ORIGINS': {
    value: process.env.ALLOWED_ORIGINS || (process.env.NODE_ENV === 'production' ? 'NOT SET' : 'N/A (dev mode)'),
    valid: (val) => process.env.NODE_ENV !== 'production' || (val && val.includes('https://')),
    message: 'ALLOWED_ORIGINS must be set in production',
  },
};

let allPassed = true;

Object.entries(checks).forEach(([key, check]) => {
  const isValid = check.valid(check.value);
  const icon = isValid ? '✅' : '❌';
  console.log(`${icon} ${key}: ${check.value || 'NOT SET'}`);
  if (!isValid) {
    console.log(`   ⚠️  ${check.message}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All security checks passed!');
} else {
  console.log('❌ Some security checks failed. Please fix the issues above.');
}
console.log('='.repeat(50));

