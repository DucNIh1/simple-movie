// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrBnm5V8Dothax7nYj6jeO8FOTA0VdTPw",
  authDomain: "learn-firebase-d3eeb.firebaseapp.com",
  projectId: "learn-firebase-d3eeb",
  storageBucket: "learn-firebase-d3eeb.appspot.com",
  messagingSenderId: "441332037266",
  appId: "1:441332037266:web:53d18ea195c981ef51184b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// init service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
