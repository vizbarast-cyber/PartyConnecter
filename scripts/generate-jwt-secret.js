// Generate a secure JWT secret
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('Generated JWT Secret:');
console.log(jwtSecret);
console.log('\nAdd this to your backend/.env file as:');
console.log(`JWT_SECRET=${jwtSecret}`);

