import axios from "axios";

const objectToQueryParams = (obj) => {
    const params = new URLSearchParams(obj);
    return params.toString();
};
const getEndpoint = ({ geolocation, forecastDays }) => {
    const daily = "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max";
    const timezone = "Asia/Bangkok";
    const latitude = geolocation.latitude;
    const longitude = geolocation.longitude;
    const forecast_days = `${forecastDays}`;

    const weatherParams = {
        daily,
        timezone,
        latitude,
        longitude,
        forecast_days
    };

    const baseUrl = "https://api.open-meteo.com/v1/forecast";
    const endpoint = `${baseUrl}?${objectToQueryParams(weatherParams)}`;
    console.log("endpoint544545", endpoint);
    return endpoint;
};
const getWeatherForecast = async ({ geolocation, forecastDays }) => {
    const headers = {
        "Content-Type": "application/json"
    };
    const url = getEndpoint({ geolocation, forecastDays });
    console.log("url43343", url);
    
    // const response = await getMethod(url, headers);
    const response = await axios.get(url, headers);
    return response;
};

export default getWeatherForecast;