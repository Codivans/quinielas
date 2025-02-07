import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC4L4Tz-4Mn4FHBPFY49CKb36T85EwpD40",
    authDomain: "quiniela-d49f4.firebaseapp.com",
    projectId: "quiniela-d49f4",
    storageBucket: "quiniela-d49f4.firebasestorage.app",
    messagingSenderId: "1028977858797",
    appId: "1:1028977858797:web:061942a0c7e504fcc894e4"
  };
  

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
