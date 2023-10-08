// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBikjiAsR1Achkfm5T0-DlQ6cQx156L_O4",
  authDomain: "drivestats-86200.firebaseapp.com",
  projectId: "drivestats-86200",
  storageBucket: "drivestats-86200.appspot.com",
  messagingSenderId: "349946811475",
  appId: "1:349946811475:web:1b1a8b669fafc7c28522a6",
  measurementId: "G-ENX7SBYTCN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);