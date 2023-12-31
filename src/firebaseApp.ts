// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQqrgo2TLvghyufDLDXu6nucmO9JfYuuE",
  authDomain: "twitter-a4c16.firebaseapp.com",
  projectId: "twitter-a4c16",
  storageBucket: "twitter-a4c16.appspot.com",
  messagingSenderId: "574270011200",
  appId: "1:574270011200:web:a6e5ebe4932add5a402ca5",
  measurementId: "G-NFVB7CK9ZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
