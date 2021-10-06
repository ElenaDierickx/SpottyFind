const firebaseConfig = {
  apiKey: "AIzaSyASHg7I2UOiCl8qGzB8tUdSjtg37bdWS3U",
  authDomain: "spottyfind.firebaseapp.com",
  databaseURL:
    "https://spottyfind-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spottyfind",
  storageBucket: "spottyfind.appspot.com",
  messagingSenderId: "587867110235",
  appId: "1:587867110235:web:539356700169d66809f87e",
  measurementId: "G-WY0BELDQQY",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);
