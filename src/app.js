function formatDate (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  let days = ["Sun" , "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayTemperature (response) {
 
  let temperatureElement = document.querySelector("#temperature");
      let cityElement = document.querySelector("#city");
      
      if (city == "lisbon") {
        let citElement = document.querySelector (".lisbontrain")
        citElement.setAttribute ("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVR-TlvPmkhJajvMVvmJJgdKjNBUmNOq_d-9y2xdKGKziNlMiNi5VDOPzaE1UkObzJxpWMeDLxhYkV9AfCEaRk7MNxvFGii19Asg&usqp=CAU&ec=45761792"); 
        }
      else if (city == "london") {
          let citElement = document.querySelector (".lisbontrain")
          citElement.setAttribute ("src", "https://i.pinimg.com/originals/4d/15/b2/4d15b236540f2254f6b14decf9416c3a.jpg"); 
          }
      else if (city == "New york") {
        let citElement = document.querySelector (".lisbontrain")
        citElement.setAttribute ("src", "https://previews.123rf.com/images/valeriyabtsk/valeriyabtsk1803/valeriyabtsk180300089/98830156-dibujo-acuarela-de-la-estatua-de-la-libertad-nueva-york-ee-uu-en-la-ilustraci%C3%B3n.jpg"); 
            }
      else if (city == "Paris") {
          let citElement = document.querySelector (".lisbontrain")
          citElement.setAttribute ("src", "https://thumbs.dreamstime.com/b/watercolor-drawing-notre-dame-aquarelle-paris-view-painting-70263175.jpg"); 
              }
      else if (city == "Tokyo") {
          let citElement = document.querySelector (".lisbontrain")
          citElement.setAttribute ("src", "https://assets.illustrarama.com/e0ea0f1a6ddb7962fb10100fb7e3a59b/59d1be53ed85e3da598d424ca10ef815-1594269010709"); 
                }
      else {
          let citElement = document.querySelector (".lisbontrain")
          citElement.setAttribute ("src", "https://media.istockphoto.com/illustrations/watercolor-sketch-of-typical-view-of-amsterdam-illustration-id1202563807"); 
                
                }
                
            
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute( "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response){
  let forecastElement = document.querySelector ("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2">
  <h3>
    ${formatHours(forecast.dt *1000)}
  </h3>
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
  <div class="weather-forecast-temperature">
    <strong>${Math.round(forecast.main.temp_max)}º</strong>${Math.round(forecast.main.temp_min)}º
  </div>
</div>
`;
  }

}
function search(city){
  let apiKey = "c522524629fe11fe83aebe5bb3814efa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}



function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature *9) /5 + 32;
  celsiuslink.classList.remove("active");
  fahrenhitlink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenhitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);

}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenhitlink =document.querySelector("#fahrenhit-link");
fahrenhitlink.addEventListener("click", displayFahrenheitTemp);

let celsiuslink =document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemp);

search("london");

