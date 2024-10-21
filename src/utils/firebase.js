// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA75XqQ09Nb0ozKDNFDDXGX2VqnKVyJaFs",
  authDomain: "react-auth-922e0.firebaseapp.com",
  projectId: "react-auth-922e0",
  storageBucket: "react-auth-922e0.appspot.com",
  messagingSenderId: "783242710136",
  appId: "1:783242710136:web:e5f51eb3ec4e3d598ab18d",
  measurementId: "G-15D7C112RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore()
const storage = getStorage();

export {auth, db , deleteDoc, doc, storage}
