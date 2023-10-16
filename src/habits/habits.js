// import the appropriate CSS files
// main.css contains the css for the entire app, including tailwind
import "../styles/main.css";
import { db } from "../utils/firebase-utils";
// import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import {
  collection,
  query,
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
const loader = document.getElementById("loader");
loader.style.display = "none";

function addFunctionality() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.currentTarget.classList.toggle("expanded");
    });
  });

  document.querySelectorAll(".accordion").forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.parentElement.nextElementSibling;
      if (this.style.width == "100%") {
        this.style.width = "75%";
        this.style.borderRight = "10px #507c6a solid";
        this.style.borderTopRightRadius = "10px";
      } else {
        this.style.width = "100%";
        this.style.borderRight = "0px #507c6a solid";
        this.style.borderTopRightRadius = "0px";
      }

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 300 + "px";
      }
    });
  });
  document.querySelectorAll(".panel").forEach((card) => {
    card.querySelectorAll("[data-tabs-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button;
        const tabsContainer = card.querySelector("#defaultTab");
        const tabsContentContainer = card.querySelector("#defaultTabContent");
        const target = tab.dataset.tabsTarget;
        const targetContent = card.querySelector(target);

        // Remove current active tab class
        const currentActiveTab = tabsContainer.querySelector(
          '[aria-selected="true"]',
        );
        if (currentActiveTab) {
          currentActiveTab.setAttribute("aria-selected", false);
          currentActiveTab.classList.remove("active");
        }

        // Set this tab as active
        tab.setAttribute("aria-selected", true);
        tab.classList.add("active");

        // Hide all tab content
        tabsContentContainer
          .querySelectorAll('[role="tabpanel"]')
          .forEach((panel) => {
            panel.classList.add("hidden");
          });

        // Show clicked tab content
        targetContent.classList.remove("hidden");
      });
    });
  });
}

