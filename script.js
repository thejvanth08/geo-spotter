const ipInput = document.getElementById("ip-input");
const searchBtn = document.getElementById("search");
const ipData = document.getElementById("ip-address");
const locationData = document.getElementById("location");
const zipcodeData = document.getElementById("zipcode");
const langData = document.getElementById("language");

const findLocation = async (ipAddress) => {
  try {
    const key =
      "http://api.ipstack.com/" +
      ipAddress +
      "?access_key=e143febf50e4305bf404f1783e5c666c";

    const response = await fetch(key);
    const data = await response.json();
    const ipVal = data.ip;
    const cityVal = data.city + "\n" + data.location.capital;
    const zipVal = data.zip;
    const langVal = data.location.languages[0].name;
    const latitude = data.latitude.toFixed(2); // only upto 2 decimal values
    const longitude = data.longitude.toFixed(2);

    markLocation(latitude, longitude);

    ipData.innerText = ipVal;
    locationData.innerText = cityVal;
    zipcodeData.innerText = zipVal;
    langData.innerText = langVal;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

searchBtn.addEventListener("click", () => {
  const ipAddress = ipInput.value;
  console.log(ipAddress);
  findLocation(ipAddress);
});

const markLocation = (lat, long) => {
  // creating map object
  var map = L.map("map").setView([lat, long], 15); // [lat, long], zoom_value

  // creating actual map as a layer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // for adding marker to search location
  var marker = L.marker([lat, long]).addTo(map);

  // adding pop-up to the marker
  marker.bindPopup("Here, it is.").openPopup();
};
