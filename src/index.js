import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase, { initializeApp } from 'firebase/app';
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyBGFuGNrxvAl5bAQPNWviVXUp_K2etkOgE",
  authDomain: "gurfa-tahfeez-chat.firebaseapp.com",
  projectId: "gurfa-tahfeez-chat",
  storageBucket: "gurfa-tahfeez-chat.appspot.com",
  messagingSenderId: "464728735477",
  appId: "1:464728735477:web:eb2554899dfb3715844fbc",
  measurementId: "G-C0QRX7L87D",
  databaseURL: "https://gurfa-tahfeez-chat-default-rtdb.firebaseio.com",
};
initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
//serviceWorker.register();
