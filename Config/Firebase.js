import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASHg7I2UOiCl8qGzB8tUdSjtg37bdWS3U",
    authDomain: "spottyfind.firebaseapp.com",
    databaseURL: "https://spottyfind-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "spottyfind",
    storageBucket: "spottyfind.appspot.com",
    messagingSenderId: "587867110235",
    appId: "1:587867110235:web:539356700169d66809f87e",
    measurementId: "G-WY0BELDQQY",
};

let Firebase;

if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
