// app.js – Shared functionality for protected pages

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBizMeB33zvk5Qr9JcE2AJNmx2sr8PnEyk",
  authDomain: "projectmap-35a69.firebaseapp.com",
  projectId: "projectmap-35a69",
  storageBucket: "projectmap-35a69.appspot.com",
  messagingSenderId: "676439686152",
  appId: "1:676439686152:web:0fdc2d8aab41aec67fa5bd"
};

// ✅ Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// ✅ Enforce login & show status
auth.onAuthStateChanged(user => {
  const statusBar = document.createElement("div");
  statusBar.id = "userStatus";
  statusBar.style.position = "fixed";
  statusBar.style.top = "10px";
  statusBar.style.right = "20px";
  statusBar.style.background = "#eee";
  statusBar.style.padding = "8px 15px";
  statusBar.style.borderRadius = "5px";
  statusBar.style.fontSize = "14px";

  if (!user) {
    window.location.href = "login.html";
  } else {
    statusBar.innerHTML = `Logged in as <strong>${user.email}</strong>
      <button onclick="firebase.auth().signOut().then(() => location.href='login.html')">Sign Out</button>`;
    document.body.appendChild(statusBar);
  }
});
