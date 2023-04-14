// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9fspy37elEHF18MuqaXmojHHDRKPqYW4",
  authDomain: "brainbuster-fba66.firebaseapp.com",
  projectId: "brainbuster-fba66",
  storageBucket: "brainbuster-fba66.appspot.com",
  messagingSenderId: "765044216358",
  appId: "1:765044216358:web:9267c879e82fa422facce7",
  measurementId: "G-HJ9EZTKDKW",
  databaseURL: "https://brainbuster-fba66-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider,database};
