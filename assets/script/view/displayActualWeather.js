import { getIcon } from "../controlleur/getIcon.js";

export const displayActualWeather = (city, temp, icon, description, date) => {
    let today = new Date(date);
    document.getElementById("weather__city").innerHTML = city;
    document.getElementById("weather__temp").innerHTML = parseInt(temp) + "°";
    document.getElementById("weather__icon").src = getIcon(
        icon,
        today.getHours()
    );
    document.getElementById("weather__description").innerHTML = description;
};
