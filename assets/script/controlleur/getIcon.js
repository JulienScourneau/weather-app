export const getIcon = (icon, hour) => {
    switch (icon) {
        case "partiellement nuageux":
            return "assets/image/icon/party sunny.png";
        case "nuageux":
            if (hour == 21) return "assets/image/icon/cloudy night.png";
            return "assets/image/icon/cloudy.png";
        case "couvert":
            return "assets/image/icon/posible havy rain.png";
        case "peu nuageux":
            if (hour == 21) return "assets/image/icon/clear night-1.png";
            return "assets/image/icon/clear sky-1.png";
        case "ciel dégagé":
            if (hour == 21) return "assets/image/icon/clear night.png";
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
