import { useQueryWrapper } from "../serverApi/reactQueryWapper";
import getWeatherForecast from "./weatherApi";

const useGetWeatherData = ({ province, geolocation, forecastDays }) => {
    const response = useQueryWrapper([`get-weather-${province}-${forecastDays}`], () => getWeatherForecast({ geolocation, forecastDays }), { enabled: !!province });
    return response;
};

export {
    useGetWeatherData
};