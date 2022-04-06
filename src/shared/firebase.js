import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIcF-wvV8EBTxBiFYwr9A6YfCtdFZu8w4",
  authDomain: "react-2-31e29.firebaseapp.com",
  projectId: "react-2-31e29",
  storageBucket: "react-2-31e29.appspot.com",
  messagingSenderId: "789559256948",
  appId: "1:789559256948:web:4e6a17496b25ae9bd62e21",
  measurementId: "G-N70M7D97VR"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
export{auth, apiKey, firestore, storage, realtime };