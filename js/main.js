let Forecastlist = [];
let nextday = [];
let twodays = [];
let country = "";
let searchInp = document.getElementById("searchInputData");
let searchValue;
let countryregion = "";
let month = ["january","february","march","april","may","june","july","august","september","october","november","december"];
let day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
let newDate ;
let currentDay='' ;
let currentDayName='' ;
let nextDayName='' ;
let twoDayName='' ;
let dates;
let daydate;
let searchData;
let findLocationBtn = document.getElementById("LocationBtn")

async function searchInput() {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7214fbac4bfd43e2938202540221710&q=${country}&days=3`
  );
  let myData = await response.json();
  searchData = myData.location
  searchValue = searchInp.value
    country = searchValue
    forecast(country)
}



async function forecast(country = `cairo`) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7214fbac4bfd43e2938202540221710&q=${country}&days=3`
  );
  let myData = await response.json();
  Forecastlist = myData;
  todayForecast();
  nextday = myData.forecast.forecastday[1].day;
  nextDayForecast();
  twodays = myData.forecast.forecastday[2].day;
  twoDaysForecast();


}

forecast();

function datesCalc(){
  newDate = Forecastlist.forecast.forecastday[0].date.split("-");
  let monthIndex = newDate[1] -1
  currentDay = newDate[2]
  currentMonth = month[monthIndex]
   daydate = new Date()
  let index = daydate.getDay()
  currentDayName = day[index]
  nextDayName = day[index + 1]
  twoDayName = day[index + 2]
}


function todayForecast() {
  datesCalc()
  document.getElementById("todayContent").innerHTML = `
  <div id="todayHeader" class="p-2">
  <span>${currentDayName}</span>
  <span>${currentDay} ${currentMonth}</span>
  </div>
  <div  class="p-3 column">
  <h6 class="py-3">${Forecastlist.location.name}</h6>
  <h1 class="fw-bold text-white fa-4x mb-4">${Forecastlist.current.temp_c}<sup>o</sup>c <img src="https:${Forecastlist.current.condition.icon}"class="ms-4"></h1>
   <p class="text-primary" id="todaydescrip">${Forecastlist.current.condition.text}</p>
   <span class="todaydescripList"><img src="img/icon-umberella.png" alt=""> 20%</span>
   <span class="todaydescripList ms-3"><img src="img/icon-wind.png" alt=""> ${Forecastlist.current.wind_kph}km/h</span>
   <span class="todaydescripList ms-3"><img src="img/icon-compass.png" alt=""> East</span>
   </div>`;
}

function nextDayForecast() {
  datesCalc()
  document.getElementById("nextDay").innerHTML = `
  <div id="header" class="p-2">
  <span class="text-capitalize">${nextDayName}</span>
</div>
<div id="nextDayContent" class="p-3 column">
  <img class="py-3" src="https:${nextday.condition.icon}"></img>
  <h3 class="fw-bold text-white fs-4 mb-1">${nextday.maxtemp_c}<sup>o</sup>c</h3>
  <p class="fs- mb-4">${nextday.mintemp_c}<sup>o</sup></p>
  <p class="text-primary" id="nextDaydescrip">${nextday.condition.text}</p>
</div>`;
}

function twoDaysForecast() {
  datesCalc()
  document.getElementById("twoDays").innerHTML = `
  <div id="nextDayHeader" class="text-center p-2">
  <span>${twoDayName}</span>
</div>
<div id="nextDayContent" class="p-3 column">
  <img class="py-3" src="https:${twodays.condition.icon}"></img>
  <h3 class="fw-bold text-white fs-4 mb-1">${twodays.maxtemp_c}<sup>o</sup>c</h3>
  <p class="fs- mb-4">${twodays.mintemp_c}<sup>o</sup></p>
  <p class="text-primary" id="nextDaydescrip">${twodays.condition.text}</p>
</div>
</div>`;
}
