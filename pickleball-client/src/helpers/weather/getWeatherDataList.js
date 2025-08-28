export default function getWeatherDataList(responseData, province) {
    if (!responseData) return null;
    const daily = responseData.daily;
    const weatherList = daily.time.map((date, index) => ({
        date: date,
        province: province,
        weatherCode: daily.weather_code[index],
        minTemp: `${Math.round(daily.temperature_2m_min[index])}°C`,
        maxTemp: `${Math.round(daily.temperature_2m_max[index])}°C`,
        uv: daily.uv_index_max[index],
        precipitationProbability: `${daily.precipitation_probability_max[index]}%`
    }));
    return weatherList;
}