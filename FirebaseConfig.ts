import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBINFFiouzqSlgMDVe_563UHD0A_ol_kM",
  authDomain: "schedule-app-37f0c.firebaseapp.com",
  projectId: "schedule-app-37f0c",
  storageBucket: "schedule-app-37f0c.appspot.com",
  messagingSenderId: "205971576199",
  appId: "1:205971576199:web:b4b4032a798a01d93cef22",
  measurementId: "G-5YV5S8293N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Use react-native persistence
export const auth = initializeAuth(app);
export const db = getFirestore(app);
