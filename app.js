// app.js (must be in the same repo as index.html)

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import {
  getFirestore, collection, addDoc, getDocs, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';


const firebaseConfig = {
  apiKey: "AIzaSyBizMeB33zvk5Qr9JcE2AJNmx2sr8PnEyk",
  authDomain: "projectmap-35a69.firebaseapp.com",
  projectId: "projectmap-35a69",
  storageBucket: "projectmap-35a69.firebasestorage.app",
  messagingSenderId: "676439686152",
  appId: "1:676439686152:web:0fdc2d8aab41aec67fa5bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Leaflet map
const map = L.map('map').setView([41.865, -103.667], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const drawnItems = new L.FeatureGroup().addTo(map);
L.control.layers(null, { "Segments": drawnItems }).addTo(map);

// Add drawing controls
const drawControl = new L.Control.Draw({
  edit: { featureGroup: drawnItems },
  draw: {
    polygon: true,
    polyline: true,
    rectangle: false,
    circle: false,
    marker: false
  }
});
map.addControl(drawControl);

// Handle new shape creation
map.on(L.Draw.Event.CREATED, function (e) {
  const layer = e.layer;
  drawnItems.addLayer(layer);
  const geojson = layer.toGeoJSON();

  const popupForm = `
    <div class="popup-form">
      <label>Ticket Number:<br/><input id="ticketNumber" /></label><br/>
      <label>Location:<br/><input id="location" /></label><br/>
      <label>Status:<br/>
        <select id="status">
          <option value="Not Located">Not Located</option>
          <option value="In Progress">In Progress</option>
          <option value="Located">Located</option>
        </select>
      </label><br/>
      <button onclick='submitData(${JSON.stringify(JSON.stringify(geojson))})'>Submit</button>
    </div>
  `;
  layer.bindPopup(popupForm).openPopup();
});

// Submit data to Firebase
window.submitData = async function(encodedGeoJson) {
  const geojson = JSON.parse(encodedGeoJson);
  const ticket = document.getElementById('ticketNumber').value;
  const location = document.getElementById('location').value;
  const status = document.getElementById('status').value;

  try {
    await addDoc(collection(db, "segments"), {
      ticketNumber: ticket,
      location: location,
      status: status,
      geojson: JSON.stringify(geojson),
      timestamp: serverTimestamp()
    });
    alert("✅ Segment submitted!");
    location.reload();
  } catch (err) {
    alert("❌ Error submitting: " + err.message);
  }
};

// Load existing segments from Firestore
(async () => {
  const snapshot = await getDocs(collection(db, "segments"));
  snapshot.forEach(doc => {
    const data = doc.data();
    const shape = L.geoJSON(JSON.parse(data.geojson), {
      style: {
        color: data.status === "Located" ? "green" : data.status === "In Progress" ? "orange" : "red",
        weight: 4
      }
    }).addTo(drawnItems);
    shape.bindPopup(`
      <strong>Ticket:</strong> ${data.ticketNumber}<br/>
      <strong>Location:</strong> ${data.location}<br/>
      <strong>Status:</strong> ${data.status}
    `);
  });
})();
