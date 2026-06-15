import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBnqqCjSzVv-KnWuV3A5MDalfyoBwfwn2o",
  authDomain: "lordshaputale-ccc2c.firebaseapp.com",
  databaseURL: "https://lordshaputale-ccc2c-default-rtdb.firebaseio.com",
  projectId: "lordshaputale-ccc2c",
  storageBucket: "lordshaputale-ccc2c.firebasestorage.app",
  messagingSenderId: "675721904639",
  appId: "1:675721904639:web:537f9b050feac5e902e7ca",
  measurementId: "G-SJQ217RCBR",
};

// Initialize Firebase — app must come first
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
