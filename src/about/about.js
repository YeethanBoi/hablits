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
    DisplayBoxes(user);
  } else {
    console.log("no user detected");
  }
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

async function DisplayBoxes(user) {
  // const q = query(collection(db, "users", user.uid))
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  let theDateArray;
  let thePercentageArray;

  if (docSnap.exists()) {
    theDateArray = docSnap.data().dateImprovement;
    thePercentageArray = docSnap.data().percentageImprovement;
  }

  console.log(longestStreak(theDateArray) + "/" + currentStreak(theDateArray));

  let amountOfHabits = 0;

  const q = query(collection(db, "users", user.uid, "habits"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.data().hasCompletedToday == false) {
      if (getRndInteger(0, 1) == 1) {
        console.log("worekad");
        document.getElementById("box-cont").insertAdjacentHTML(
          "afterbegin",
          `<div
        class="m-auto mt-10 flex h-auto items-center justify-between rounded-lg border-4 border-primary bg-gray-300 p-10"
      >
        <div class="w-2/5">
          <img
            src="/assets/${doc.data().picture}.png"
            alt="Image Description"
            class="h-auto w-full rounded-lg"
          />
        </div>
        <div class="w-3/5 space-y-4">
          <h1 class="text-right text-5xl font-bold">
            You haven't completed your ${doc.data().habitName} habit yet today!
          </h1>
          <!-- <p class="text-right text-2xl">Complete </p> -->
          <a
            class="btn btn-primary"
            style="margin-left: 68%"
            href="./about/index.html"
            >Complete hablit</a
          >
        </div>
      </div>`,
        );
      }
    }

    amountOfHabits++;
  });

  document.getElementById("box-cont").insertAdjacentHTML(
    "afterbegin",
    ` <div
  class="m-auto mt-10 flex h-auto items-center justify-between rounded-lg border-4 border-primary bg-gray-300 p-10"
>
  <div class="w-full space-y-4">
    <h1 class="text-7xl font-bold">Try to beat your best streak!</h1>
    <p class="text-2xl">Your streak is at ${currentStreak(
      theDateArray,
    )} days out of ${longestStreak(theDateArray)} days</p>
    
  </div>
  
</div>`,
  );
  document.getElementById("box-cont").insertAdjacentHTML(
    "afterbegin",
    `<div
  class="m-auto mt-10 flex h-auto items-center justify-between rounded-lg border-4 border-primary bg-gray-300 p-10"
>
  <div class="w-3/5 space-y-4">
    <h1 class="text-7xl font-bold">Start Making Your Hablits Today</h1>
    <p class="text-2xl">You've got ${amountOfHabits - 1} habits currently</p>
    <a class="btn btn-primary" href="./create-habit/index.html"
      >Make hablits now</a
    >
  </div>
  <div class="w-2/5">
    <img
      src="/assets/allhabits.png"
      alt="Image Description"
      class="h-auto w-full"
    />
  </div>
</div>`,
  );
}

function longestStreak(dates) {
  const sortedDates = dates
    .map((date) => new Date(date.split("/").reverse().join("-")))
    .sort((a, b) => a - b);

  let longestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diffInDays =
      (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
  }

  return longestStreak;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function currentStreak(dates) {
  const sortedDates = dates
    .map((date) => new Date(date.split("/").reverse().join("-")))
    .sort((a, b) => b - a); // sort in descending order

  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diffInDays =
      (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}

// if (signedIn == true) {
//   console.log("ITS SIGNED");
// }
