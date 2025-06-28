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
    losAngelesTime.innerHTML = laTime.format("h:mm:ss [<small>]A[</small>]");
  }

  // 🔹 Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDate = parisElement.querySelector(".date");
    let parisTime = parisElement.querySelector(".time");
    let parisNow = moment().tz("Europe/Paris");
    parisDate.innerHTML = parisNow.format("MMMM Do YYYY");
    parisTime.innerHTML = parisNow.format("h:mm:ss [<small>]A[</small>]");
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `
      <div class="city">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">
          ${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>
        </div>
      </div>
  
      <br />
      <div class="back-home">
        <a href="#" id="home-link">← Back to all cities</a>
      </div>
    `;

  // 👇 Add event listener to restore homepage
  document.querySelector("#home-link").addEventListener("click", function (e) {
    e.preventDefault();
    location.reload(); // simplest way to restore the original content
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
