import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

const signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Signed in successfully!");
      window.location.href = "feed_home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
