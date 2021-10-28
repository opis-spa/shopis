export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const isProduction = process.env.REACT_APP_PROD || false;
export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
export const facebookPixelConfig = process.env.REACT_APP_FACEBOOK_PIXEL;
export const hotjarConfig = process.env.REACT_APP_HOTJAR;
export const paypalConfig = process.env.REACT_APP_PAYPAL_ID;
