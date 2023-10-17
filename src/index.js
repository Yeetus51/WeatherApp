import "./style.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css";

import "./weather-icons-wind.css"
import "./weather-icons-wind.min.css"
import "./weather-icons.css"
import "./weather-icons.min.css"

import "../font/weathericons-regular-webfont.eot"
import "../font/weathericons-regular-webfont.svg"
import "../font/weathericons-regular-webfont.ttf"
import "../font/weathericons-regular-webfont.woff"
import "../font/weathericons-regular-webfont.woff2"



console.log("YOUR MOM");
console.log(document.cookie);


let weatherCondictionDict = {1000:"wi-day-sunny",1003:"wi-day-cloudy",1006:"wi-cloudy",1009:"wi-day-sunny-overcast",
1030:"wi-fog",1063:"wi-sprinkle",1066:"wi-snow",1069:"wi-sleet",1072:"wi-snow-wind",1087:"wi-lightning",
1114:"wi-snow",1117:"wi-snow-wind",1135:"wi-fog",1147:"wi-fog",1150:"wi-sprinkle",1153:"wi-sprinkle",
1168:"wi-sprinkle",1171:"wi-sprinkle",1180:"wi-sprinkle",1183:"wi-sprinkle",1186:"wi-sprinkle",
1189:"wi-rain",1192:"wi-rain",1195:"wi-rain",1198:"wi-rain",1201:"wi-rain",1204:"wi-rain",1207:"wi-rain",
1210:"wi-snow",1213:"wi-snow",1216:"wi-snow",1219:"wi-snow",1222:"wi-snow",1225:"wi-snow",1237:"wi-hail",
1240:"wi-rain",1243:"wi-rain",1246:"wi-rain",1249:"wi-rain",1252:"wi-rain",1255:"wi-snow",1258:"wi-snow",
1261:"wi-hail",1264:"wi-hail",1273:"wi-thunderstorm",1276:"wi-thunderstorm",1279:"wi-storm-showers",
1282:"wi-storm-showers"}



let srearchButton = document.getElementById("search-button"); 
let searchBox = document.getElementById("search-box");

searchBox.addEventListener('focusout', () =>{
    if(searchBox.value == "")return; 
    getCityData(searchBox.value); 

    searchBox.value = ""; 
})

searchBox.addEventListener('keypress', (event) =>{
    if(event.type != 'keypress' || event.key != 'Enter' || searchBox.value == "")return; 
    getCityData(searchBox.value); 
    searchBox.value = ""; 
})



srearchButton.addEventListener('click', () => {
    getCityData(searchBox.value); 
})


async function getCityData(city) {

    try{
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d0a922432d60465dbbc112152231610&q=${city}&days=1&aqi=no&alerts=no`, {mode: 'cors'});
    const cityData = await response.json();
    console.log(cityData)
    assignData(cityData);
    }catch(error){
        // no one cares
    }
}


let weatherConditionIcon = document.getElementById("weather-condition-icon");

let cityName = document.getElementById("city-name"); 
let weatherCondition = document.getElementById("weather-condition"); 
let tempC = document.getElementById("temp-c"); 

let localTime = document.getElementById("local-time");

let feelsLike = document.getElementById("feels-like"); 
let humidity = document.getElementById("humidity"); 
let rainChance = document.getElementById("rain-chance"); 
let windSpeed = document.getElementById("wind-speed");

getCityData("Amsterdam");

function assignData(cityData){


    weatherConditionIcon.classList = `wi ${weatherCondictionDict[cityData.current.condition.code]}`; 

    cityName.textContent = cityData.location.name; 
    weatherCondition.textContent = cityData.current.condition.text;
    tempC.textContent = `${cityData.current.temp_c} °C`; 
    localTime.textContent = cityData.location.localtime;

    feelsLike.textContent = `${cityData.current.feelslike_c} °C`; 
    humidity.textContent = `${cityData.current.humidity} %`; 
    rainChance.textContent = `${cityData.forecast.forecastday[0].day.daily_chance_of_rain} %`;
    windSpeed.textContent  = `${cityData.current.wind_kph} km/h`;



}
// {
//     "location": {
//         "name": "Enschede",
//         "region": "Overijssel",
//         "country": "Netherlands",
//         "lat": 52.22,
//         "lon": 6.9,
//         "tz_id": "Europe/Amsterdam",
//         "localtime_epoch": 1697541353,
//         "localtime": "2023-10-17 13:15"
//     },
//     "current": {
//         "last_updated_epoch": 1697541300,
//         "last_updated": "2023-10-17 13:15",
//         "temp_c": 11,
//         "temp_f": 51.8,
//         "is_day": 1,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
//             "code": 1003
//         },
//         "wind_mph": 5.6,
//         "wind_kph": 9,
//         "wind_degree": 80,
//         "wind_dir": "E",
//         "pressure_mb": 1021,
//         "pressure_in": 30.15,
//         "precip_mm": 0,
//         "precip_in": 0,
//         "humidity": 66,
//         "cloud": 25,
//         "feelslike_c": 8.9,
//         "feelslike_f": 48.1,
//         "vis_km": 10,
//         "vis_miles": 6,
//         "uv": 4,
//         "gust_mph": 12.8,
//         "gust_kph": 20.7
//     }
// }







