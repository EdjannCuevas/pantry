// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDolIlmpdTJD-B8E6XAUby4tuuNk6DwE_M",
  authDomain: "pantry-app-a37ee.firebaseapp.com",
  databaseURL: "https://pantry-app-a37ee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pantry-app-a37ee",
  storageBucket: "pantry-app-a37ee.appspot.com",
  messagingSenderId: "241005645484",
  appId: "1:241005645484:web:eda2c63b42665d3247d909",
  measurementId: "G-S1ZPYTZJD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);