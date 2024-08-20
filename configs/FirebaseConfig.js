// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAemHGds98-5bH05GZTfMsTJs3yCa5Zd6k",
  authDomain: "tutorials-a272f.firebaseapp.com",
  projectId: "tutorials-a272f",
  storageBucket: "tutorials-a272f.appspot.com",
  messagingSenderId: "1087673664180",
  appId: "1:1087673664180:web:df64c03e595a8bfcf40de1",
  measurementId: "G-4BMLX28FEP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
