const apiKey = "ff5a017fdf7c24838cbe94d853d3c5b8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404 || data.cod === "404") {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    console.log(data); // Debugging - Check the API response

    // Update text content
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Get weather condition and update image
    const weatherCondition = data.weather[0].main.toLowerCase();
    console.log(weatherCondition); // Debugging - Check weather condition

    const weatherImages = {
      clouds: "img/clouds.png",
      clear: "img/clear.png",
      rain: "img/rain.png",
      drizzle: "img/drizzle.png",
      mist: "img/mist.png",
      haze: "img/mist.png",
      fog: "img/mist.png",
      thunderstorm: "img/thunderstorm.png",
      snow: "img/snow.png",
    };

    weatherIcon.src = weatherImages[weatherCondition] || "img/default.png"; // Fallback image

    // Display weather info
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// Search button event
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Default check
checkWeather("New York");