async function loadInTheHabits() {
  let theUserId = localStorage.getItem("userId");
  // console.log(theUserId);
  const q = query(collection(db, "users", theUserId, "habits"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.id == "dummy") {
      console.log("found dummy document");
    } else {
      // console.log(doc.data());

      let frequency = "";
      if (doc.data().isDaily == true) {
        frequency = "Daily";
      } else {
        frequency = "Monthly";
      }

      document.getElementById("habit-div").insertAdjacentHTML(
        "afterbegin",
        `<div class="m-5" class="electorate" style="width: 30%">
        <div
          style="
            height: fit-content;
            width: fit-content;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;

            border: 10px solid #507c6a;

            border-bottom: 0px;
            display: flex;
            flex-direction: row;
            position: relative;
          "
          class="text-bold text-4xl"
        >
          <div
            class="accordion"
            style="
              position: absolute;
              border-top-right-radius: 10px;

              border-top: 10px solid;
              border-right: 10px solid;
              border-color: #507c6a;
              /* background-color: #f3eef2; */

              bottom: 0;
              left: 0;
            "
          >
            ${doc.data().habitName}
          </div>
          <figure>
            <img
              style="
                height: 40vh;
                width: 30vw;
                object-fit: cover;
                object-position: 100% 40%;
              "
              class=""
              src="../assets/${doc.data().picture}.png"
              alt="Album"
              id="habit-picture"
            />
          </figure>
          <!-- Habit -->
        </div>

        <!-- <div>Main Industry</div> -->
        <div
          class="panel"
          style="
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            border: 10px solid #507c6a;
            border-top: 0px;
          "
        >
          <!-- <div class="p-3">yeet</div> -->

          <div class="w-full rounded-lg border border-gray-200 bg-white shadow">
            <ul
              class="flex flex-wrap rounded-t-lg border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500"
              id="defaultTab"
              data-tabs-toggle="#defaultTabContent"
              role="tablist"
            >
              <li class="mr-2">
                <button
                  id="about-tab"
                  data-tabs-target="#about"
                  type="button"
                  role="tab"
                  aria-controls="about"
                  aria-selected="true"
                  class="active inline-block rounded-tl-lg p-4 hover:bg-gray-100 hover:text-gray-600"
                >
                  Cue
                </button>
              </li>
              <li class="mr-2">
                <button
                  id="services-tab"
                  data-tabs-target="#services"
                  type="button"
                  role="tab"
                  aria-controls="services"
                  aria-selected="false"
                  class="inline-block p-4 hover:bg-gray-100 hover:text-gray-600"
                >
                  Craving
                </button>
              </li>
              <li class="mr-2">
                <button
                  id="action-tab"
                  data-tabs-target="#actioned"
                  type="button"
                  role="tab"
                  aria-controls="actioned"
                  aria-selected="false"
                  class="inline-block p-4 hover:bg-gray-100 hover:text-gray-600"
                >
                  Action
                </button>
              </li>

              <li class="mr-2">
                <button
                  id="reward-tab"
                  data-tabs-target="#rewarded"
                  type="button"
                  role="tab"
                  aria-controls="rewarded"
                  aria-selected="false"
                  class="inline-block p-4 hover:bg-gray-100 hover:text-gray-600"
                >
                  Reward
                </button>
              </li>
              <li class="mr-2">
                <button
                  id="statistics-tab"
                  data-tabs-target="#statistics"
                  type="button"
                  role="tab"
                  aria-controls="statistics"
                  aria-selected="false"
                  class="inline-block p-4 hover:bg-gray-100 hover:text-gray-600"
                >
                  Facts
                </button>
              </li>
            </ul>
            <div id="defaultTabContent">
              <div
                class="rounded-lg bg-white p-4"
                id="about"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                <h2 class="mb-3 text-3xl font-extrabold tracking-tight">
                  Cue:
                </h2>
                <p class="mb-3 text-gray-500">
                ${doc.data().cue}
                </p>
              </div>
              <div
                class="hidden rounded-lg bg-white p-4"
                id="services"
                role="tabpanel"
                aria-labelledby="services-tab"
              >
                <h2 class="mb-3 text-3xl font-extrabold tracking-tight">
                  Craving:
                </h2>
                <p class="mb-3 text-gray-500">
                ${doc.data().craving}
                </p>
              </div>
              <div
                class="hidden rounded-lg bg-white p-4"
                id="actioned"
                role="tabpanel"
                aria-labelledby="action-tab"
              >
                <h2 class="mb-3 text-3xl font-extrabold tracking-tight">
                  Action:
                </h2>
                <p class="mb-3 text-gray-500">
                ${doc.data().action}
                </p>
              </div>
              <div
                class="hidden rounded-lg bg-white p-4"
                id="rewarded"
                role="tabpanel"
                aria-labelledby="reward-tab"
              >
                <h2 class="mb-3 text-3xl font-extrabold tracking-tight">
                  Reward:
                </h2>
                <p class="mb-3 text-gray-500">
                ${doc.data().reward}
                </p>
              </div>
              <div
                class="hidden rounded-lg bg-white p-4"
                id="statistics"
                role="tabpanel"
                aria-labelledby="statistics-tab"
              >
                <dl
                  class="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-900"
                >
                  <div
                    class="flex flex-col items-center justify-center p-3"
                    style="
                      background-color: #edf2ef;
                      border: 2px #456e5d solid;
                      border-radius: 4px;
                    "
                  >
                    <dt class="mb-2 text-3xl font-extrabold">${frequency}</dt>
                    <dd class="text-center text-gray-500">Habit Frequency</dd>
                  </div>
                  <div
                    class="flex flex-col items-center justify-center p-3"
                    style="
                      background-color: #edf2ef;
                      border: 2px #456e5d solid;
                      border-radius: 4px;
                    "
                  >
                    <dt class="mb-2 text-3xl font-extrabold">${
                      doc.data().percentage
                    }%</dt>
                    <dd class="text-center text-gray-500">
                      Percentage Improvement
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>`,
      );
    }
  });
  addFunctionality();
}
loadInTheHabits();
