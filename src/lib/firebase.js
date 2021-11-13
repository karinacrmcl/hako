import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDGdTMS57Y-3zW2-4ciQy8RFwsR-7zjVXo",
  authDomain: "instex-react.firebaseapp.com",
  projectId: "instex-react",
  storageBucket: "instex-react.appspot.com",
  messagingSenderId: "237178479678",
  appId: "1:237178479678:web:35f0ae63409f6bc62a5d6f",
  measurementId: "G-WZWBYJQ5JL",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue, arrayUnion, arrayRemove } = Firebase.firestore;

export { firebase, FieldValue, arrayUnion, arrayRemove };
