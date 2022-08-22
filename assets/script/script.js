let throttlePause;

async function getWeather(city) {
    try {
        let weather = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=9aca69ff480364b0b65bb3bc3d14b1c3`
        );

        let response = await weather.json();
        localStorage.setItem("weatherData", JSON.stringify(response));
        getCityPhoto(city);
        displayWeather(response);
    } catch (error) {
        console.error(error);
    }
}

async function getCityList(input) {
    try {
        let cityList = await fetch(
            `https://api.teleport.org/api/cities/?search=${input}`
        );
        let response = await cityList.json();
        displayAutocomplete(response._embedded["city:search-results"]);
    } catch (error) {
        console.error(error);
    }
}

async function getCityPhoto(input) {
    try {
        let photos = await fetch(
            `https://api.unsplash.com/search/photos?query=${input}&client_id=PieWdS-z10ISJpU3KdJV431kfTUEssUHEsgHYk1CnQ8`
        );
        let response = await photos.json();
        let photo = response.results[Math.floor(Math.random() * 10)].urls.raw;
        localStorage.setItem("photoData", JSON.stringify(photo));
        document.querySelector(
            "section"
        ).style.backgroundImage = `url("${photo}")`;
    } catch (error) {
        console.error(error);
    }
}

const displayWeather = (response) => {
    actualWeather(
        response.city.name,
        response.list[0].main.temp,
        response.list[0].weather[0].description,
        response.list[0].weather[0].description
    );
    clearForecastList();
    let forecastList = filtreForecast(response.list);
    for (let elem of forecastList) {
        createForecastArticle(
            elem.dt_txt,
            elem.weather[0].description,
            elem.main.temp
        );
    }
};

const actualWeather = (city, temp, icon, description) => {
    document.getElementById("weather__city").innerHTML = city;
    document.getElementById("weather__temp").innerHTML = parseInt(temp) + "°";
    document.getElementById("weather__icon").src = getIcon(icon);
    document.getElementById("weather__description").innerHTML = description;
};

const filtreForecast = (list) => {
    let today = new Date();
    return list.filter(
        (item) =>
            new Date(item.dt_txt).getDate() !== today.getDate() &&
            new Date(item.dt_txt).getHours() == 9
    );
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
        return actualDate.getMonth + 1 <= 10
            ? `${actualDate.getDate()}/${actualDate.getMonth() + 1}`
            : `${actualDate.getDate()}/0${actualDate.getMonth() + 1}`;
    }
};

const setupListener = () => {
    document
        .getElementById("search__input")
        .addEventListener("keyup", (event) => {
            if (
                event.key == "Enter" ||
                event.key == "ArrowRight" ||
                event.key == "ArrowLeft" ||
                event.key == "ArrowDown" ||
                event.key == "ArrowUp"
            )
                return;

            throttle(function () {
                if (event.target.value.length >= 3)
                    getCityList(event.target.value);
                if (event.target.value.length == 0) clearSearchList();
            }, 500);
        });

    document.body.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            let searchCity = document.querySelector("li");
            if (searchCity != null) displaySearchCity(searchCity.textContent);
            let city = getCityName();
            if (city != "") {
                getWeather(city);
                clearSearchList();
            }
        }
        // console.log(event.key);
        // if (event.key == "ArrowDown") {
        //     console.log("Focus");

        //     let focus = document.querySelector("li");
        //     focus.tabIndex = -1;
        //     console.log(focus);
        //     focus.focus();
        // }
    });
    document.getElementById("search__img").addEventListener("click", () => {
        let city = getCityName();
        getWeather(city);
    });
};

const getCityName = () => {
    let input = document.getElementById("search__input");
    let word = input.value.split(",");
    return word[0];
};

const getIcon = (icon, hour) => {
    //Add hour for night icon
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

const displayAutocomplete = (list) => {
    clearSearchList();
    if (list.length != 0) {
        let search = document.getElementById("header__search");
        let ul = document.getElementById("search__autocomplete");
        search.style.borderRadius = "20px 20px 0px 0px";
        for (let i = 0; i < 10; i++) {
            if (i >= list.length) return;
            let li = document.createElement("li");
            li.addEventListener("click", (event) => {
                displaySearchCity(event.target.textContent);
                getWeather(getCityName())
                clearSearchList();
            });
            li.innerHTML = list[i].matching_full_name;
            ul.appendChild(li);
        }
    }
};

const displaySearchCity = (city) => {
    let searchText = document.getElementById("search__input");
    searchText.value = city;
};

const clearForecastList = () => {
    let forecast = document.getElementById("forecast-section");
    while (forecast.firstChild) forecast.removeChild(forecast.firstChild);
};

const clearSearchList = () => {
    let search = document.getElementById("header__search");
    search.style.borderRadius = "20px";
    let ul = document.querySelector("ul");
    while (ul.firstChild) ul.removeChild(ul.firstChild);
};

const throttle = (callback, time) => {
    if (throttlePause) return;
    throttlePause = true;
    setTimeout(() => {
        callback();
        throttlePause = false;
    }, time);
};

const loadLocalData = () => {
    if (localStorage.length == 0) return getWeather("Bruxelles");
    let weatherData = JSON.parse(localStorage.getItem("weatherData"));
    let photo = JSON.parse(localStorage.getItem("photoData"));
    displayWeather(weatherData);
    document.querySelector("section").style.backgroundImage = `url("${photo}")`;
};
loadLocalData();
setupListener();
