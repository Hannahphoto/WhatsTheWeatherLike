var cityInfo = document.getElementById('cityInfo');
// var cityName = document.getElementById('cityName')
var searchButton = document.getElementById('searchButton');
var input = document.getElementById('input');
// var city = document.getElementById('city');
// var fiveDayInfo = getElementById('fiveDayInfo');



const cityValues =[];

// JSON.parse(localStorage.getItem("input", input));


// then re-render the list
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function renderCity () {
    var city =localStorage.getItem("input", input);
    // var li = document.createElement('li');
    var buttonEl = document.createElement("button");
    buttonEl.textContent = city;
    ul.appendChild(buttonEl);
      buttonEl.addEventListener("click", searchCityGeo)
};


// the events capture user inputs, you can then build the array of things in local storage, 

function saveCities() {
    let city=input.value;
    console.log(city);
    JSON.stringify(localStorage.setItem("input",city));
    cityValues.push(input);
    searchCityGeo(city);
    renderCity();
    // cityInfo.innerHTML= "";
};

// <!-- // GIVEN a weather dashboard with form inputs
// WHEN I search for a city -->
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function currentWeatherApi (lat,lon){
  cityInfo.innerHTML = "";
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
        listItem.textContent = "Temperature: "+ temerature + " Description: "+ description + " Humidity: "+ humidity + " Wind Speed: "+ wind + "m/s";
        cityInfo.appendChild(listItem);
      });
    };

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


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
        }); 
};


searchButton.addEventListener("click",searchCityGeo);
input.addEventListener("input", saveCities);

// the parameter to the function will just be based on event handler, for example, nothing will stop you from sending the attribute of a button that has a city name, or the city name from a input field