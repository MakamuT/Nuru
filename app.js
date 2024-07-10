//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDTiy_S3Q8WIG3RfJjyS40MX_oTax0mDIc",
  authDomain: "nuru-a1228.firebaseapp.com",
  projectId: "nuru-a1228",
  storageBucket: "nuru-a1228.appspot.com",
  messagingSenderId: "180247976695",
  appId: "1:180247976695:web:8bac743ab3c790746491f2",
  measurementId: "G-1WEWFXQVLJ",
};

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDTiy_S3Q8WIG3RfJjyS40MX_oTax0mDIc",
  authDomain: "nuru-a1228.firebaseapp.com",
  projectId: "nuru-a1228",
});

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
