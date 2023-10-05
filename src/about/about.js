// import the appropriate CSS files
// main.css contains the css for the entire app, including tailwind
import "../styles/main.css";
// import { signedIn } from "../main.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
  limit,
  onSnapshot,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBPUq_3dMVUYPA94SBHBAtkAWsFlySNs6k",
  authDomain: "hablits-8a957.firebaseapp.com",
  projectId: "hablits-8a957",
  storageBucket: "hablits-8a957.appspot.com",
  messagingSenderId: "607760813629",
  appId: "1:607760813629:web:34dd984572201352c4a454",
};
// let signedIn = false;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
let signedIn = false;
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    signedIn = true;
    console.log("user detected");
    document.getElementById("sign-modal").remove();
  } else {
    console.log("no user detected");
  }
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

// if (signedIn == true) {
//   console.log("ITS SIGNED");
// }
