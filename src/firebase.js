// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbG8ltBjL7rdnHK8bCGwzv7Btvvi09at4",
  authDomain: "theatre-2024.firebaseapp.com",
  projectId: "theatre-2024",
  storageBucket: "theatre-2024.appspot.com",
  messagingSenderId: "252829155286",
  appId: "1:252829155286:web:1a2c17ae8d665b97922e77",
  measurementId: "G-CZ2SY56BN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()

export  {app,  storage}
// const analytics = getAnalytics(app);