var cityInfo = document.getElementById('cityInfo');
var searchButton = document.getElementById('searchButton');
var input = document.getElementById('input');
var fiveDayInfo = document.getElementById('fiveDayInfo');
var listCities = document.getElementById('listCities');
// var dayOne =document.getElementById('dayOne');
var dayTwoInfo = document.getElementById('dayTwoInfo');
var dayThreeInfo = document.getElementById('dayThreeInfo');
var dayFourInfo = document.getElementById('dayFourInfo');
var dayFiveInfo = document.getElementById('dayFiveInfo');

// var cityInput = localStorage.setItem(input, []);

// the events capture user inputs, you can then build the array of things in local storage
var cityValues =localStorage.getItem(input) || [];
console.log(cityValues);
// JSON.parse(localStorage.getItem("input", input));


// <!-- // GIVEN a weather dashboard with form inputs
// WHEN I search for a city -->
// THEN I am presented with current and future conditions for that city and that city is added to the search history

function searchCityGeo (city){
  event.preventDefault();
  cityInfo.innerHTML="";
  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=7f598c561224054683226ca8211216e9";
  fetch(requestUrl)
      .then(function(response){
          return response.json();
      })
      .then(function(data){
          console.log(data);
          var cityName = data[0].name;
          var cityState = data[0].state;
          var lat = data[0].lat;
          var lon = data[0].lon;
          var listCity = document.createElement("li");
          listCity.textContent = cityName +", "+ cityState;
          cityInfo.appendChild(listCity);
          currentWeatherApi(lat,lon);
          fiveDayForecast(lat,lon);
      }); 
};

function currentWeatherApi (lat,lon){
  // cityInfo.innerHTML = "";
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=7f598c561224054683226ca8211216e9&units=imperial";
    fetch(requestUrl) 
      .then(function(response){
        return response.json();
      })
    //   / WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
      .then(function (data){
        console.log(data);
        var temerature = data.main.temp;
        var description = data.weather[0].description;
        var humidity = data.main.humidity;
        var wind = data.wind.speed;
        var listItem = document.createElement("li");
        listItem.innerHTML = "Temperature: "+ temerature + "<br> Description: "+ description + "<br> Humidity: "+ humidity + "<br> Wind Speed: "+ wind + "m/s";
        cityInfo.appendChild(listItem);
      });
    };

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

function fiveDayForecast (lat,lon){
  fiveDayInfo.innerHTML="";
  dayTwoInfo.innerHTML="";
  dayThreeInfo.innerHTML="";
  dayFourInfo.innerHTML="";
  dayFiveInfo.innerHTML="";

  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=7f598c561224054683226ca8211216e9&units=imperial";
  fetch(requestUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      var name = data.city.name;
      var dateA = data.list[6].dt_txt;
      var temperatureA = data.list[6].main.temp;
      var descriptionA = data.list[6].weather[0].description;
      var humidityA = data.list[6].main.humidity;
      var windA = data.list[6].wind.speed;
      var dateB = data.list[14].dt_txt;
      var temperatureB = data.list[14].main.temp;
      var descriptionB = data.list[14].weather[0].description;
      var humidityB = data.list[14].main.humidity;
      var windB = data.list[14].wind.speed;
      var dateC = data.list[22].dt_txt;
      var temperatureC = data.list[22].main.temp;
      var descriptionC = data.list[22].weather[0].description;
      var humidityC = data.list[22].main.humidity;
      var windC = data.list[22].wind.speed;
      var dateD = data.list[30].dt_txt;
      var temperatureD = data.list[30].main.temp;
      var descriptionD = data.list[30].weather[0].description;
      var humidityD = data.list[30].main.humidity;
      var windD = data.list[30].wind.speed;
      var dateE = data.list[38].dt_txt;
      var temperatureE = data.list[38].main.temp;
      var descriptionE = data.list[38].weather[0].description;
      var humidityE = data.list[38].main.humidity;
      var windE = data.list[31].wind.speed;
      var listTomorrow = document.createElement("li");
      var listDayTwo = document.createElement("li");
      var listDayThree = document.createElement("li");
      var listDayFour = document.createElement("li");
      var listDayFive = document.createElement("li");
      listTomorrow.innerHTML = dateA + "<br>Temperature: "+temperatureA+"<br> Description: "+descriptionA+"<br> Humidity: "+humidityA+"<br> Wind: "+windA+"m/s";
      listDayTwo.innerHTML = dateB + "<br>Temperature: "+temperatureB+"<br> Description: "+descriptionB+"<br> Humidity: "+humidityB+"<br> Wind: "+windB+"m/s";
      listDayThree.innerHTML = dateC + "<br>Temperature: "+temperatureC+"<br> Description: "+descriptionC+"<br> Humidity: "+humidityC+"<br> Wind: "+windC+"m/s";
      listDayFour.innerHTML = dateD + "<br>Temperature: "+temperatureD+"<br> Description: "+descriptionD+"<br> Humidity: "+humidityD+"<br> Wind: "+windD+"m/s";
      listDayFive.innerHTML = dateE + "<br>Temperature: "+temperatureE+"<br> Description: "+descriptionE+"<br> Humidity: "+humidityE+"<br> Wind: "+windE+"m/s";
      fiveDayInfo.appendChild(listTomorrow);
      dayTwoInfo.appendChild(listDayTwo);
      dayThreeInfo.appendChild(listDayThree);
      dayFourInfo.appendChild(listDayFour);
      dayFiveInfo.appendChild(listDayFive);
        })
};



function saveCities() {
  
  let city=input.value;
  console.log(city); 
  cityValues.push(city);
  localStorage.setItem("input",city);
  searchCityGeo(city);
  renderCity();
  // cityInfo.innerHTML= "";
};

// then re-render the list
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function renderCity (city) {
  event.preventDefault();
  var city =localStorage.getItem("input");
  var existingButton = null;
  
  listCities.childNodes.forEach(function(node){
    if(node.textContent === city){
      existingButton = node;
    }
  });

  if(existingButton){
    listCities.removeChild(existingButton);
  }

  var cityButtonEl = document.createElement("button");
  cityButtonEl.textContent = city;
  cityButtonEl.setAttribute("data-city", city);
  listCities.appendChild(cityButtonEl);
  $(cityButtonEl).on("click", function(){
    var cityName = $(this).data("city");
    searchCityGeo(cityName);
  })
   //for each to prevent duplicates, then new funciotn to call geo city- instead of local storage, reference the button itself 
  
  // if(buttonEl.textContent === city)
};


searchButton.addEventListener("click",saveCities);
input.addEventListener("input", searchCityGeo(city));

