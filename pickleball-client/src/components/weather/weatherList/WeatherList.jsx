// import getWeatherByDate from "@/helpers/weather/getWeatherDataByDate";
import { WeatherCardStyle1Back, WeatherCardStyle1Front } from "../weatherCard/WeatherCardStyle1";
// import WeatherCardStyle2 from "../weatherCard/WeatherCardStyle2";
import styles from "./WeatherList.module.css";
import getWeatherDataList from "@/helpers/weather/getWeatherDataList";
import FlipCard from "@/components/flipCard/FlipCard";
import { useGetWeatherData } from "@/api/thirdPartyApi/callApi";

const WeatherList = ({ province, date }) => {

    const provinceName = province?.label || "Hà Nội";
    const geolocation = province?.geolocation || { latitude: 21.028511, longitude: 105.804817 };
    const forecastDays = 7;
    
    const { data: response, isPending, isError, refetch: refetchGetWeatherData } = useGetWeatherData({ province: provinceName, geolocation, forecastDays });

    const responseData = response?.data;

    // const weatherData = getWeatherByDate({ date, province, weatherData: responseData });

    const weatherDataList = getWeatherDataList(responseData, provinceName) || [];

    return (
        <>
            <div className="">
                <h2 className="">
                    Thời tiết
                </h2>
                {!province.value ? <h3>(Chọn tỉnh/thành để xem thời tiết)</h3> : <h3>(Trỏ/chạm vào thẻ để xem chi tiết)</h3>}
            </div>
            <div className={`${styles["weather-list-container"]}  custom-scroll-bar`} >
                <div className={styles["weather-list-wrapper"]} >
                    {weatherDataList.map((weatherData, index) => {
                        const frontCard = <WeatherCardStyle1Front key={index} weatherData={weatherData} />;
                        const backCard = <WeatherCardStyle1Back key={index} weatherData={weatherData} />;
                        return <FlipCard key={index} frontCard={frontCard} backCard={backCard} widthCard={"200px"} heightCard={"280px"} />;
                    })}
                </div>
                {/* <div className={styles["weather-list-wrapper"]} >
                    {weatherDataList.map((weatherData, index) => (
                        <WeatherCardStyle2 key={index} weatherData={weatherData} />
                    ))}
                </div> */}


                {/* <WeatherCardStyle1 weatherData={weatherData} />
            <WeatherCardStyle2 weatherData={weatherData} /> */}
            </div>
        </>
    );
};

export default WeatherList;
