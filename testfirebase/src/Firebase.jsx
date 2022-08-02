import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD6dAF5eM94EjSHWgwamqBoLC1cCYCme0c",
  authDomain: "testfirebase-4a342.firebaseapp.com",
  projectId: "testfirebase-4a342",
  storageBucket: "testfirebase-4a342.appspot.com",
  messagingSenderId: "883821567215",
  appId: "1:883821567215:web:8e204b979a611e5aa88f1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);