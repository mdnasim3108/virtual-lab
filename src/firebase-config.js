import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBhCVbA8B8SSOyN247ANnEIQ7yyEFaAXqw",
    authDomain: "authentication-42891.firebaseapp.com",
    projectId: "authentication-42891",
    storageBucket: "authentication-42891.appspot.com",
    messagingSenderId: "738022442729",
    appId: "1:738022442729:web:a32f7caa72be24a6e65278"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);

export {auth ,app , db}
