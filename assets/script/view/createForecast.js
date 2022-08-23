import {displayMonth} from './displayMonth.js'
import { getIcon } from "../controlleur/getIcon.js";

export const createForecastArticle = (date, image, temp) => {
    let article = document.createElement("article");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let span = document.createElement("span");

    article.classList.add("forecast");
    p.classList.add("forecast__day");
    img.classList.add("forecast__icon");
    span.classList.add("forecast__temp");

    let today = new Date(date);
    p.innerHTML = displayMonth(date);
    img.src = getIcon(image, today.getHours());
    span.innerHTML = parseInt(temp) + "°";

    article.appendChild(p);
    article.appendChild(img);
    article.appendChild(span);

    document.getElementById("forecast-section").appendChild(article);
};