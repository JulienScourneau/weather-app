async function getWeather(city) {
    try {
        let weather = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=9aca69ff480364b0b65bb3bc3d14b1c3`
        );
        let response = await weather.json();
        getCityPhoto(city)
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
        console.error(error);
    }
}

async function getCityList(input) {
    try {
        let cityList = await fetch(
            `https://api.teleport.org/api/cities/?search=${input}`
        );
        let response = await cityList.json();
        console.log(response);
        displayAutocomplete(response._embedded["city:search-results"]);
    } catch (error) {
        console.error(error);
    }
}

async function getCityPhoto(input) {
    try {
        let photo = await fetch(
            `https://api.unsplash.com/search/photos?query=${input}&client_id=PieWdS-z10ISJpU3KdJV431kfTUEssUHEsgHYk1CnQ8`
        );
        let response = await photo.json();
        let random = Math.floor(Math.random() * 10);
        document.querySelector(
            "section"
        ).style.backgroundImage = `url("${response.results[random].urls.raw}")`; 
        console.log(response.results[0].urls.raw);
    } catch (error) {
        console.error(error);
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
        return actualDate.getMonth + 1 <= 10
            ? `${actualDate.getDate()}/${actualDate.getMonth() + 1}`
            : `${actualDate.getDate()}/0${actualDate.getMonth() + 1}`;
    }
};

const setupListener = () => {
    document
        .getElementById("search__input")
        .addEventListener("keyup", (event) => {
            if (event.key != "Enter") {
                if (event.target.value.length >= 3)
                    getCityList(event.target.value);
                if (event.target.value.length == 0) clearSearchList();
            }
        });

    document.body.addEventListener("keypress", (event) => {
        if (event.key == "Enter") {
            let city = getCityName();
            getWeather(city);
        }
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
        let searchText = document.getElementById("search__input");
        let ul = document.getElementById("search__autocomplete");
        search.style.borderRadius = "20px 20px 0px 0px";
        for (let i = 0; i < 10; i++) {
            let li = document.createElement("li");
            li.addEventListener("click", () => {
                console.log(li.textContent);
                console.log(searchText);
                searchText.value = li.textContent;
                clearSearchList();
            });
            li.innerHTML = list[i].matching_full_name;
            ul.appendChild(li);
        }
    }
};

const clearSearchList = () => {
    let search = document.getElementById("header__search");
    search.style.borderRadius = "20px";
    let ul = document.querySelector("ul");
    while (ul.firstChild) ul.removeChild(ul.firstChild);
};
setupListener();
