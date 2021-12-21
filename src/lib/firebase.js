// import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { FieldValue, arrayUnion, arrayRemove } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, where } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDGdTMS57Y-3zW2-4ciQy8RFwsR-7zjVXo",
  authDomain: "instex-react.firebaseapp.com",
  projectId: "instex-react",
  storageBucket: "instex-react.appspot.com",
  messagingSenderId: "237178479678",
  appId: "1:237178479678:web:35f0ae63409f6bc62a5d6f",
  measurementId: "G-WZWBYJQ5JL",
};

const firebase = initializeApp(config);
firebase.auth = getAuth;

function getCollection(getFirestore) {
  return (path) => {
    const result = (collection(getFirestore(), path).where = where);
    return result;
  };
}

// function getCurrentFirestore() {
//   getFirestore.collection = getCollection(getFirestore);

//   return () => getFirestore;
// }

getFirestore.collection = getCollection(getFirestore);
firebase.firestore = getFirestore;
console.log(firebase.firestore.collection);

export { firebase, FieldValue, arrayUnion, arrayRemove };
