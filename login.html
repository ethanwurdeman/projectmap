<!DOCTYPE html>
<html>
<head>
  <title>Login – ProjectMap</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial; background: #f4f4f4; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
    .login-box { background: white; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.2); border-radius: 6px; width: 300px; }
    h2 { text-align: center; }
    input { width: 100%; margin: 8px 0; padding: 10px; }
    button { width: 100%; padding: 10px; background-color: #2980b9; color: white; border: none; cursor: pointer; margin-top: 10px; }
    button:hover { background-color: #3498db; }
    .error { color: red; font-size: 0.9em; text-align: center; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>ProjectMap Login</h2>
    <input type="email" id="email" placeholder="Email">
    <input type="password" id="password" placeholder="Password">
    <button onclick="login()">Login</button>
    <div class="error" id="error"></div>
  </div>

  <!-- Firebase SDK -->
  <script src="https://www.gstatic.com/firebasejs/9.24.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.24.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore-compat.js"></script>

  <script>
    const firebaseConfig = {
      apiKey: "AIzaSyBizMeB33zvk5Qr9JcE2AJNmx2sr8PnEyk",
      authDomain: "projectmap-35a69.firebaseapp.com",
      projectId: "projectmap-35a69",
      storageBucket: "projectmap-35a69.appspot.com",
      messagingSenderId: "676439686152",
      appId: "1:676439686152:web:0fdc2d8aab41aec67fa5bd"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    async function login() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorBox = document.getElementById('error');

      try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        const userDoc = await db.collection("users").doc(user.uid).get();

        if (!userDoc.exists) {
          errorBox.innerText = "No profile found. Contact admin.";
          return;
        }

        const role = userDoc.data().role;
        if (role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'project.html';
        }
      } catch (err) {
        errorBox.innerText = err.message;
      }
    }
  </script>
</body>
</html>
