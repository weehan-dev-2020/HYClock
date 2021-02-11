const setHourlyWeather = (hourly_weather) => {
  const boxes = document.getElementsByClassName("hourly-weather-box");
  for (let i = 0; i < 4; i++) {
    const box = boxes[i];
    const time = box.querySelector(".hourly-weather-time");
    const emoji = box.querySelector(".hourly-weather-emoji");
    const temp = box.querySelector(".hourly-weather-temp");
    time.innerText = hourly_weather[i + 1]["time"];
    emoji.innerText = hourly_weather[i + 1]["weather_emoji"];
    temp.innerText = `${hourly_weather[i + 1]["content"]["3시간 기온"]}°`;
  }
};

const setCurrentWeather = (current_weather, hourly_weather) => {
  const current_temperature = document.querySelector(".current-temperature");
  const current_sky_emoji = document.querySelector(".current-sky-emoji");
  current_temperature.innerText = `${current_weather["content"]["기온"]}°`;
  current_sky_emoji.innerText = hourly_weather[0]["weather_emoji"];
};

const getWeatherInfo = (url) => {
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then(async (response) => {
      const data = await response.json();
      setCurrentWeather(data["current_weather"], data["three_hourly_weather"]);
      setHourlyWeather(data["three_hourly_weather"]);
    })
    .catch((error) => {
      console.error(error);
    });
};

const loadWeather = () => {
  const url = "https://hyclock.hanyang.life/weather/";
  getWeatherInfo(url);
};

window.addEventListener("load", loadWeather);
