

import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJV9dH72xNUIXWkn2fgB0_66NapfAgVFc",
  authDomain: "kizzy-food-delivery-app.firebaseapp.com",
  projectId: "kizzy-food-delivery-app",
  storageBucket: "kizzy-food-delivery-app.firebasestorage.app",
  messagingSenderId: "663210574478",
  appId: "1:663210574478:web:0ae9a09f5346079ab6ffdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
    
const provider = new GoogleAuthProvider();

export { auth, provider };
