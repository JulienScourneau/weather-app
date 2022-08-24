export async function getCityList(input) {
    try {
        let cityList = await fetch(
            `https://api.teleport.org/api/cities/?search=${input}`
        );
        return await cityList.json();
    } catch (error) {
        console.error(error);
    }
}