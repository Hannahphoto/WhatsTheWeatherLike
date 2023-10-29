var cityList = document.querySelector('ul');
var searchButton = document.getElementById('searchButton');
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=7f598c561224054683226ca8211216e9";

function currentWeatherApi (){
    fetch(requestUrl) 
      .then(function(response){
        return response.json();
      })
      .then(function (data){
        console.log(data);
    //     for (var i = 0; i < data.length; i++){
    //         var listItem = document.createElement("li");
    //         listItem.textContent= data[i].html_url;
    //         cityList.appendChild(listItem);
    //     }
    //   });
    
})
};

searchButton.addEventListener("click", currentWeatherApi);