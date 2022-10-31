// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZ6ZdwW_J4CDvhYQ0awx-4YRHNjbp1IQ",
  authDomain: "like-facebook-cd816.firebaseapp.com",
  projectId: "like-facebook-cd816",
  storageBucket: "like-facebook-cd816.appspot.com",
  messagingSenderId: "26329509740",
  appId: "1:26329509740:web:56ed377562846bbde28d49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;