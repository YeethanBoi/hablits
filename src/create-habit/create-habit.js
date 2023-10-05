// import the appropriate CSS files
// main.css contains the css for the entire app, including tailwin
// import modules that are needed
// import { db } from "../utils/firebase-utils";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBPUq_3dMVUYPA94SBHBAtkAWsFlySNs6k",
  authDomain: "hablits-8a957.firebaseapp.com",
  projectId: "hablits-8a957",
  storageBucket: "gs://hablits-8a957.appspot.com",
  messagingSenderId: "607760813629",
  appId: "1:607760813629:web:34dd984572201352c4a454",
};

import "../styles/main.css";
const loader = document.getElementById("loader");
loader.style.display = "none";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const fileInput = document.getElementById("image-upload");

fileInput.addEventListener("change", uploadFile());

function uploadFile() {
  console.log("Working");
  var file = fileInput.files[0];

  // Create a reference to the file in Firestore storage
  var storageRef = firebase.storage().ref().child(file.name);

  // Upload file to Firestore storage
  storageRef
    .put(file)
    .then(function (snapshot) {
      console.log("File uploaded successfully!");

      // Get the download URL of the uploaded file
      snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          // Save the download URL to Firestore database
          db.collection("test")
            .doc(file.name)
            .set({
              name: file.name,
              url: downloadURL,
            })
            .then(function () {
              console.log("Download URL saved to Firestore database.");

              // Display the uploaded image
              var uploadedImage = document.getElementById("uploadedImage");
              uploadedImage.src = downloadURL;
            })
            .catch(function (error) {
              console.error("Error saving download URL to Firestore:", error);
            });
        })
        .catch(function (error) {
          console.error("Error getting download URL:", error);
        });
    })
    .catch(function (error) {
      console.error("Error uploading file:", error);
    });
}
