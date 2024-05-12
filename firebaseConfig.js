// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'; // Import authentication module


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Test DB
const firebaseConfig = {
  apiKey: "AIzaSyA82iw1zmPZsw5sax2iXUlIq9EYRWtXCEU",
  authDomain: "test-index-f1868.firebaseapp.com",
  projectId: "test-index-f1868",
  storageBucket: "test-index-f1868.appspot.com",
  messagingSenderId: "15807652300",
  appId: "1:15807652300:web:ff0cee5a6da2024f277d69",
  measurementId: "G-C0B3KGSZFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app);
const auth = getAuth(app);
const db = getFirestore(app); 

export { app, auth, db };