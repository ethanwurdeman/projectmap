// ✅ Initialize Firebase
const firebaseConfig = {
  apiKey: "...",
  ...
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// the rest of your Leaflet map code...
