function updateTime() {
  let laTime = moment().tz("America/Los_Angeles");
  document.querySelector("#la-date").innerHTML = laTime.format("MMMM Do YYYY");
  document.querySelector("#la-time").innerHTML = laTime.format("h:mm:ss A");

  let aucklandTime = moment().tz("Pacific/Auckland");
  document.querySelector("#auckland-date").innerHTML =
    aucklandTime.format("MMMM Do YYYY");
  document.querySelector("#auckland-time").innerHTML =
    aucklandTime.format("h:mm:ss A");
}

updateTime();

setInterval(updateTime, 1000);
