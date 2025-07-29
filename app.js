// ✅ Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBizMeB33zvk5Qr9JcE2AJNmx2sr8PnEyk",
  authDomain: "projectmap-35a69.firebaseapp.com",
  projectId: "projectmap-35a69",
  storageBucket: "projectmap-35a69.firebasestorage.app",
  messagingSenderId: "676439686152",
  appId: "1:676439686152:web:0fdc2d8aab41aec67fa5bd"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Initialize Map
const map = L.map('map').setView([41.865, -103.667], 12);
const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
baseLayer.addTo(map);
const drawnItems = new L.FeatureGroup().addTo(map);

// ✅ Draw Controls
L.control.layers(null, { "Segments": drawnItems }).addTo(map);
const drawControl = new L.Control.Draw({
  edit: { featureGroup: drawnItems },
  draw: {
    polygon: true,
    polyline: true,
    marker: false,
    rectangle: false,
    circle: false
  }
});
map.addControl(drawControl);

// ✅ When shape is drawn
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

// ✅ Submit to Firestore
window.submitData = async function (encodedGeoJson) {
  const geojson = JSON.parse(encodedGeoJson);
  const ticket = document.getElementById('ticketNumber').value;
  const location = document.getElementById('location').value;
  const status = document.getElementById('status').value;

  if (!ticket || !location || !status) {
    alert("❗ Please fill out all fields before submitting.");
    return;
  }

  try {
    await db.collection("segments").add({
      ticketNumber: ticket,
      location: location,
      status: status,
      geojson: geojson,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("✅ Segment submitted!");
    location.reload();
  } catch (err) {
    alert("❌ Error submitting: " + err.message);
  }
};

// ✅ Load saved shapes
db.collection("segments").get().then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const shape = L.geoJSON(data.geojson, {
      style: {
        color: data.status === "Located" ? "green" :
               data.status === "In Progress" ? "orange" : "red",
        weight: 4
      }
    }).addTo(drawnItems);
    shape.bindPopup(`
      <strong>Ticket:</strong> ${data.ticketNumber}<br/>
      <strong>Location:</strong> ${data.location}<br/>
      <strong>Status:</strong> ${data.status}
    `);
  });
});
