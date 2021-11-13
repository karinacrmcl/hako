import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import "./styles/app.css";
import ModalProvider from "./provider/modal-provider";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// https://bit.ly/CRA-vitals

// client side rendered app:
// -> databese which is Firrebase
// -> react loading skeleton
// tailwind

//folder structure
//architecture
// src
// -> components, constants, context, helpers, lib
// -> hooks
// {firebaseis going live here}, services fucntion in  here
// -> styles (talwind's fodler (app/tailwind))
