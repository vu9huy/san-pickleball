import { formatDateCustom } from "@/utils/time/dateFns";

export default function getWeatherByDate({ date, province, weatherData }) {

    const dateIso8601String = formatDateCustom(date, "yyyy-MM-dd");
    const daily = weatherData.daily;
    const index = daily.time.indexOf(dateIso8601String);

    if (index !== -1) {
        return {
            date: daily.time[index],
            province: province,
            weatherCode: daily.weather_code[index],
            minTemp: `${daily.temperature_2m_min[index]}°C`,
            maxTemp: `${daily.temperature_2m_max[index]}°C`,
            uv: daily.uv_index_max[index],
            precipitationProbability: `${daily.precipitation_probability_max[index]}%`
        };
    } else {
        return `No data available for ${date}`;
    }
}