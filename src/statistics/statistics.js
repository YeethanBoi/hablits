// import the appropriate CSS files
// main.css contains the css for the entire app, including tailwind
import "chartjs-adapter-date-fns";
import { db } from "../utils/firebase-utils";
import { parse } from "date-fns";
// import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import {
  deleteDoc,
  collection,
  doc,
  query,
  getDoc,
  where,
  getDocs,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
// import userId from "../main.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { success } from "@mariojgt/wind-notify/packages/toasts/messages";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBPUq_3dMVUYPA94SBHBAtkAWsFlySNs6k",
  authDomain: "hablits-8a957.firebaseapp.com",
  projectId: "hablits-8a957",
  storageBucket: "hablits-8a957.appspot.com",
  messagingSenderId: "607760813629",
  appId: "1:607760813629:web:34dd984572201352c4a454",
};
import "../styles/main.css";
import Chart from "chart.js/auto";
const loader = document.getElementById("loader");
loader.style.display = "none";

let theDateArray;
let thePercentageArray;
let theUserId = localStorage.getItem("userId");
const docRef = doc(db, "users", theUserId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  theDateArray = docSnap.data().dateImprovement;
  thePercentageArray = docSnap.data().percentageImprovement;
}

let streak = longestStreak(theDateArray);
let daysSinceStart = dateDifference(theDateArray);
let theCurrentPercentage = Math.round(
  thePercentageArray[thePercentageArray.length - 1],
);
let amountOfHabits = 0;
let amountOfDailyHabits = 0;
let amountOfMonthlyHabits = 0;

const q = query(collection(db, "users", theUserId, "habits"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  if (doc.id != "dummy") {
    amountOfHabits++;

    if (doc.data().hasCompletedToday == true) {
      document.getElementById("habit-carousel").insertAdjacentHTML(
        "afterbegin",
        `<div
    class="carousel-item h-full"
    style="
      background-color: #edf2ef;
      border: 3px #456e5d solid;
      border-radius: 4px;
      position: relative;
      /* width: 37%; */
    "
  >
    <div
      style="
        position: absolute;
        top: 10px;
        left: 10px;
        border: 3px #456e5d solid;
        border-radius: 15px;
        z-index: 999;
        padding: 10px;
        width: fit-content;
        height: fit-content;
        background-color: #fff;
      "
    >
      <h1 class="text-xl font-extrabold" style="width: max-content">
        ${doc.data().habitName}
      </h1>
    </div>
    <figure style="width: 100%; height: 100%">
      <img
        style="
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: 100% 40%;
        "
        class=""
        src="../assets/${doc.data().picture}.png"
        alt="Album"
        id="habit-picture"
      />
    </figure>
  </div>`,
      );
    }
    if (doc.data().isDaily == true) {
      amountOfDailyHabits++;
    } else {
      amountOfMonthlyHabits++;
    }
  }
});

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${amountOfHabits}</dt>
<dd class="text-center text-2xl text-gray-500">Habits</dd>
</div>`,
);

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${amountOfDailyHabits}</dt>
<dd class="text-center text-2xl text-gray-500">Daily Habits</dd>
</div>`,
);

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${amountOfMonthlyHabits}</dt>
<dd class="text-center text-2xl text-gray-500">Monthly Habits</dd>
</div>`,
);

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${streak}</dt>
<dd class="text-center text-2xl text-gray-500">Day Highest Daily Streak</dd>
</div>`,
);

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${currentStreak(theDateArray)}</dt>
<dd class="text-center text-2xl text-gray-500">Day Current Streak</dd>
</div>`,
);

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${daysSinceStart}</dt>
<dd class="text-center text-2xl text-gray-500">Days Since Starting</dd>
</div>`,
);

document.getElementById("the-carousel").insertAdjacentHTML(
  "afterbegin",
  `<div
class="carousel-ins carousel-item flex flex-col items-center justify-center p-3"
style="
  background-color: #edf2ef;
  border: 3px #456e5d solid;
  border-radius: 4px;
  width: 37%;
"
>
<dt class="mb-2 text-5xl font-extrabold">${theCurrentPercentage}%</dt>
<dd class="text-center text-2xl text-gray-500">Current Improvement Percentage</dd>
</div>`,
);

// console.log(longestStreak(theDateArray) + "," + dateDifference(theDateArray));
// Assuming you have two arrays for the x and y axes
let xValues = theDateArray.map((dateStr) =>
  parse(dateStr, "dd/MM/yyyy", new Date()),
);
let yValues = thePercentageArray;

let ctx = document.getElementById("acquisitions");

let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: "Percentage Improvement",
        data: yValues,
        borderColor: "#507c6a",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "white",
        pointBorderColor: "#507c6a",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day", // specify the unit of the time scale
          displayFormats: {
            day: "MMM d", // specify the display format of the unit
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  },
});

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

function dateDifference(dates) {
  // Convert the dates to Date objects and sort them in ascending order
  const sortedDates = dates
    .map((date) => new Date(date.split("/").reverse().join("-")))
    .sort((a, b) => a - b);

  // Get the first and last date
  const startDate = sortedDates[0];
  const endDate = sortedDates[sortedDates.length - 1];

  // Calculate the difference in days
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

  return diffInDays;
}
