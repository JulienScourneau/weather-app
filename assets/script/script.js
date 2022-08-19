async function getWeather(city) {
    try {
        let weather = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=9aca69ff480364b0b65bb3bc3d14b1c3`
        );
        let response = await weather.json();
        console.log(response);
        displayActualWeather(
            response.city.name,
            response.list[0].main.temp,
            response.list[0].weather[0].description,
            response.list[0].weather[0].description
        );
        for (let i = 1; i < response.list.length; i++) {
            createForecastArticle(
                response.list[i].dt_txt,
                response.list[i].weather[0].description,
                response.list[i].main.temp
            );
        }
    } catch (error) {
        console.log(error);
    }
}

const displayActualWeather = (city, temp, icon, description) => {
    document.getElementById("weather__city").innerHTML = city;
    document.getElementById("weather__temp").innerHTML = parseInt(temp) + "°";
    document.getElementById("weather__icon").src = getIcon(icon);
    document.getElementById("weather__description").innerHTML = description;
};

const createForecastArticle = (date, image, temp) => {
    let article = document.createElement("article");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let span = document.createElement("span");

    article.classList.add("forecast");
    p.classList.add("forecast__day");
    img.classList.add("forecast__icon");
    span.classList.add("forecast__temp");

    p.innerHTML = getHourOrDate(date);
    img.src = getIcon(image);
    span.innerHTML = parseInt(temp) + "°";

    article.appendChild(p);
    article.appendChild(img);
    article.appendChild(span);

    document.getElementById("forecast-section").appendChild(article);
};

const getHourOrDate = (date) => {
    let today = new Date();
    let actualDate = new Date(date);
    if (today.getDate() == actualDate.getDate()) {
        return `${actualDate.getHours()}H00`;
    } else {
        return actualDate.getMonth + 1 < 10
            ? `${actualDate.getDate()}/${actualDate.getMonth() + 1}`
            : `${actualDate.getDate()}/0${actualDate.getMonth() + 1}`;
    }
};

const getIcon = (icon, hour) => {
    switch (icon) {
        case "partiellement nuageux":
            return "assets/image/icon/party sunny.png";
        case "nuageux":
            return "assets/image/icon/cloudy.png";
        case "couvert":
            return "assets/image/icon/posible havy rain.png";
        case "peu nuageux":
            return "assets/image/icon/clear sky-1.png";
        case "ciel dégagé":
            return "assets/image/icon/clear sky.png";
        case "légère pluie":
            return "assets/image/icon/rain.png";
        case "pluie modérée":
            return "assets/image/icon/rain-1.png";
        case "forte pluie":
            return "assets/image/icon/havy rain.png";
        default:
            return "assets/image/icon/hot.png";
    }
};

//getWeather("china");
