
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBXwGN1DsKaAy27IYES6BtdcjOk6Z7KxwM",
  authDomain: "rn-social-demo.firebaseapp.com",
  projectId: "rn-social-demo",
  storageBucket: "rn-social-demo.appspot.com",
  messagingSenderId: "714401453454",
  appId: "1:714401453454:web:185efdabb249b828a440df",
  measurementId: "G-48L73PSLYJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
 