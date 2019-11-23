import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgCChIBidt3ThBEEzQj7PIRNUDIHDoz5o",
  authDomain: "link-grid.firebaseapp.com",
  databaseURL: "https://link-grid.firebaseio.com",
  projectId: "link-grid",
  storageBucket: "link-grid.appspot.com",
  messagingSenderId: "857288545549",
  appId: "1:857288545549:web:641406f6da57a388480c44",
  measurementId: "G-X5GBW0J8Q6"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
