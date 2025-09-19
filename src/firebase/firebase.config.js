// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5PhKA22jFhL8EZ4UxycEGi4ak6wTp0qE",
  authDomain: "zap-shift-e1a5f.firebaseapp.com",
  projectId: "zap-shift-e1a5f",
  storageBucket: "zap-shift-e1a5f.firebasestorage.app",
  messagingSenderId: "902356733130",
  appId: "1:902356733130:web:e7c21bb0f01e0755b17833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);