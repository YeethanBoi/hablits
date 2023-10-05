// import modules that are needed
import { db } from "./utils/firebase-utils";
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
let signedIn = false;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const collectionRef = collection(db, "Users");
// const form = document.querySelector(".myForm");

// var db = firebase.firestore();

const userTextNav = document.getElementById("name-profile");

let userId = "";
let profilePicture = "";
let username = "";

const provider = new GoogleAuthProvider();

const userButton = document.getElementById("sign-btn");

const profileImg = document.getElementById("profile-picture");

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    signedIn = true;
    console.log("user is signed in: ", user.displayName);
    userId = user.uid;
    profileImg.src = user.photoURL;
    username = user.displayName;
    document.getElementById("sign-btn").textContent = "Sign Out";

    userTextNav.textContent = username;
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
// import { signInWithRedirect } from "firebase/auth";

console.log("This log is coming from index.js");
// console.log(db);

const loader = document.getElementById("loader");
loader.style.display = "none";

userButton.addEventListener("click", signInWithGooglePopup);

async function signInWithGooglePopup() {
  if (signedIn == true) {
    logOut();
    return;
  }
  signInWithRedirect(auth, provider)
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

      userTextNav.textContent = username;

      profileImg.style.backgroundImage = `url('${profilePicture}')`;
      button.classList.remove("sign-in-button");
      button.classList.add("username-div");
      button.addEventListener("click", logOut);
      document.getElementById("sign-btn").textContent = "Sign Out";
      // HELP HELP IM TRAPPED GET ME OUT OF HERE

      findUser(username, userId, user.email);

      userInfo.textContent = `Current User Logged In: ${username}. `;

      console.log("Gets to it");
      // loadMyHabits(userId);
      // // addCollection();
      // daysDifference(userId);
      // updateMyGraph(userId);
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

async function findUser(usersName, usersID, email) {
  console.log("YES");
  const docRef = doc(db, "users", usersID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("YES");
    await setDoc(doc(db, "users", usersID), {
      name: usersName,
      lastLoggedOn: serverTimestamp(),
    });

    // Create a new collection 'habits' within the document
    const habitsCollection = collection(db, "users", usersID, "habits");
  }
}
