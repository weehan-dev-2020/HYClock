const setWeatherIcon = (currentWeather) => {
    const weather_img = document.querySelector(".current-temperature-img");
    if (currentWeather['강수형태']==0){
        if(currentWeather['하늘상태']==1){
            weather_img.innerText = "☀️";
        }
        if(currentWeather['하늘상태']==3){
            weather_img.innerText = "☁️";
        }
        if(currentWeather['하늘상태']==4){
            weather_img.innerText = "🌥️"
        }
    }
    if (currentWeather['강수형태']==1 || currentWeather['강수형태']==4 || currentWeather['강수형태']==5){
        weather_img.innerText = "🌧️";
    }
    if(currentWeather['강수형태']==2 || currentWeather['강수형태']==6){
        weather_img.innerText = "🌨️"
    }
    if(currentWeather['강수형태']==3 || currentWeather['강수형태']==7){
        weather_img.innerText = "🌨️";
    }
}

const setCurrentWeather = (data) => {
    const currentHour = new Intl.NumberFormat('en-us', {minimumIntegerDigits: 2}).format(new Date().getHours())
    const currentWeather = data[`${currentHour}00`];
    const current_temperature = document.querySelector(".current-temperature-text");
    current_temperature.innerText = `${currentWeather['기온']}°`;
    setWeatherIcon(currentWeather);
}

const getWeatherInfo = (url) => {
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
        }
    })
    .then(async (response) => {
        const data = await response.json()
        setCurrentWeather(data['ultra_srt_fcst']);
    })
    .catch((error) => {
        console.error(error)
    })
};

const loadWeather = () => {
    const url = 'https://hyclock.hanyang.life/weather/';
    getWeatherInfo(url);
};

window.addEventListener("load", loadWeather);