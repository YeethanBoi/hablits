import "../styles/main.css";
import { startWindToast } from "@mariojgt/wind-notify/packages/index.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
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

window.onload = function () {
  var closeButtons = document.querySelectorAll(".btn-clear");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  });
};

var closeButtons = document.querySelectorAll(".btn-clear");
closeButtons.forEach(function (button) {
  button.parentElement.style.display = "none";
});
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const loader = document.getElementById("loader");
loader.style.display = "none";

const pictureSelect = document.getElementById("picture-selector");

const presetSelect = document.getElementById("preset-selector");

const habitPicture = document.getElementById("habit-picture");

//all of the different form parts
const habitName = document.getElementById("habit-name");

const cue = document.getElementById("cue");

const craving = document.getElementById("craving");

const action = document.getElementById("action");

const reward = document.getElementById("reward");

const form = document.getElementById("habit-form");
// let userID = document.getElementById("user-id").textContent;
// console.log(userID);

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  //date selector part
  let selectedOption = document.querySelector(
    'input[name="option"]:checked',
  ).value;
  let isDailyOption;
  if (selectedOption == "1") {
    isDailyOption = true;
  } else {
    isDailyOption = false;
  }

  let selectedHabitName = habitName.value;
  let selectedCue = cue.value;
  let selectedCraving = craving.value;
  let selectedAction = action.value;
  let selectedReward = reward.value;
  let selectedPercentage = slider.value;
  let selectedPicture = pictureSelect.value;

  let theUserId = localStorage.getItem("userId");
  console.log(theUserId);

  await addDoc(collection(db, "users", theUserId, "habits"), {
    habitName: selectedHabitName,
    cue: selectedCue,
    craving: selectedCraving,
    action: selectedAction,
    reward: selectedReward,
    percentage: selectedPercentage,
    isDaily: isDailyOption,
    picture: selectedPicture,
    hasCompletedToday: false,
  });

  window.onload = function () {
    let iframe = document.getElementById("the-frame");
    iframe.src = "./habits/index.html";
  };

  var closeButtons = document.querySelectorAll(".btn-clear");
  closeButtons.forEach(function (button) {
    button.parentElement.style.display = null;
  });

  form.reset();
  presetSelect.value = "habit-preset";

  window.scrollTo(0, 0);
});

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

// Display the default slider value
output.innerHTML = slider.value + "%";

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value + "%";
};

pictureSelect.addEventListener("change", changedSelectedPicture, false);

presetSelect.addEventListener("change", changePresets, false);

function changedSelectedPicture() {
  // console.log("Registered change");
  if (pictureSelect.value == "none") {
    // console.log("Chose Default Option");
    habitPicture.src = "../assets/allhabits.png";
  } else {
    habitPicture.src = `../assets/${pictureSelect.value}.png`;
  }
}

function changePresets() {
  let selectedPreset;
  for (let i = 0; i < presets.length; i++) {
    // console.log(presetSelect.value + "||" + presets[i].name);
    if (presetSelect.value == presets[i].name) {
      // console.log("The preset chosen was " + presetSelect.value);
      selectedPreset = presets[i];
    }
  }

  habitName.value = capitalizeFLetter(selectedPreset.name);
  cue.value = selectedPreset.cue;
  craving.value = selectedPreset.cue;
  action.value = selectedPreset.action;
  reward.value = selectedPreset.reward;
  cue.value = selectedPreset.cue;
  slider.value = selectedPreset.percentageImprovement;
  output.innerHTML = slider.value + "%";

  pictureSelect.value = selectedPreset.name;
  if (selectedPreset.name == "none") {
    // console.log("Chose Default Option");

    habitPicture.src = "../assets/allhabits.png";
  } else {
    habitPicture.src = `../assets/${selectedPreset.name}.png`;
  }

  // console.log(selectedPreset);
}

