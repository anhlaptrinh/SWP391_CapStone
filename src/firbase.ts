// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDsz-p-K_MvXixjZVVzL5YM1Rg-Yn43Suk',
    authDomain: 'swp391capstone.firebaseapp.com',
    databaseURL: 'https://swp391capstone-default-rtdb.firebaseio.com', 
    projectId: 'swp391capstone',
    storageBucket: 'swp391capstone.appspot.com',
    messagingSenderId: '38663846974',
    appId: '1:38663846974:web:2a5d74fae32361462de56f',
    measurementId: 'G-LQSFDFY1XF'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Get a reference to Firebase Storage
export const auth = getAuth(app);