async function getWeather() {
    try {
        let weather = await fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=vancouver&units=metric&lang=fr&appid=9aca69ff480364b0b65bb3bc3d14b1c3"
        );
        let response = await weather.json();
        console.log(response);
        displayActualWeather(response.city.name,response.list[0].main.tempresponse.list[0].weather[0].main,response.list[0].weather[0].description)
        
    } catch (error) {
        console.log(error);
    }
}

const displayActualWeather = (city, temp, icon, description) => {
    document.getElementById("weather__city").innerHTML = city;
    document.getElementById("weather__temp").innerHTML = parseInt(temp) +"°";
    document.getElementById("weather__icon").src = icon;
    document.getElementById("weather__description").innerHTML = description;
};

const createForecastArticle = (date, image, minTemp, maxTemp) => {
    let article = document.createElement("article");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let tempDiv = document.createElement("div");
    let minSpan = document.createElement("span");
    let maxSpan = document.createElement("span");

    article.classList.add("forecast");
    p.classList.add("forecast__day");
    img.classList.add("forecast__icon");
    tempDiv.classList.add("forecast__temp");
    minSpan.classList.add("forecast__temp__min");
    maxSpan.classList.add("forecast__temp__max");

    p.innerHTML = date;
    img.src = image;
    minSpan.innerHTML = minTemp;
    maxSpan.innerHTML = maxTemp;

    article.appendChild(p);
    article.appendChild(img);
    article.appendChild(tempDiv);
    tempDiv.appendChild(minSpan);
    tempDiv.appendChild(maxSpan);

    document.getElementById("forecast-section").appendChild(article);
};

displayActualWeather("Vancouver", 18.87, "assets/image/icon/wind.png", "Nuageux");