function capitalizeFLetter(mystring) {
  // let string = 'geeksforgeeks';
  let thestring = mystring[0].toUpperCase() + mystring.slice(1);
  return thestring;
}

habitPicture.src = "../assets/allhabits.png";

const guitar = {
  isDaily: true,
  name: "guitar",
  cue: "When I see my guitar by the corner of the room",
  craving: "I want to improve my guitar skills and enjoy playing music",
  action: "I will practice guitar for 30 minutes",
  reward:
    "I will feel a sense of accomplishment and closer to my musical goals",
  goal: "30 minutes",
  percentageImprovement: 5, // 5% improvement
};

const meditation = {
  isDaily: true,
  name: "meditating",
  cue: "When I sit on my meditation cushion in the morning",
  craving: "I want to find inner peace and reduce stress",
  action: "I will meditate for 15 minutes",
  reward: "I will experience a calm and focused mind",
  goal: "15 minutes",
  percentageImprovement: 5, // 5% improvement
};

const reading = {
  isDaily: true,
  name: "reading",
  cue: "When I see my book on my nightstand",
  craving: "I want to gain knowledge and unwind before bed",
  action: "I will read for 20 minutes",
  reward: "I will expand my knowledge and have a peaceful bedtime routine",
  goal: "20 minutes",
  percentageImprovement: 5, // 5% improvement
};

const rowing = {
  isDaily: true,
  name: "rowing",
  cue: "When I see the rowing machine in my home gym",
  craving: "I want to improve my fitness and feel energized",
  action: "I will row for 30 minutes",
  reward: "I will have a sense of accomplishment and increased energy",
  goal: "30 minutes",
  percentageImprovement: 5, // 5% improvement
};

const painting = {
  isDaily: true,
  name: "painting",
  cue: "When I see my art supplies on the table",
  craving: "I want to express my creativity and relax through art",
  action: "I will paint for 45 minutes",
  reward: "I will have created something beautiful and feel relaxed",
  goal: "45 minutes",
  percentageImprovement: 5, // 5% improvement
};

const running = {
  isDaily: true,
  name: "running",
  cue: "When I put on my running shoes",
  craving: "I want to improve my cardiovascular health and boost my mood",
  action: "I will go for a 20-minute run",
  reward: "I will feel invigorated and accomplished",
  goal: "20 minutes",
  percentageImprovement: 5, // 5% improvement
};

const eating = {
  isDaily: true,
  name: "eating",
  cue: "When I open the fridge for a snack",
  craving: "I want to nourish my body and maintain a healthy weight",
  action: "I will choose a healthy snack or meal option",
  reward: "I will feel satisfied and maintain my health goals",
  goal: "Make healthy choices throughout the day",
  percentageImprovement: 5, // 5% improvement
};

const journaling = {
  isDaily: true,
  name: "journaling",
  cue: "When I sit down at my desk in the evening",
  craving: "I want to reflect on my day and reduce stress",
  action: "I will journal for 15 minutes",
  reward: "I will gain insights and feel emotionally balanced",
  goal: "15 minutes",
  percentageImprovement: 5, // 5% improvement
};

const languageLearning = {
  isDaily: true,
  name: "languagelearning",
  cue: "When I have free time in the morning",
  craving: "I want to become fluent in a new language",
  action: "I will study and practice the language for 30 minutes",
  reward: "I will feel accomplished and closer to my language goals",
  goal: "30 minutes",
  percentageImprovement: 5, // 5% improvement
};

const yoga = {
  isDaily: true,
  name: "yoga",
  cue: "When I roll out my yoga mat",
  craving: "I want to improve flexibility and reduce stress",
  action: "I will do yoga for 20 minutes",
  reward: "I will feel relaxed and rejuvenated",
  goal: "20 minutes",
  percentageImprovement: 5, // 5% improvement
};

const presets = [
  guitar,
  meditation,
  reading,
  rowing,
  painting,
  running,
  languageLearning,
  eating,
  yoga,
  journaling,
];
