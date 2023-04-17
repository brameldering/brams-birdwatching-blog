import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ============== Code to initialize Firebase ==================
import { initializeApp } from "firebase/app";

// The following are all public keys and can therefore be committed to github
const firebaseConfig = {
    apiKey: "AIzaSyC1P2ADIPGIQ46CFDm5ypbTQLmqMopjKJw",
    authDomain: "bram-bird-blog.firebaseapp.com",
    projectId: "bram-bird-blog",
    storageBucket: "bram-bird-blog.appspot.com",
    messagingSenderId: "202681194042",
    appId: "1:202681194042:web:647199bd33a2c5d8fa0703",
    measurementId: "G-10P2C11P9W",
};

const app = initializeApp(firebaseConfig);
// ==============================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
