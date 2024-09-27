// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOaiGS2uqAVn4APbX209fwwtKUO32OkDM",
  authDomain: "something-spicy.firebaseapp.com",
  projectId: "something-spicy",
  storageBucket: "something-spicy.appspot.com",
  messagingSenderId: "1090044591945",
  appId: "1:1090044591945:web:33af9bf205737e7bdd6498"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);