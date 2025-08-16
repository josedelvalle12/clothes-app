// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1PX1st2Az15sNRySjGh8A1A8vybxwqJc",
  authDomain: "clothes-app-7dd23.firebaseapp.com",
  projectId: "clothes-app-7dd23",
  storageBucket: "clothes-app-7dd23.firebasestorage.app",
  messagingSenderId: "420560439844",
  appId: "1:420560439844:web:5a005dd6314a5c02cae6b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);