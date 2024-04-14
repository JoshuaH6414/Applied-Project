import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig ={
  //firbase configuration, change the API according to the database

  apiKey: "AIzaSyCEwmseSNQ0pjQcRAzVmy_treppq6Hu6pA",
  authDomain: "test-870cb.firebaseapp.com",
  projectId: "test-870cb",
  storageBucket: "test-870cb.appspot.com",
  messagingSenderId: "998056003172",
  appId: "1:998056003172:web:5badf25e5bb6b07e214171",
  measurementId: "G-PGF4RNVGKJ"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};