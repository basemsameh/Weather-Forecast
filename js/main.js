let searchInpt = document.querySelector("#searchInpt");
let searchBtn = document.querySelector("#searchBtn");

let locationArr;
let currentArr;
let forecastArr;
let day1, day2, day3;
let landName = "Cairo";

let link = `http://api.weatherapi.com/v1/forecast.json?key=b1edd012b88e40bf9d0144859241808&q=${landName}&days=3`;

// Fetch data from API link function
function fetchData() {
  let http = new XMLHttpRequest();
  http.open("GET", link);
  http.send();
  http.addEventListener("readystatechange", () => {
    if (http.status === 200 && http.readyState === 4) {
      currentArr = JSON.parse(http.response).current;
      locationArr = JSON.parse(http.response).location;
      day1 = JSON.parse(http.response).forecast.forecastday[0];
      day2 = JSON.parse(http.response).forecast.forecastday[1];
      day3 = JSON.parse(http.response).forecast.forecastday[2];
      displayData();
    }
  })
}
fetchData();

// When clicked on the search button
searchBtn.addEventListener("click", () => {
  link = `http://api.weatherapi.com/v1/forecast.json?key=b1edd012b88e40bf9d0144859241808&q=${landNameFunc()}&days=3`;
  fetchData();
  searchInpt.value = "";
  searchInpt.focus();
});

// Change name of land to that find in search input
function landNameFunc() {
  if (searchInpt.value !== "") {
    landName = searchInpt.value;
    return landName;
  } else {
    return landName;
  }
}

// Display data function
function displayData() {
  let content = "";
  content = `
    <div class="box col-sm-12 col-md-6 col-lg-4 p-3 mb-3">
      <div class="bg-white shadow rounded-2 position-relative">
        <figure class="m-auto text-center" id="topIcon">
        <img src='https:${currentArr.condition.icon}' alt="icon" border="0">
        </figure>
        <div class="d-flex justify-content-between rounded-2 bg-body-secondary p-4">
          <span id="dayName" class="fs-5">${days[new Date(day1.date).getDay()]}</span>
          <span id="date" class="fs-5">${new Date(day1.date).getDate()} ${months[new Date(day1.date).getMonth()]}</span>
        </div>
        <h4 id="governName" class="mt-3 px-4">${locationArr.name}</h4>
        <h2 class="my-4 px-4 text-primary">${currentArr["temp_c"]}℃</h2>
        <h5 class="px-4 mb-4">${currentArr.condition.text}</h5>
        <!-- List -->
        <div class="p-4 bg-body-secondary rounded-2">
          <ul class="list-unstyled row">
            <li class="col-sm-12 col-md-6">
              <i class="fa-solid fa-cloud-rain text-primary"></i> ${day1.day.daily_chance_of_rain}%
            </li>
            <li class="col-sm-12 col-md-6">
              <i class="fa-solid fa-wind text-success"></i> ${currentArr.wind_kph}km/h
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box col-sm-12 col-md-6 col-lg-4 p-3 mb-3">
      <div class="bg-white shadow rounded-2 position-relative">
        <figure class="m-auto text-center" id="topIcon">
          <img src='https:${day2.day.condition.icon}' alt="icon" border="0">
        </figure>
        <div class="d-flex justify-content-between rounded-2 bg-body-secondary p-4">
          <span id="dayName" class="fs-5">${days[new Date(day2.date).getDay()]}</span>
          <span id="date" class="fs-5">${new Date(day2.date).getDate()} ${months[new Date(day2.date).getMonth()]}</span>
        </div>
        <h2 class="my-4 px-4 text-primary">${day2.day.maxtemp_c}℃</h2>
        <h4 class="px-4 my-4">${day2.day.mintemp_c}℃</h4>
        <h5 class="px-4 mb-4">${day2.day.condition.text}</h5>
        <!-- List -->
        <div class="p-4 bg-body-secondary rounded-2">
          <ul class="list-unstyled row justify-content-between">
            <li class="col-sm-12 col-lg-6">
              <i class="fa-solid fa-cloud-rain text-primary"></i> ${day2.day.daily_chance_of_rain}%
            </li>
            <li class="col-sm-12 col-lg-6">
              <i class="fa-solid fa-wind text-success"></i> ${day2.day.maxwind_kph}km/h
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box col-sm-12 col-md-6 col-lg-4 p-3 mb-3">
      <div class="bg-white shadow rounded-2 position-relative">
        <figure class="m-auto text-center" id="topIcon">
          <img src='https:${day3.day.condition.icon}' alt="icon" border="0">
        </figure>
        <div class="d-flex justify-content-between rounded-2 bg-body-secondary p-4">
          <span id="dayName" class="fs-5">${days[new Date(day3.date).getDay()]}</span>
          <span id="date" class="fs-5">${new Date(day3.date).getDate()} ${months[new Date(day3.date).getMonth()]}</span>
        </div>
        <h2 class="my-4 px-4 text-primary">${day3.day.maxtemp_c}℃</h2>
        <h4 class="px-4 my-4">${day3.day.mintemp_c}℃</h4>
        <h5 class="px-4 mb-4">${day3.day.condition.text}</h5>
        <!-- List -->
        <div class="p-4 bg-body-secondary rounded-2">
          <ul class="list-unstyled row justify-content-between">
            <li class="col-sm-12 col-lg-6">
              <i class="fa-solid fa-cloud-rain text-primary"></i> ${day3.day.daily_chance_of_rain}%
            </li>
            <li class="col-sm-12 col-lg-6">
              <i class="fa-solid fa-wind text-success"></i> ${day3.day.maxwind_kph}km/h
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
  document.querySelector(".boxs").innerHTML = content;
}

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
