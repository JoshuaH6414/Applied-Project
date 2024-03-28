// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'; // Import authentication module


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT8teK06nU-uAqIw7ZPCoMQg_xO3vudeI",
  authDomain: "flixtok-36671.firebaseapp.com",
  projectId: "flixtok-36671",
  storageBucket: "flixtok-36671.appspot.com",
  messagingSenderId: "769749750965",
  appId: "1:769749750965:web:2e1bbb9c32544067869afc",
  measurementId: "G-VBS8RE6H49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export { app, auth }
