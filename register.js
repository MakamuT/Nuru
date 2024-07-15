// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
 import {
   getAuth,
   createUserWithEmailAndPassword,
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD_Lu2kbECae5Mp8gFChU5Meh_GJiiSmcY",
   authDomain: "nuru-66515.firebaseapp.com",
   projectId: "nuru-66515",
   storageBucket: "nuru-66515.appspot.com",
   messagingSenderId: "950587126407",
   appId: "1:950587126407:web:509862116958680ce17e22",
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 const signUpButton = document.getElementById("signUpButton");
 signUpButton.addEventListener("click", function (event) {
   event.preventDefault();
   const username = document.getElementById("signup-name").value;
   const email = document.getElementById("signup-email").value;
   const password = document.getElementById("signup-password").value;
   

   createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       alert("Account created successfully!");
       window.location.href = "feed_home.html";
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       alert(errorMessage);
     });
 });

/*signin page 
const byId = (id) => {
  return document.getElementById(id);
};
const $signUpButton = byId("signUp");
const $signInButton = byId("signIn");
const $container = byId("container");

$signUpButton.addEventListener("click", () => {
  $container.classList.add("right-panel-active");
});
$signInButton.addEventListener("click", () => {
  $container.classList.remove("right-panel-active");
});*/
