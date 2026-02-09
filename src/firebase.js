import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjaktKEkGJImkCweSdvQL5BwUU3EyiNGo",
    authDomain: "smart-productivity-caf6d.firebaseapp.com",
    projectId: "smart-productivity-caf6d",
    storageBucket: "smart-productivity-caf6d.firebasestorage.app",
    messagingSenderId: "436536954842",
    appId: "1:436536954842:web:2e739493bfe2618d95fae3",
    measurementId: "G-V9QXCQLXTD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
