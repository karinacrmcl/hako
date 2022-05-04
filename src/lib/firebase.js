import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "instex-react.firebaseapp.com",
  projectId: "instex-react",
  storageBucket: "instex-react.appspot.com",
  messagingSenderId: "237178479678",
  appId: "1:237178479678:web:35f0ae63409f6bc62a5d6f",
  measurementId: "G-WZWBYJQ5JL",
};

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const Firebase = firebase.initializeApp(config);
const { FieldValue, arrayUnion, arrayRemove } = firebase.firestore;

export { Firebase, FieldValue, arrayUnion, arrayRemove };
