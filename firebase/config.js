import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'



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
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase.initializeApp(firebaseConfig);;