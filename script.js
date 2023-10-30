var cityInfo = document.getElementById('cityInfo');
var searchButton = document.getElementById('searchButton');
var input = document.getElementById('input');
var city = input.value;


const cityValues ="";

JSON.parse(localStorage.getItem("input", input));


// then re-render the list
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function renderCity () {
        var li = document.createElement('li');
        li.textContent = cityValues[i];
        ul.appendChild(li);
};


// the events capture user inputs, you can then build the array of things in local storage, 

function saveCities() {
    let city=input.value;
    JSON.stringify(localStorage.setItem("input",city));
    cityValues.push(input);
    renderCity();

};

// <!-- // GIVEN a weather dashboard with form inputs
// WHEN I search for a city -->
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function currentWeatherApi (event){
    event.preventDefault();
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=39.95&lon=75.17&appid=7f598c561224054683226ca8211216e9&units=imperial";
    fetch(requestUrl) 
      .then(function(response){
        return response.json();
      })
    //   / WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
      .then(function (data){
        console.log(data);
        cityInfo.innerHTML ="";
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


// function geoApi (event){
//     event.preventDefault();
//     var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=5&appid=7f598c561224054683226ca8211216e9";
//     fetch(requestUrl)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(data){
//             console.log(data);
//         })
// };


searchButton.addEventListener("click",currentWeatherApi);
input.addEventListener("input", saveCities);

// the parameter to the function will just be based on event handler, for example, nothing will stop you from sending the attribute of a button that has a city name, or the city name from a input field