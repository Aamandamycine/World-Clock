function updateTime() {
  // 🔹 Current location
  let localTimezone = moment.tz.guess();
  let localTime = moment().tz(localTimezone);

  let localDateElement = document.querySelector("#local-date");
  let localTimeElement = document.querySelector("#local-time");

  if (localDateElement && localTimeElement) {
    localDateElement.innerHTML = `${localTime.format(
      "MMMM Do YYYY"
    )} — ${localTimezone}`;
    let isMorning = localTime.format("A") === "AM";
    let emoji = isMorning ? "🌞" : "🌙";
    localTimeElement.innerHTML = `${localTime.format(
      "h:mm:ss"
    )} <small>${localTime.format("A")}</small> ${emoji}`;
  }

  // 🔹 Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDate = losAngelesElement.querySelector(".date");
    let losAngelesTime = losAngelesElement.querySelector(".time");
    let laTime = moment().tz("America/Los_Angeles");
    losAngelesDate.innerHTML = laTime.format("MMMM Do YYYY");
    losAngelesTime.innerHTML = `${laTime.format(
      "h:mm:ss"
    )} <small>${laTime.format("A")}</small>`;
  }

  // 🔹 Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDate = parisElement.querySelector(".date");
    let parisTime = parisElement.querySelector(".time");
    let parisNow = moment().tz("Europe/Paris");
    parisDate.innerHTML = parisNow.format("MMMM Do YYYY");
    parisTime.innerHTML = `${parisNow.format(
      "h:mm:ss"
    )} <small>${parisNow.format("A")}</small>`;
  }

  // 🔹 Background theme (day/night)
  let hour = localTime.hour();
  let isDay = hour >= 6 && hour < 18;
  let body = document.querySelector("body");
  body.classList.remove("daytime", "nighttime");
  body.classList.add(isDay ? "daytime" : "nighttime");
}

function updateCity(event) {
  let cityTimeZone = event.target.value;

  if (!cityTimeZone) {
    // If no city selected, do nothing or reset view
    return;
  }

  // Split timezone string safely
  let parts = cityTimeZone.split("/");
  // Get city name, replace underscores with spaces, fallback to full value if missing
  let cityName = parts.length > 1 ? parts[1].replace(/_/g, " ") : cityTimeZone;

  // Get moment time with timezone
  let cityTime = moment().tz(cityTimeZone);

  // Build city display HTML
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
      <div class="city">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format(
          "h:mm:ss"
        )} <small>${cityTime.format("A")}</small></div>
      </div>
  
      <br />
      <div class="back-home">
        <a href="#" id="home-link">← Back to all cities</a>
      </div>
    `;

  // Add listener to “Back to all cities” link
  document.querySelector("#home-link").addEventListener("click", function (e) {
    e.preventDefault();
    location.reload(); // reload page to reset to all cities view
  });
}

// Run time immediately and every second
updateTime();
setInterval(updateTime, 1000);

// City change listener
let citySelect = document.querySelector("#city");
citySelect.addEventListener("change", updateCity);
function updateTime() {
  let localTimezone = moment.tz.guess();
  let localTime = moment().tz(localTimezone);
  let hour = localTime.hour();

  // 🌞 Daytime 6AM–6PM, 🌙 Night otherwise
  let isDay = hour >= 6 && hour < 18;

  let body = document.querySelector("body");
  body.classList.remove("daytime", "nighttime");
  body.classList.add(isDay ? "daytime" : "nighttime");
}
