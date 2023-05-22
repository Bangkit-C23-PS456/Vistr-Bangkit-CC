const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

const credentials = {
  apiKey: process.env.FIREBASE_PROJECT_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_STORAGE_BUCKET,
};

const app = initializeApp(credentials);
const auth = getAuth(app);

module.exports = { auth };
