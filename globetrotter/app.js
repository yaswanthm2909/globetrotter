function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", email);
  window.location.href = "dashboard.html";
}
function goCreate() {
  window.location.href = "create-trip.html";
}
function saveTrip() {
  const trip = {
    id: Date.now(), // unique id
    name: document.getElementById("tripName").value,
    start: document.getElementById("startDate").value,
    end: document.getElementById("endDate").value,
    cities: document.getElementById("cities").value,
    budget: document.getElementById("budget").value
  };

  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.push(trip);

  localStorage.setItem("trips", JSON.stringify(trips));
  localStorage.setItem("selectedTrip", trip.id);

  window.location.href = "dashboard.html";
}
function openTrip(id) {
  localStorage.setItem("selectedTrip", id);
  window.location.href = "itinerary.html";
}

