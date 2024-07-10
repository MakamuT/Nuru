//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFoZkKbhUnNW1do4SBAHi3kybAa70j_So",
  authDomain: "nuru-e277e.firebaseapp.com",
  databaseURL: "https://nuru-e277e-default-rtdb.firebaseio.com",
  projectId: "nuru-e277e",
  storageBucket: "nuru-e277e.appspot.com",
  messagingSenderId: "897726335752",
  appId: "1:897726335752:web:64e1eda2ee51973042fabd",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Register function
function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!validate_email(email) || !validate_password(password)) {
    alert("Email or password is incorrect");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      // Add user to Firebase Realtime Database
      const dbRef = database.ref("users/" + user.uid);
      const userData = {
        name: name,
        email: email,
        username: username,
        last_login: Date.now(),
      };
      dbRef.set(userData);

      alert("User Created !!");
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!validate_email(email) || !validate_password(password)) {
    alert("Email or password is incorrect");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const dbRef = database.ref("users/" + user.uid);
      const userData = {
        last_login: Date.now(),
      };
      dbRef.update(userData);

      alert("User Logged In!!");
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// Validate email format
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

// Validate password length
function validate_password(password) {
  return password.length >= 6;
}




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
