// import modules that are needed
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {

// };
const firebaseConfig = {
  apiKey: "AIzaSyBPUq_3dMVUYPA94SBHBAtkAWsFlySNs6k",
  authDomain: "hablits-8a957.firebaseapp.com",
  projectId: "hablits-8a957",
  storageBucket: "hablits-8a957.appspot.com",
  messagingSenderId: "607760813629",
  appId: "1:607760813629:web:34dd984572201352c4a454",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export const db =
//   "Initialise firebaseConfig in the ./utils/firebase-utils.js and update the javascript accordingly";
