// import modules that are needed
import { db } from "./utils/firebase-utils";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

let signedIn = false;
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const collectionRef = collection(db, "Users");
// const form = document.querySelector(".myForm");

// var db = firebase.firestore();

let userId = "";
let profilePicture = "";
let username = "";

const provider = new GoogleAuthProvider();

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    signedIn = true;
    console.log("user is signed in: ", user.displayName);
    userId = user.uid;
    profilePicture = user.photoURL;
    username = user.displayName;
  } else {
    console.log("no user detected");
  }
});

function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      location.reload();
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

// import the appropriate CSS files
// main.css contains the css for the entire app, including tailwind
import "./styles/main.css";

console.log("This log is coming from index.js");
console.log(db);

const loader = document.getElementById("loader");
loader.style.display = "none";

const userButton = document.getElementById("profile-btn");

document.addEventListener("click", signInWithGooglePopup);

async function signInWithGooglePopup() {
  if (signedIn == true) {
    return;
  }
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      signedIn = true;

      //saves user data from google account
      userId = user.uid;
      profilePicture = user.photoURL;
      username = user.displayName;

      profileImg.style.backgroundImage = `url('${profilePicture}')`;
      button.classList.remove("sign-in-button");
      button.classList.add("username-div");
      button.addEventListener("click", logOut);
      button.textContent = "Sign Out";
      // HELP HELP IM TRAPPED GET ME OUT OF HERE

      findUser(username, userId, user.email);

      userInfo.textContent = `Current User Logged In: ${username}. `;

      loadMyHabits(userId);
      // addCollection();
      daysDifference(userId);
      updateMyGraph(userId);
    })

    .catch((error) => {
      // const userId = "bdsfhadabsfbjds";
      console.log("doesn't work");
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage);
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
